import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = 'timeroute/wslc-desktop';
const RELEASE_API = process.env.RELEASE_API_URL
  || `https://api.github.com/repos/${REPO}/releases/latest`;

const releaseUrl = new URL('../src/data/release.json', import.meta.url);
const changelogFallbackUrl = new URL('../src/data/changelog.fallback.md', import.meta.url);
const changelogOutUrl = new URL('../src/content/changelog.md', import.meta.url);

const PLACEHOLDER = `---
placeholder: true
---
`;

function normalizeMarkdown(text) {
  return `${text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trimEnd()}\n`;
}

function isPlaceholder(text) {
  return /^---\nplaceholder:\s*true\n---\s*$/.test(text.trim());
}

function releaseJson(release) {
  return `${JSON.stringify({
    version: release.version,
    versionNumber: release.versionNumber,
    msiName: release.msiName,
    msiUrl: release.msiUrl,
  }, null, 2)}\n`;
}

function assertRelease(release, label) {
  for (const field of ['version', 'versionNumber', 'msiName', 'msiUrl']) {
    if (typeof release[field] !== 'string' || !release[field].trim()) {
      throw new Error(`${label} is missing ${field}`);
    }
  }
  if (!release.msiName.toLowerCase().endsWith('.msi')) {
    throw new Error(`${label} msiName is not an MSI`);
  }
  if (!release.msiUrl.startsWith('https://')) {
    throw new Error(`${label} msiUrl is not https`);
  }
}

async function readOptional(url) {
  try {
    return await readFile(url, 'utf8');
  } catch (error) {
    if (error && error.code === 'ENOENT') return null;
    throw error;
  }
}

async function readFallback() {
  const raw = await readFile(releaseUrl, 'utf8');
  const release = JSON.parse(raw);
  assertRelease(release, 'src/data/release.json');
  const notes = await readOptional(changelogFallbackUrl);
  const changelog = notes == null ? '' : normalizeMarkdown(notes);
  return {
    ...release,
    changelog,
    placeholder: !changelog.trim() || isPlaceholder(changelog),
  };
}

function apiHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'wslc-desktop-website',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function request(url, headers) {
  const response = await fetch(url, {
    headers,
    redirect: 'follow',
    signal: AbortSignal.timeout(20_000),
  });
  return response;
}

function parseVersion(tag) {
  const raw = String(tag ?? '').trim();
  if (!raw) return null;
  const version = raw.startsWith('v') ? raw : `v${raw}`;
  const versionNumber = version.slice(1);
  if (!/^\d+\.\d+\.\d+(?:[-+].+)?$/.test(versionNumber)) return null;
  return { version, versionNumber };
}

function pickMsi(assets, version) {
  const prefix = `https://github.com/${REPO}/releases/download/${version}/`;
  const msis = (Array.isArray(assets) ? assets : []).filter((asset) => {
    const name = String(asset?.name ?? '');
    const url = String(asset?.browser_download_url ?? '');
    return name.toLowerCase().endsWith('.msi') && url.startsWith(prefix);
  });
  return msis.find((asset) => /x86_64|amd64|x64/i.test(asset.name)) ?? msis[0] ?? null;
}

async function fetchChangelog(version) {
  const url = `https://raw.githubusercontent.com/${REPO}/${version}/CHANGELOG.md`;
  const response = await request(url, {
    Accept: 'text/markdown, text/plain;q=0.9',
    'User-Agent': 'wslc-desktop-website',
  });
  if (!response.ok) return '';
  const text = normalizeMarkdown(await response.text());
  return text.trim() ? text : '';
}

async function fetchLatest(fallback) {
  const response = await request(RELEASE_API, apiHeaders());
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  let data;
  try {
    data = JSON.parse(await response.text());
  } catch {
    throw new Error('response was not JSON');
  }
  if (data.draft || data.prerelease) {
    throw new Error('latest release is a draft or prerelease');
  }
  const parsed = parseVersion(data.tag_name);
  if (!parsed) throw new Error(`unrecognized tag ${data.tag_name}`);
  const msi = pickMsi(data.assets, parsed.version);
  if (!msi) throw new Error('release has no MSI asset');

  const release = {
    version: parsed.version,
    versionNumber: parsed.versionNumber,
    msiName: msi.name,
    msiUrl: msi.browser_download_url,
  };
  assertRelease(release, 'GitHub release');

  let changelog = '';
  let noteSource = '';
  try {
    changelog = await fetchChangelog(parsed.version);
    if (changelog) noteSource = 'CHANGELOG.md';
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`CHANGELOG.md unavailable (${message}).`);
  }

  const sameVersion = fallback?.version === release.version;
  if (!changelog && sameVersion && fallback.changelog && !fallback.placeholder) {
    changelog = fallback.changelog;
    noteSource = 'last known changelog';
  }

  const body = typeof data.body === 'string' ? data.body.trim() : '';
  if (!changelog && body) {
    changelog = normalizeMarkdown(body);
    noteSource = 'release notes';
  }

  return { ...release, changelog, placeholder: !changelog, noteSource };
}

async function writeIfChanged(url, next) {
  const current = await readOptional(url);
  if (current === next) return false;
  await mkdir(dirname(fileURLToPath(url)), { recursive: true });
  await writeFile(url, next);
  return true;
}

async function writePageChangelog(release) {
  const body = release.changelog && !release.placeholder
    ? normalizeMarkdown(release.changelog)
    : PLACEHOLDER;
  await mkdir(dirname(fileURLToPath(changelogOutUrl)), { recursive: true });
  await writeFile(changelogOutUrl, body);
}

let fallback = null;
try {
  fallback = await readFallback();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`Last known release is unreadable (${message}).`);
}

let release = null;
try {
  release = await fetchLatest(fallback);
  await writeIfChanged(releaseUrl, releaseJson(release));
  if (release.noteSource === 'CHANGELOG.md' || release.noteSource === 'release notes') {
    await writeIfChanged(changelogFallbackUrl, normalizeMarkdown(release.changelog));
  } else if (release.placeholder) {
    await writeIfChanged(changelogFallbackUrl, PLACEHOLDER);
  }
  const notes = release.noteSource || 'no notes';
  console.log(`Fetched ${release.version} (${release.msiName}), notes from ${notes}.`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  if (!fallback) {
    console.error(`Release API unavailable (${message}), and no last known release.`);
    process.exit(1);
  }
  release = fallback;
  console.warn(`Release API unavailable (${message}). Using last known ${fallback.version}.`);
}

await writePageChangelog(release);

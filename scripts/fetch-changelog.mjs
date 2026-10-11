import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE = 'https://raw.githubusercontent.com/timeroute/wslc-desktop/main/CHANGELOG.md';
const outFile = fileURLToPath(new URL('../src/content/changelog.md', import.meta.url));

const placeholder = `---
placeholder: true
---
`;

async function writePlaceholder(reason) {
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, placeholder);
  console.warn(`CHANGELOG unavailable (${reason}). Wrote placeholder.`);
}

const url = process.env.CHANGELOG_URL || SOURCE;

try {
  const response = await fetch(url, {
    headers: { Accept: 'text/markdown, text/plain;q=0.9' },
    redirect: 'follow',
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    await writePlaceholder(`HTTP ${response.status}`);
    process.exit(0);
  }
  const text = await response.text();
  if (!text.trim()) {
    await writePlaceholder('empty body');
    process.exit(0);
  }
  const body = text.replace(/^\uFEFF/, '');
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, body.endsWith('\n') ? body : `${body}\n`);
  console.log(`Fetched CHANGELOG.md (${Buffer.byteLength(body)} bytes).`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  await writePlaceholder(message);
}

export type Lang = 'zh' | 'en';

export function siteBase(base: string): string {
  if (!base || base === '/') return '/';
  return base.endsWith('/') ? base : `${base}/`;
}

/** Path under the site base, without a leading or trailing slash. */
export function relativePath(pathname: string, base: string): string {
  const root = siteBase(base);
  let path = pathname || '/';
  if (root !== '/') {
    const trimmed = root.slice(0, -1);
    if (path === trimmed || path === root) path = '';
    else if (path.startsWith(root)) path = path.slice(root.length);
  } else if (path.startsWith('/')) {
    path = path.slice(1);
  }
  return path.replace(/^\/+/, '').replace(/\/$/, '');
}

export function langOf(pathname: string, base: string): Lang {
  const rel = relativePath(pathname, base);
  return rel === 'en' || rel.startsWith('en/') ? 'en' : 'zh';
}

export function homePath(base: string, lang: Lang): string {
  const root = siteBase(base);
  return lang === 'en' ? `${root}en/` : root;
}

/** Same page in the requested language, including the site base. */
export function localePath(pathname: string, base: string, lang: Lang): string {
  const root = siteBase(base);
  const page = relativePath(pathname, base).replace(/^en\/?/, '');
  if (lang === 'en') return page ? `${root}en/${page}/` : `${root}en/`;
  return page ? `${root}${page}/` : root;
}

export function absoluteUrl(path: string, origin: URL): string {
  return new URL(path, origin).href;
}

export function sitemapLinks(pageUrl: string, base = '/wslc-desktop-website/') {
  const url = new URL(pageUrl);
  const zh = absoluteUrl(localePath(url.pathname, base, 'zh'), url);
  const en = absoluteUrl(localePath(url.pathname, base, 'en'), url);
  return [
    { lang: 'zh-CN', url: zh },
    { lang: 'en', url: en },
    { lang: 'x-default', url: zh },
  ];
}

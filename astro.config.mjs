import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { sitemapLinks } from './src/lib/locale.ts';

// GitHub Pages project site: https://timeroute.github.io/wslc-desktop-website/
const site = 'https://timeroute.github.io';
const base = '/wslc-desktop-website/';

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [
    sitemap({
      serialize(item) {
        item.links = sitemapLinks(item.url, base);
        return item;
      },
    }),
  ],
});

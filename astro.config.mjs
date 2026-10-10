import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://timeroute.github.io/wslc-desktop-website/
export default defineConfig({
  site: 'https://timeroute.github.io',
  base: '/wslc-desktop-website/',
  output: 'static',
});

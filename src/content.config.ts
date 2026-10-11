import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const changelog = defineCollection({
  loader: glob({ pattern: 'changelog.md', base: './src/content' }),
});

export const collections = { changelog };

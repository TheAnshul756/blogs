import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { remarkWikiLinks } from './src/lib/remark-wiki-links.ts';

const base = '/blogs';

export default defineConfig({
  site: 'https://theanshul756.github.io',
  base,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    build: {
      rollupOptions: {
        external: [/\/pagefind\//],
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkGfm, [remarkWikiLinks, { base }]],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },
});

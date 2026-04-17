import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      category: z.string().default('General'),
      series: z.string().optional(),
      seriesOrder: z.number().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      author: z.string().optional(),
    }),
});

export const collections = { posts };

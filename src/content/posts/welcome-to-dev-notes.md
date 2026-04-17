---
title: "Welcome to Dev Notes"
description: "A short tour of this blog — what to expect, what's under the hood, and how it's organized."
pubDate: 2026-04-17
category: "Meta"
tags: ["astro", "meta", "announcement"]
---

Welcome. This is the first post on **Dev Notes** — a long-form log of
engineering notes, deep-dives, and the occasional opinion.

## What's here

- Long-form posts on systems, databases, and distributed computing
- Short notes on tools I'm using
- Series that walk through a topic end-to-end

## What it's built with

This site is built with [Astro](https://astro.build) and a handful of small
conventions:

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

Under the hood it uses:

- **Content collections** for typed frontmatter
- **Pagefind** for full-text search
- **Shiki** for syntax highlighting
- **Giscus** for comments (powered by GitHub Discussions)
- **MDX** if you want React-y components in posts

## What's next

A few posts are in the pipeline. Subscribe to the RSS feed or newsletter to
follow along.

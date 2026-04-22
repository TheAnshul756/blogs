# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install         # Install dependencies
npm run dev         # Dev server at http://localhost:4321
npm run build       # Production build + Pagefind search index (astro build && pagefind --site dist)
npm run preview     # Preview the production build locally
```

> The search index is generated as a post-build step (`pagefind --site dist`). It is **not** available during `npm run dev`; the search UI is a no-op until a production build is run.

## Architecture

The site is deployed to GitHub Pages at `https://theanshul756.github.io/blogs`. The `base: '/blogs'` in `astro.config.mjs` means all internal links must use the `withBase()` helper from `src/lib/url.ts` to avoid broken paths.

### Key files

| File | Purpose |
|------|---------|
| `src/site.config.ts` | Single source of truth for site metadata, nav links, and third-party service config (Giscus, newsletter, contact form) |
| `src/content.config.ts` | Zod schema for the `posts` collection — the canonical list of allowed frontmatter fields |
| `src/lib/posts.ts` | All collection helpers: `getAllPosts`, `getAllTags`, `getAllCategories`, `getAllSeries`, `getArchive`, `getRelatedPosts`, `getReadingTime` |
| `src/lib/url.ts` | `withBase()` — wraps Astro's `import.meta.env.BASE_URL` for consistent path prefixing |

### Data flow

- All pages call helpers from `src/lib/posts.ts` at build time (Astro SSG).
- `getAllPosts()` filters out `draft: true` posts in production but includes them in dev.
- Tags and categories are derived dynamically from post frontmatter (no separate config needed).
- Related posts are scored by series match (5pts) > tag overlap (3pts each) > category match (2pts).

### Layouts

- `BaseLayout.astro` — root HTML shell, injects OG/Twitter meta, sidebar, theme toggle, progress bar when `showProgress` prop is set.
- `PostLayout.astro` — wraps `BaseLayout`; adds TOC sidebar, breadcrumbs, series navigator, share buttons, reactions, related posts, and Giscus comments.

### Routing conventions

Dynamic routes follow Astro's file-based pattern:
- `/posts/[...slug].astro` — individual post pages (slug = collection entry `id`)
- `/tags/[tag].astro`, `/categories/[category].astro`, `/series/[series].astro` — taxonomy pages
- Tag/category/series slugs are lowercased; series names are additionally run through `slugify()` from `src/lib/posts.ts`

## Writing posts

Create `src/content/posts/<filename>.md` with this frontmatter:

```yaml
---
title: "Post title"
description: "One-sentence summary."
pubDate: 2026-04-22
category: "CategoryName"   # must be a string; becomes a route at /categories/<lowercase>/
tags: ["tag1", "tag2"]
series: "Series Name"      # optional; groups posts under /series/<slugified>/
seriesOrder: 1             # optional; controls order within a series
draft: false               # optional; drafts are hidden in production builds only
cover: ./image.png         # optional; processed by Astro's image() schema
coverAlt: "Alt text"       # optional; required when cover is set
---
```

## Third-party service config

All service credentials live in `src/site.config.ts`. Placeholders (`REPLACE_WITH_...`) degrade gracefully — components render nothing until real values are provided:

- **Giscus** (comments): requires `repoId` and `categoryId` from the [Giscus configurator](https://giscus.app)
- **Newsletter**: set `newsletter.action` to a Buttondown/ConvertKit/Substack embed URL
- **Contact form**: set `contact.formspree` to a Formspree endpoint URL

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which runs `npm ci && npm run build` and deploys `./dist` to GitHub Pages.

# Dev Notes — an Astro tech blog

A space for my thoughts and learnings that I would like to share. Built with [Astro](https://astro.build).

## Features

**Structure & navigation**
- Sidebar navigation with pages, RSS link, theme toggle
- Full-text search across posts (Pagefind), bound to `/`
- Auto-generated table of contents on every post (scroll-spy aware)
- Breadcrumbs on every non-home page
- Reading time estimate on each post

**Discovery**
- Tags with per-tag pages and a tag cloud
- Categories with per-category pages
- Series grouping for multi-part posts (with in-post navigator)
- Archive page (posts grouped by month)
- Related posts at the bottom of each article

**Post page**
- Reading-progress bar
- Shiki syntax highlighting with a "Copy" button per code block
- Dark/light mode toggle (preference persisted, respects system default)
- Share buttons (Twitter/X, LinkedIn, HN, copy link)
- Reactions (like, love, insightful, celebrate) stored in localStorage
- Comments via Giscus (GitHub Discussions)

**About & contact**
- About page with bio, avatar, and CTAs
- Contact page with a Formspree-powered form
- Newsletter signup (Buttondown/ConvertKit/Substack compatible)

**Credibility & SEO**
- RSS feed at `/rss.xml`
- Sitemap at `/sitemap-index.xml`
- Open Graph and Twitter Card meta tags on every page
- Canonical URLs
- `robots.txt`

## Commands

| Command           | Action                                               |
|-------------------|------------------------------------------------------|
| `npm install`     | Install dependencies                                 |
| `npm run dev`     | Start local dev server at `http://localhost:4321`    |
| `npm run build`   | Build for production (and generate search index)     |
| `npm run preview` | Preview the production build locally                 |

## Project layout

```
src/
  components/      # Reusable UI (Sidebar, TOC, Search, Reactions, ...)
  content/
    posts/         # Your blog posts (.md / .mdx)
  layouts/         # BaseLayout, PostLayout
  lib/posts.ts     # Collection helpers (tags, series, archive, related)
  pages/           # Routes
  styles/global.css
  site.config.ts   # All site-wide configuration
```

## Writing a post

Create `src/content/posts/my-post.md`:

```md
---
title: "My post"
description: "One-sentence summary."
pubDate: 2026-04-17
category: "Craft"
tags: ["astro", "notes"]
series: "My series"     # optional
seriesOrder: 1          # optional
draft: false            # optional; drafts are hidden in production
---

Post body in Markdown or MDX.
```

## Configuring third-party services

Edit `src/site.config.ts`:

- **Giscus comments** — create a repo, enable Discussions, install the
  [Giscus app](https://github.com/apps/giscus), then paste the generated
  `repoId` and `categoryId` into the `giscus` block.
- **Newsletter** — set `newsletter.action` to your Buttondown / ConvertKit /
  Substack form action URL.
- **Contact form** — set `contact.formspree` to your Formspree endpoint.

The placeholders (`REPLACE_WITH_...`) are safe: the components degrade
gracefully until real IDs are provided.

## License

See [LICENSE](./LICENSE).

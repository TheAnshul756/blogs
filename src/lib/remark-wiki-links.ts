/**
 * Remark plugin that converts Obsidian-style wiki links to standard markdown links.
 *
 * Supported syntax:
 *   [[page-name]]               → link to /posts/page-name/  (label = "page-name")
 *   [[page-name|Display Text]]  → link to /posts/page-name/  (label = "Display Text")
 *   [[Page Name]]               → slugified to /posts/page-name/
 *   [[page-name.md]]            → .md extension is stripped
 *
 * Wiki links inside code spans and fenced code blocks are left untouched.
 */

import { findAndReplace } from 'mdast-util-find-and-replace';
import type { Root } from 'mdast';

// Matches [[target]] or [[target|display text]]
// Target may not contain ] or |; display may not contain ]
const WIKI_LINK_RE = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;

function toSlug(str: string): string {
  return str
    .trim()
    .replace(/\.mdx?$/i, '')   // strip optional .md / .mdx extension
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function remarkWikiLinks({ base = '' }: { base?: string } = {}) {
  return function transformer(tree: Root) {
    findAndReplace(
      tree,
      [
        [
          WIKI_LINK_RE,
          (
            _match: string,
            target: string,
            display: string | undefined,
          ) => {
            const slug = toSlug(target);
            const label = display ? display.trim() : target.trim();
            return {
              type: 'link' as const,
              url: `${base}/posts/${slug}/`,
              title: null,
              children: [{ type: 'text' as const, value: label }],
            };
          },
        ],
      ],
      // Don't transform links inside existing links, code spans, or raw HTML
      { ignore: ['link', 'linkReference', 'code', 'inlineCode', 'html'] },
    );
  };
}

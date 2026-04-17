import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../site.config';
import { getAllPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}/`,
      categories: post.data.tags,
      author: siteConfig.author,
    })),
    customData: `<language>en-us</language>`,
  });
}

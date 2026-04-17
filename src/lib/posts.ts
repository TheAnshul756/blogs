import { getCollection, type CollectionEntry } from 'astro:content';
import readingTime from 'reading-time';

export type Post = CollectionEntry<'posts'>;

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getReadingTime(body: string | undefined): string {
  if (!body) return '1 min read';
  return readingTime(body).text;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getAllTags(): Promise<Map<string, Post[]>> {
  const posts = await getAllPosts();
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const key = tag.toLowerCase();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(post);
    }
  }
  return map;
}

export async function getAllCategories(): Promise<Map<string, Post[]>> {
  const posts = await getAllPosts();
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    const key = post.data.category;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(post);
  }
  return map;
}

export async function getAllSeries(): Promise<Map<string, Post[]>> {
  const posts = await getAllPosts();
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    if (!post.data.series) continue;
    const key = post.data.series;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(post);
  }
  for (const [key, list] of map) {
    list.sort((a, b) => {
      const ao = a.data.seriesOrder ?? 0;
      const bo = b.data.seriesOrder ?? 0;
      return ao - bo;
    });
    map.set(key, list);
  }
  return map;
}

export async function getArchive(): Promise<Map<string, Post[]>> {
  const posts = await getAllPosts();
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    const d = post.data.pubDate;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(post);
  }
  return map;
}

export async function getRelatedPosts(
  current: Post,
  limit = 3
): Promise<Post[]> {
  const posts = await getAllPosts();
  const others = posts.filter((p) => p.id !== current.id);
  const scored = others.map((p) => {
    let score = 0;
    if (p.data.category === current.data.category) score += 2;
    if (p.data.series && p.data.series === current.data.series) score += 5;
    const tagOverlap = p.data.tags.filter((t) =>
      current.data.tags.includes(t)
    ).length;
    score += tagOverlap * 3;
    return { post: p, score };
  });
  scored.sort((a, b) => b.score - a.score || b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime());
  return scored.slice(0, limit).map((s) => s.post);
}

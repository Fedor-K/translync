import { redis } from "@/lib/sessions";
import type { BlogPost } from "@/lib/blog-utils";

const POSTS_INDEX_KEY = "blog:posts:index";
const POST_KEY_PREFIX = "blog:post:";

export async function publishPost(post: BlogPost): Promise<void> {
  // Store the post
  await redis("set", `${POST_KEY_PREFIX}${post.slug}`, JSON.stringify(post));

  // Add to index (sorted list for listing page)
  const indexEntry = JSON.stringify({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    segment: post.segment,
    readingTime: post.readingTime,
    publishedAt: post.publishedAt,
    keywords: post.keywords,
  });
  await redis("lpush", POSTS_INDEX_KEY, indexEntry);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const raw = await redis("get", `${POST_KEY_PREFIX}${slug}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BlogPost;
  } catch {
    return null;
  }
}

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  segment?: string;
  readingTime: number;
  publishedAt: string;
  keywords: string[];
}

export async function listPosts(): Promise<PostSummary[]> {
  const raw = await redis("lrange", POSTS_INDEX_KEY, 0, -1);
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s: string) => {
      try { return JSON.parse(s) as PostSummary; } catch { return null; }
    })
    .filter((p): p is PostSummary => p !== null);
}

export async function listSlugs(): Promise<string[]> {
  const posts = await listPosts();
  return posts.map((p) => p.slug);
}

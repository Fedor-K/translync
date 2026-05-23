import { redis } from "@/lib/sessions";
import type { BlogPost } from "@/lib/blog-utils";

const POSTS_INDEX_KEY = "blog:posts:index";
const POST_KEY_PREFIX = "blog:post:";

export async function publishPost(post: BlogPost): Promise<void> {
  // Store the post
  await redis("set", `${POST_KEY_PREFIX}${post.slug}`, JSON.stringify(post));

  // Remove old index entry for this slug (if republishing)
  const existing = await redis("lrange", POSTS_INDEX_KEY, 0, -1);
  if (Array.isArray(existing)) {
    for (const raw of existing) {
      try {
        const entry = JSON.parse(raw);
        if (entry.slug === post.slug) {
          await redis("lrem", POSTS_INDEX_KEY, 0, raw);
        }
      } catch {
        // skip malformed
      }
    }
  }

  // Add to index
  const indexEntry = JSON.stringify({
    slug: post.slug,
    topicId: post.topicId,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
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
  topicId?: string;
  title: string;
  excerpt: string;
  coverImage?: string;
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
  // Return both topicIds and slugs for dedup matching
  return posts.flatMap((p) => [p.slug, ...(p.topicId ? [p.topicId] : [])]);
}

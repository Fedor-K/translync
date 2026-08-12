import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/programmatic-seo";
import { COMPETITOR_SLUGS } from "@/lib/competitors";
import { safeListPosts } from "@/lib/posts-safe";

// Blog posts are published continuously through /api/blog/create, so a sitemap
// frozen at build time would hide every post until the next deploy. Revalidate
// hourly instead.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://translync.app";
  const segments = ["churches", "ngos", "universities", "communities"];

  const entries: MetadataRoute.Sitemap = [
    // English pages
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // English segment pages
  for (const seg of segments) {
    entries.push({ url: `${base}/for/${seg}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 });
  }

  // Comparison pages
  entries.push({ url: `${base}/vs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  for (const comp of COMPETITOR_SLUGS) {
    entries.push({ url: `${base}/vs/${comp}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  }
  entries.push({ url: `${base}/best-church-translation-app`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  entries.push({ url: `${base}/zoom-interpretation-alternative`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });

  // Programmatic SEO pages
  entries.push({ url: `${base}/translation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 });
  for (const slug of getAllSlugs()) {
    entries.push({ url: `${base}/translation/${slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Blog posts — the same set /blog lists. Without these, published posts are
  // only discoverable by crawling the index page, which slows indexing badly.
  // safeListPosts bounds the wait: an unreachable store must not hang the route,
  // which a plain try/catch does not prevent.
  for (const post of await safeListPosts()) {
    if (!post.slug) continue;
    const published = post.publishedAt ? new Date(post.publishedAt) : null;
    const lastModified =
      published && !Number.isNaN(published.getTime()) ? published : new Date();
    entries.push({
      url: `${base}/blog/${post.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}

import {
  slugify,
  readingTime,
  extractExcerpt,
  extractMetaDescription,
  extractToC,
  extractFAQ,
  type BlogPost,
} from "@/lib/blog-utils";

export function processContent(
  title: string,
  content: string,
  keywords: string[],
  category: string,
  segment?: string,
): BlogPost {
  return {
    slug: slugify(title),
    title,
    content,
    excerpt: extractExcerpt(content),
    metaDescription: extractMetaDescription(content),
    keywords,
    category,
    segment,
    toc: extractToC(content),
    faq: extractFAQ(content),
    readingTime: readingTime(content),
    publishedAt: new Date().toISOString(),
    status: "published",
  };
}

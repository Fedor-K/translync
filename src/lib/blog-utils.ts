export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function readingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function extractExcerpt(content: string, maxLength = 160): string {
  const plain = content
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).replace(/\s\S*$/, "") + "...";
}

export function extractMetaDescription(content: string, maxLength = 155): string {
  return extractExcerpt(content, maxLength);
}

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export function extractToC(content: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocEntry[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/\*\*/g, "").trim();
    const id = slugify(text);
    toc.push({ id, text, level });
  }
  return toc;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export function extractFAQ(content: string): FaqEntry[] {
  const faqSection = content.split(/##\s+Frequently Asked Questions/i)[1];
  if (!faqSection) return [];

  const faqs: FaqEntry[] = [];
  const qRegex = /###\s+(.+\?)\s*\n\n([\s\S]*?)(?=\n###\s|\n##\s|$)/g;
  let match;

  while ((match = qRegex.exec(faqSection)) !== null) {
    faqs.push({
      question: match[1].trim(),
      answer: match[2].trim(),
    });
  }
  return faqs;
}

export function addHeadingIds(content: string): string {
  return content.replace(/^(#{2,3})\s+(.+)$/gm, (_, hashes, text) => {
    const id = slugify(text.replace(/\*\*/g, ""));
    return `${hashes} ${text} {#${id}}`;
  });
}

export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  segment?: string;
  toc: TocEntry[];
  faq: FaqEntry[];
  readingTime: number;
  publishedAt: string;
  status: "draft" | "published";
}

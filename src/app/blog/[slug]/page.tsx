import { notFound } from "next/navigation";
import { getPost, listPosts } from "@/services/blog-publisher";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Translync Blog`,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      url: `https://translync.app/blog/${post.slug}`,
      ...(post.coverImage && { images: [{ url: post.coverImage, width: 1792, height: 1024, alt: post.title }] }),
    },
    alternates: {
      canonical: `https://translync.app/blog/${post.slug}`,
    },
  };
}

// Simple markdown to HTML (handles H2, H3, bold, links, lists, paragraphs)
function renderMarkdown(md: string): string {
  return md
    // Code blocks
    .replace(/```[\s\S]*?```/g, (m) => `<pre class="bg-gray-100 rounded-xl p-4 text-sm overflow-x-auto my-4"><code>${m.slice(3, -3).trim()}</code></pre>`)
    // Headings
    .replace(/^### (.+)$/gm, (_, t) => `<h3 id="${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}" class="text-lg font-bold text-gray-900 mt-8 mb-3">${t}</h3>`)
    .replace(/^## (.+)$/gm, (_, t) => `<h2 id="${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}" class="text-2xl font-bold text-gray-900 mt-10 mb-4">${t}</h2>`)
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul class="list-disc space-y-1 my-4 ml-4">${m}</ul>`)
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>')
    // Paragraphs (lines that aren't already HTML)
    .replace(/^(?!<[hulo]|<pre|<li)(.+)$/gm, '<p class="text-gray-700 leading-relaxed mb-4">$1</p>')
    // Clean up extra whitespace
    .replace(/\n{3,}/g, "\n\n");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const allPosts = await listPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category || p.segment === post.segment)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Translync" },
    publisher: {
      "@type": "Organization",
      name: "Translync",
      logo: { "@type": "ImageObject", url: "https://translync.app/icon.svg" },
    },
    url: `https://translync.app/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    wordCount: post.content.split(/\s+/).length,
    ...(post.faq.length > 0 && {
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    }),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="bg-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="font-bold text-xl">Translync</a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/blog" className="text-blue-200 hover:text-white">Blog</a>
            <a href="/login" className="bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded-lg">
              Start Free
            </a>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>
      )}

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-sm text-gray-400">{post.readingTime} min read</span>
          <span className="text-sm text-gray-400">
            {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Table of Contents */}
        {post.toc.length > 0 && (
          <nav className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Contents</p>
            <ul className="space-y-2">
              {post.toc.map((entry) => (
                <li key={entry.id} className={entry.level === 3 ? "ml-4" : ""}>
                  <a
                    href={`#${entry.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {entry.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Content */}
        <article
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 mt-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to try it?</h2>
          <p className="text-blue-200 mb-6">30 free minutes. No credit card. No app download.</p>
          <a
            href="/login"
            className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            Start Free
          </a>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Posts</h2>
            <div className="space-y-3">
              {relatedPosts.map((rp) => (
                <a
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="block bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition"
                >
                  <h3 className="font-semibold text-gray-900 text-sm">{rp.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{rp.readingTime} min read</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
        <a href="/" className="hover:text-gray-600">Translync</a> · <a href="/blog" className="hover:text-gray-600">Blog</a> · <a href="/privacy" className="hover:text-gray-600">Privacy</a>
      </footer>
    </div>
  );
}

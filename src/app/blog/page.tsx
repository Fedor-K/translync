import { listPosts } from "@/services/blog-publisher";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Translync",
  description: "Tips, guides, and insights about real-time AI translation for events, churches, NGOs, universities, and communities.",
};

const CATEGORY_LABELS: Record<string, string> = {
  guides: "Guide",
  comparisons: "Comparison",
  "use-cases": "Case Study",
  industry: "Industry",
  tips: "Tips",
};

export default async function BlogPage() {
  const posts = await listPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Translync Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Guides, insights, and tips on real-time AI translation for events.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium mb-2">No posts yet</p>
            <p className="text-sm">Check back soon for fresh content.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-blue-200 hover:shadow-md transition-all"
              >
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {CATEGORY_LABELS[post.category] || post.category}
                  </span>
                  {post.segment && (
                    <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full">
                      {post.segment}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {post.readingTime} min read
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.keywords.slice(0, 3).map((kw) => (
                    <span key={kw} className="text-xs text-gray-400">
                      #{kw.replace(/\s+/g, "-")}
                    </span>
                  ))}
                </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
        <a href="/" className="hover:text-gray-600">Translync</a> · <a href="/privacy" className="hover:text-gray-600">Privacy</a> · <a href="/terms" className="hover:text-gray-600">Terms</a>
      </footer>
    </div>
  );
}

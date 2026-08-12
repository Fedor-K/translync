import { safeListPosts } from "@/lib/posts-safe";
import type { PostSummary } from "@/services/blog-publisher";

/**
 * Links to blog posts from the pages Google actually crawls.
 *
 * Search Console reported 19 of 27 posts as "Discovered - currently not indexed"
 * or "URL is unknown to Google": known about, never fetched. Until now the only
 * internal route to a post was the blog index, which put every post two clicks
 * from the homepage behind a single dynamic page. That is not enough of a signal
 * to spend crawl budget on, especially while the sitemap was advertising 307 URLs.
 *
 * So posts get linked from the static, frequently-crawled pages instead. `match`
 * takes the host page's own subject words and prefers posts about the same thing,
 * which keeps the links relevant rather than decorative — and, because different
 * pages match different posts, spreads coverage across the whole archive instead
 * of pointing everything at the newest six.
 *
 * Non-fatal by construction: a storage hiccup renders nothing rather than taking
 * the host page down with it.
 */
/** Stable small hash, so a given host page always fills from the same offset. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default async function RelatedPosts({
  limit = 4,
  match = [],
  heading = "From the blog",
}: {
  limit?: number;
  /** Subject words of the host page; posts mentioning them come first. */
  match?: string[];
  heading?: string;
}) {
  const posts: PostSummary[] = await safeListPosts();
  if (posts.length === 0) return null;

  const byDate = [...posts].sort((a, b) => {
    const at = Date.parse(a.publishedAt || "");
    const bt = Date.parse(b.publishedAt || "");
    return (Number.isNaN(bt) ? 0 : bt) - (Number.isNaN(at) ? 0 : at);
  });

  const needles = match.map((m) => m.toLowerCase()).filter(Boolean);
  const relevance = (p: PostSummary): number => {
    if (needles.length === 0) return 0;
    const haystack = `${p.title} ${p.keywords?.join(" ") ?? ""} ${p.segment ?? ""}`.toLowerCase();
    return needles.reduce((n, needle) => n + (haystack.includes(needle) ? 1 : 0), 0);
  };

  // Half the slots go to posts about this page's subject, newest first. The other
  // half rotate through the whole archive from an offset keyed to the host page.
  //
  // The cap on the relevant half is the part that matters. Without it, every page
  // mentioning churches filled all four slots with the same church posts, and six
  // posts ended up linked from nowhere but the blog index — including the two
  // Google had already declined to fetch. Relevance decides what a reader sees
  // first; the rotation makes sure nothing is orphaned.
  const relevantSlots = Math.max(1, Math.ceil(limit / 2));
  const offset = hash(`${heading}|${match.join(",")}`);
  // Rotate within the relevant tier as well as outside it. Taking the newest
  // matches meant pages sharing a subject shared their picks, and the posts that
  // were neither newest-relevant nor lucky in the rotation stayed orphaned.
  const relevantPool = byDate.filter((p) => relevance(p) > 0);
  const chosen = relevantPool.length
    ? Array.from({ length: Math.min(relevantSlots, relevantPool.length) }, (_, i) =>
        relevantPool[(offset + i) % relevantPool.length],
      )
    : [];
  const taken = new Set(chosen.map((p) => p.slug));
  const rest = byDate.filter((p) => !taken.has(p.slug));
  if (rest.length > 0) {
    const start = offset % rest.length;
    for (let i = 0; i < rest.length && chosen.length < limit; i++) {
      chosen.push(rest[(start + i) % rest.length]);
    }
  }

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{heading}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {chosen.map((p) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:border-blue-300 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-gray-900 mb-1 leading-snug">{p.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{p.excerpt}</p>
          </a>
        ))}
      </div>
      <a href="/blog" className="inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
        All articles &rarr;
      </a>
    </section>
  );
}

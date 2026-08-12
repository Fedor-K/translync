import { COMPETITORS } from "@/lib/competitors";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";

// Links continuously-published posts; rebuild hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Translync vs Competitors — Comparison Pages",
  description: "Compare Translync with Wordly, Interactio, KUDO, and Interprefy. See pricing, features, and which platform is right for your events.",
  // Without this the root layout's hardcoded homepage canonical applies, and the
  // comparison hub tells Google to index the homepage instead of itself.
  alternates: { canonical: "https://translync.app/vs" },
};

export default function CompareIndex() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Compare Translync</h1>
        <p className="text-lg text-gray-600 mb-10">See how Translync stacks up against other translation platforms.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.values(COMPETITORS).map((c) => (
            <a key={c.slug} href={`/vs/${c.slug}`} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-300 hover:shadow-md transition">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Translync vs {c.name}</h2>
              <p className="text-sm text-gray-500 mb-3">{c.tagline}</p>
              <span className="text-blue-600 text-sm font-medium">See comparison &rarr;</span>
            </a>
          ))}
          <a href="/best-church-translation-app" className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-6 hover:border-blue-400 hover:shadow-md transition">
            <h2 className="text-lg font-bold text-blue-900 mb-1">Church Translation Compared</h2>
            <p className="text-sm text-blue-600 mb-3">Volunteers, interpreters and the five main platforms</p>
            <span className="text-blue-700 text-sm font-medium">Read the comparison &rarr;</span>
          </a>
        </div>

        <div className="mt-12">
          <RelatedPosts
            match={["vs", "comparison", "alternative", "wordly", "interprefy", "kudo"]}
            heading="Comparisons and buying guides"
            limit={4}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

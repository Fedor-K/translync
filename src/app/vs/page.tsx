import { COMPETITORS } from "@/lib/competitors";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Translync vs Competitors — Comparison Pages",
  description: "Compare Translync with Wordly, Interactio, KUDO, and Interprefy. See pricing, features, and which platform is right for your events.",
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
            <h2 className="text-lg font-bold text-blue-900 mb-1">Best Church Translation App 2026</h2>
            <p className="text-sm text-blue-600 mb-3">Top 5 platforms compared</p>
            <span className="text-blue-700 text-sm font-medium">See ranking &rarr;</span>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

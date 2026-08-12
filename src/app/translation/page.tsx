import { getAllProgrammaticPages } from "@/lib/programmatic-seo";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Event Translation Services — Translync",
  description:
    "Real-time translation for conferences, weddings, church services, seminars, workshops, summits and town halls. Attendees listen in their own language on their phone.",
  // Without this the root layout's homepage canonical applies, and the hub that
  // links every programmatic translation page never gets indexed itself.
  alternates: { canonical: "https://translync.app/translation" },
};

export default function TranslationIndexPage() {
  const pages = getAllProgrammaticPages();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Translation Services" }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Event Translation Services</h1>
        <p className="text-lg text-gray-600 mb-10">
          Real-time translation for the events people actually run. Attendees scan a QR code and listen in
          their own language on their phone — 70+ languages, $3 per hour, nothing to install.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {pages.map((page) => (
            <a
              key={page.slug}
              href={`/translation/${page.slug}`}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-300 hover:shadow-md transition"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-1">{page.eventType} Translation</h2>
              <p className="text-sm text-gray-500">Live translation for {page.plural}</p>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

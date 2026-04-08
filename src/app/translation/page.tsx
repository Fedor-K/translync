import { getAllProgrammaticPages, TOTAL_PAGES } from "@/lib/programmatic-seo";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Translation Services for Events — Translync",
  description: `Real-time AI translation for ${TOTAL_PAGES}+ event and language combinations. Find translation for your specific event type and language.`,
};

export default function TranslationIndexPage() {
  const pages = getAllProgrammaticPages();

  // Group by event type
  const grouped: Record<string, typeof pages> = {};
  for (const page of pages) {
    if (!grouped[page.eventType]) grouped[page.eventType] = [];
    grouped[page.eventType].push(page);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Translation Services" }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Event Translation Services</h1>
        <p className="text-lg text-gray-600 mb-10">
          Real-time AI translation for {TOTAL_PAGES}+ event and language combinations. Find the right solution for your event.
        </p>

        <div className="space-y-8">
          {Object.entries(grouped).map(([eventType, eventPages]) => (
            <div key={eventType}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{eventType} Translation</h2>
              <div className="flex flex-wrap gap-2">
                {eventPages.map((page) => (
                  <a
                    key={page.slug}
                    href={`/translation/${page.slug}`}
                    className="bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 text-sm px-3 py-2 rounded-lg transition"
                  >
                    in {page.language}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

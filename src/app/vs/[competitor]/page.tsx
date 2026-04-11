import { notFound } from "next/navigation";
import { COMPETITORS, COMPETITOR_SLUGS } from "@/lib/competitors";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ competitor: string }>;
}

export async function generateStaticParams() {
  return COMPETITOR_SLUGS.map((competitor) => ({ competitor }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competitor } = await params;
  const data = COMPETITORS[competitor];
  if (!data) return {};
  return {
    title: data.title,
    description: data.metaDescription,
    alternates: { canonical: `https://translync.app/vs/${data.slug}` },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { competitor } = await params;
  const data = COMPETITORS[competitor];
  if (!data) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.title,
    description: data.metaDescription,
    url: `https://translync.app/vs/${data.slug}`,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare", href: "/vs" }, { label: `vs ${data.name}` }]} />

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{data.h1}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.intro}</p>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-10 shadow-sm">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
            <div className="px-5 py-4 font-semibold text-gray-500 text-sm">Feature</div>
            <div className="px-5 py-4 font-semibold text-gray-700 text-sm text-center">{data.name}</div>
            <div className="px-5 py-4 font-semibold text-blue-700 text-sm text-center bg-blue-50">Translync</div>
          </div>
          {data.features.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 border-b border-gray-50 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
              <div className="px-5 py-3 text-sm font-medium text-gray-700">{row.feature}</div>
              <div className="px-5 py-3 text-sm text-gray-600 text-center">{row.competitor}</div>
              <div className="px-5 py-3 text-sm text-blue-700 text-center bg-blue-50/30 font-medium">{row.translync}</div>
            </div>
          ))}
        </div>

        {/* Why Translync */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why choose Translync over {data.name}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.advantages.map((adv, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p className="text-gray-700 text-sm">{adv}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who is each for */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who is each platform for?</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-gray-700 leading-relaxed">{data.idealFor}</p>
          </div>
        </div>

        {/* Pricing comparison */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing comparison</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-1">{data.name}</h3>
              <div className="text-2xl font-bold text-gray-700 mb-1">{data.pricing}</div>
              <p className="text-sm text-gray-500">{data.pricingNote}</p>
            </div>
            <div className="bg-blue-50 rounded-2xl border-2 border-blue-600 p-6">
              <h3 className="font-bold text-blue-900 mb-1">Translync</h3>
              <div className="text-2xl font-bold text-blue-700 mb-1">$3/hr per language</div>
              <p className="text-sm text-blue-600">Pay as you go. No subscription. 30 free minutes.</p>
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The verdict</h2>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
            <p className="text-gray-800 leading-relaxed font-medium">{data.verdict}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Try Translync free</h2>
          <p className="text-blue-200 mb-6">30 free minutes. No credit card. No app download. See for yourself.</p>
          <a href="/login" className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3 rounded-xl transition">
            Start Free
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

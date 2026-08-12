import { notFound } from "next/navigation";
import { getProgrammaticPage, getAllSlugs, FEATURED_LANGUAGES } from "@/lib/programmatic-seo";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getProgrammaticPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `https://translync.app/translation/${slug}` },
  };
}

export default async function ProgrammaticPage({ params }: Props) {
  const { slug } = await params;
  const page = getProgrammaticPage(slug);
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${page.eventType} Translation`,
        description: page.metaDescription,
        provider: {
          "@type": "Organization",
          name: "Translync",
          url: "https://translync.app",
        },
        serviceType: "Real-time AI Translation",
        areaServed: "Worldwide",
        availableLanguage: FEATURED_LANGUAGES,
        offers: {
          "@type": "Offer",
          price: "3.00",
          priceCurrency: "USD",
          description: "Per hour per language",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Translation Services", href: "/translation" }, { label: page.eventType }]} />

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{page.h1}</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">{page.intro}</p>

        {/* Challenges */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
          <ul className="space-y-3">
            {page.challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">!</span>
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* How It Works */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Translync Solves This</h2>
          <div className="space-y-4">
            {page.howItWorks.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                <p className="text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why organizers choose Translync</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {page.benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p className="text-gray-700 text-sm">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Languages — the axis that used to be 16 separate URLs. */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages</h2>
          <p className="text-gray-600 mb-4">
            Attendees at a {page.eventType.toLowerCase()} each choose their own language, so several can be
            listening in different ones at the same time. These are the most requested:
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {FEATURED_LANGUAGES.map((lang) => (
              <span key={lang} className="bg-white border border-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-lg">
                {lang}
              </span>
            ))}
          </div>
          <p className="text-gray-600 text-sm">
            70+ languages are supported in total, and you can add one during the session if a guest needs it.
          </p>
        </section>

        {/* Pricing */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-gray-900">$3</span>
              <span className="text-gray-500">per hour per language</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              A one-hour {page.eventType.toLowerCase()} in one language costs $3. Three languages for two hours
              costs $18. Billing is by the minute, so a session that runs short costs less.
            </p>
            <p className="text-sm text-blue-600 font-medium">30 free minutes included with every account — no credit card required.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common questions</h2>
          <div className="space-y-4">
            {page.faqs.map((f) => (
              <div key={f.q} className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-blue-200 mb-6">{page.cta}</p>
          <a href="/login" className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3 rounded-xl transition">
            Start Free
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

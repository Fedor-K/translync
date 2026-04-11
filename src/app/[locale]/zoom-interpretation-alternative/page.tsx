import { notFound } from "next/navigation";
import { ZOOM_TRANSLATIONS } from "@/lib/zoom-i18n";
import { RTL_LOCALES, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const VALID_LOCALES = ["es", "zh", "ar", "pt"];

interface Props { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = ZOOM_TRANSLATIONS[locale];
  if (!t) return {};
  return { title: t.metaTitle, description: t.metaDescription, alternates: { canonical: `https://translync.app/${locale}/zoom-interpretation-alternative` } };
}

export default async function LocalizedZoomPage({ params }: Props) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale)) notFound();
  const t = ZOOM_TRANSLATIONS[locale];
  if (!t) notFound();

  const isRTL = RTL_LOCALES.includes(locale as Locale);
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: `/${locale}` }, { label: t.badge }]} />

        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">{t.badge}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.h1Line1}<br /><span className="text-blue-600">{t.h1Line2}</span></h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{t.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/login" className="inline-flex items-center justify-center bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3.5 rounded-lg text-lg">{t.ctaPrimary}</a>
            <a href="#solution" className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-lg">{t.ctaSecondary}</a>
          </div>
        </div>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.problemHeading}</h2>
          <div className="space-y-3">
            {t.problems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold shrink-0">!</span>
                <div><p className="font-semibold text-gray-900 mb-1">{item.problem}</p><p className="text-gray-600 text-sm">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="solution" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.solutionHeading}</h2>
          <div className="space-y-3">
            {t.solutions.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4">
                <svg className="w-7 h-7 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                <div><p className="font-semibold text-gray-900 mb-1">{item.solution}</p><p className="text-gray-600 text-sm">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.comparisonHeading}</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-gray-50 font-semibold text-gray-700 text-sm">
              {t.comparisonHeaders.map((h, i) => <div key={i} className={`px-4 py-3 ${i === 2 ? "bg-blue-50 text-blue-700" : ""}`}>{h}</div>)}
            </div>
            {t.comparisonRows.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-t border-gray-50 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
                <div className="px-4 py-3 text-sm font-medium text-gray-700">{row[0]}</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center">{row[1]}</div>
                <div className="px-4 py-3 text-sm text-blue-700 text-center bg-blue-50/30 font-medium">{row[2]}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.useCasesHeading}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.useCases.map((uc) => (
              <div key={uc.title} className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="font-semibold text-gray-900 mb-1">{uc.title}</p>
                <p className="text-gray-600 text-sm">{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.faqHeading}</h2>
          <div className="space-y-3">
            {t.faq.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-200 group">
                <summary className="px-6 py-5 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 list-none flex justify-between items-center">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-400 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm border-t border-gray-100 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">{t.ctaBottomHeading}</h2>
          <p className="text-blue-200 mb-6">{t.ctaBottomSubtitle}</p>
          <a href="/login" className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3 rounded-xl transition">{t.ctaBottomButton}</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

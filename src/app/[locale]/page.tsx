import { notFound } from "next/navigation";
import { TRANSLATIONS, LOCALES, RTL_LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import LocalizedFooter from "@/components/LocalizedFooter";

interface Props {
  params: Promise<{ locale: string }>;
}

const VALID_LOCALES = ["es", "zh", "ar"];

export async function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale)) return {};
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS];
  return {
    title: `Translync — ${t.hero.title} ${t.hero.highlight}`,
    description: t.hero.subtitle,
    alternates: {
      canonical: `https://translync.app/${locale}`,
      languages: {
        en: "https://translync.app",
        es: "https://translync.app/es",
        zh: "https://translync.app/zh",
        ar: "https://translync.app/ar",
      },
    },
  };
}

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale)) notFound();

  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS];
  const isRTL = RTL_LOCALES.includes(locale as Locale);
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <div dir={dir}>
      {/* Language Switcher + Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
          <a href={`/${locale}`} className="text-2xl font-bold tracking-tight">Translync</a>
          <div className="hidden md:flex items-center gap-8 text-sm text-blue-200">
            <a href="#how-it-works" className="hover:text-white transition-colors">{t.nav.howItWorks}</a>
            <a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a>
            <a href="#faq" className="hover:text-white transition-colors">{t.nav.faq}</a>
          </div>
          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-2 text-xs text-blue-300">
              {(["en", ...VALID_LOCALES] as const).map((l) => (
                <a
                  key={l}
                  href={l === "en" ? "/" : `/${l}`}
                  className={`hover:text-white transition-colors ${l === locale ? "text-white font-bold" : ""}`}
                >
                  {LOCALE_NAMES[l as Locale]}
                </a>
              ))}
            </div>
            <a href="/login" className="hidden sm:inline-block text-sm text-blue-200 hover:text-white transition-colors">{t.nav.signIn}</a>
            <a href="/login" className="bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">{t.nav.startFree}</a>
          </div>
        </nav>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-28 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            {t.hero.title}<br />
            <span className="text-blue-300">{t.hero.highlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed">{t.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/login" className="inline-flex items-center justify-center bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg">{t.hero.ctaStart}</a>
            <a href="#how-it-works" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors border border-white/20">{t.hero.ctaHow}</a>
          </div>
          <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-lg mx-auto">
            <div><div className="text-3xl sm:text-4xl font-bold">70+</div><div className="text-blue-300 text-sm mt-1">{t.hero.statLanguages}</div></div>
            <div><div className="text-3xl sm:text-4xl font-bold">&lt;2s</div><div className="text-blue-300 text-sm mt-1">{t.hero.statLatency}</div></div>
            <div><div className="text-3xl sm:text-4xl font-bold">$3</div><div className="text-blue-300 text-sm mt-1">{t.hero.statPrice}</div></div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 30C1200 60 900 0 720 0C540 0 240 60 0 30L0 60Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.howItWorks.heading}</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">{t.howItWorks.subheading}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.howItWorks.steps.map((s, i) => (
              <div key={i} className="bg-blue-50 rounded-2xl p-8 h-full">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mb-5">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.features.heading}</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">{t.features.subheading}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-all duration-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.pricing.heading}</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">{t.pricing.subheading}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {t.pricing.plans.map((plan, i) => (
              <div key={i} className={`rounded-2xl border-2 p-8 relative ${i === 1 ? "border-blue-600 shadow-xl" : "border-gray-200"}`}>
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
                  <div className="text-sm text-gray-500">{plan.sub}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={plan.cta === t.pricing.plans[2]?.cta ? "mailto:hello@translync.app" : "/login"} className={`block text-center py-3 px-6 rounded-xl font-semibold transition-colors text-sm ${i === 1 ? "bg-green-500 text-white hover:bg-green-400" : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">{t.pricing.example}</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.faq.heading}</h2>
            <p className="text-lg text-gray-600">{t.faq.subheading}</p>
          </div>
          <div className="space-y-3">
            {t.faq.items.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
                <summary className="px-6 py-5 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors list-none flex justify-between items-center">
                  <span>{faq.question}</span>
                  <svg className="w-5 h-5 text-gray-400 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.cta.heading}</h2>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">{t.cta.subheading}</p>
          <a href="/login" className="inline-flex items-center justify-center bg-green-500 hover:bg-green-400 text-white font-semibold px-10 py-4 rounded-lg transition-colors text-lg">{t.cta.button}</a>
          <p className="text-blue-300 text-sm mt-6">{t.cta.note}</p>
        </div>
      </section>

      <LocalizedFooter t={t.footer} locale={locale} />
    </div>
  );
}

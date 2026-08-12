import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";

/**
 * This page carries 58% of the whole site's search impressions — 194 in 28 days —
 * and sits at position 67. Two things were wrong with it.
 *
 * First, the target. It was written for "best church translation app", which
 * Keyword Planner measures at zero. The query actually producing the impressions is
 * "church translator", and the measurable demand nearby is "church translation"
 * (90/mo, $10.13 CPC), "best church translation system" (50/mo) and "church
 * translation app" (30/mo). The URL keeps its slug — it is what Google has indexed
 * and the standing belongs to it — but the page now speaks to those phrases.
 *
 * Second, the substance. Someone typing "church translator" wants to know how to
 * get a service translated at all: volunteers, hired interpreters, or software. A
 * table of five SaaS products answers a question they have not reached yet. And a
 * comparison in which our own product has no drawbacks reads as an advert, which is
 * exactly what a page at position 67 cannot afford to be. Both are fixed below.
 */

export const metadata: Metadata = {
  title: "Church Translation: Options, Costs and Apps Compared (2026)",
  description:
    "How to translate a church service into other languages: volunteer interpreters, hired professionals, or an AI translation app. What each really costs, plus the five main church translation platforms compared.",
  alternates: { canonical: "https://translync.app/best-church-translation-app" },
};

// Links to continuously-published posts; rebuild hourly.
export const revalidate = 3600;

const APPROACHES = [
  {
    name: "Volunteers from the congregation",
    cost: "No fees, but equipment",
    good: "A bilingual member already knows your church — the names, the references, the way your pastor speaks. Nothing to pay per service.",
    bad: "Simultaneous interpretation is genuinely tiring work, and most volunteers manage 20–30 minutes before quality slips. You need a rota, and one illness leaves a Sunday with no translation. Receivers or headsets still have to be bought, charged and handed round.",
  },
  {
    name: "Hired professional interpreters",
    cost: "Typically hundreds per service, per language",
    good: "The best quality available, and the right answer where nuance genuinely cannot be got wrong.",
    bad: "Priced by the session or the day rather than the hour you need, booked in advance, and hard to find at all for less common languages. A second and third language multiply the cost instead of adding to it.",
  },
  {
    name: "An AI translation app",
    cost: "A few dollars per service, per language",
    good: "No booking and no equipment, languages can be added on the day, and attendees use the phone already in their pocket.",
    bad: "Accuracy is high but not human. It can stumble on strong accents, several people talking at once, poetry, and unusual proper nouns. The speaker's device needs a stable connection.",
  },
];

const APPS = [
  {
    name: "Translync",
    highlight: true,
    pricing: "$3/hr per language",
    pricingSub: "Pay as you go · 30 free minutes",
    languages: "70+",
    appRequired: "No — QR code",
    glossary: "Church glossary (19 languages)",
    setup: "10 seconds",
    diarization: "Yes (AI)",
    tts: "Yes",
    bestFor: "Churches that want affordable AI translation with no subscription",
    notFor:
      "Churches that need certified human interpretation, or that meet somewhere without a reliable connection for the speaker's device.",
  },
  {
    name: "Wordly",
    highlight: false,
    pricing: "From $99/month",
    pricingSub: "Monthly subscription packages",
    languages: "50+",
    appRequired: "No",
    glossary: "General",
    setup: "Account setup required",
    diarization: "Limited",
    tts: "Yes",
    bestFor: "Churches with daily translation needs and a fixed budget",
    notFor: "A church that translates once a week — at that volume a subscription costs more than per-hour billing.",
  },
  {
    name: "Interactio",
    highlight: false,
    pricing: "Enterprise (quote)",
    pricingSub: "Custom pricing per event",
    languages: "Interpreter-dependent",
    appRequired: "Yes (app download)",
    glossary: "Interpreter-provided",
    setup: "Onboarding required",
    diarization: "Manual",
    tts: "Human voice",
    bestFor: "Mega-churches (5,000+ attendees) with enterprise budgets",
    notFor: "Small and mid-size churches: the pricing model and onboarding are built for large organizations.",
  },
  {
    name: "spf.io",
    highlight: false,
    pricing: "From $99/month",
    pricingSub: "Subscription plans",
    languages: "20+",
    appRequired: "No",
    glossary: "Limited church terms",
    setup: "Guided setup",
    diarization: "No",
    tts: "No",
    bestFor: "Small churches wanting a simple text-only solution",
    notFor: "Anyone who needs spoken audio rather than on-screen text, or a language outside its narrower list.",
  },
  {
    name: "OneAccord",
    highlight: false,
    pricing: "$150/month",
    pricingSub: "Fixed monthly subscription",
    languages: "30+",
    appRequired: "No",
    glossary: "Church-focused",
    setup: "Account setup",
    diarization: "No",
    tts: "No",
    bestFor: "Mid-size churches willing to pay a fixed monthly fee",
    notFor: "Churches translating occasionally, where a fixed monthly fee is poor value.",
  },
];

const FAQS = [
  {
    q: "What is the cheapest way to translate a church service?",
    a: "A bilingual volunteer costs nothing in fees, but you still need receivers or headsets and enough volunteers to cover every service. Once equipment is counted, an AI app at a few dollars per service usually costs less than kitting out a room — and it does not depend on anyone turning up.",
  },
  {
    q: "Does the congregation need to install an app?",
    a: "With Translync, no: they scan a QR code and the translation opens in the browser their phone already has. Some platforms do require a download, which matters for a congregation with visitors and older members, so it is worth checking before committing.",
  },
  {
    q: "How many languages can one service run in?",
    a: "With an AI platform, as many as are needed at once — each person picks their own and you pay per language in use. With human interpreters every language means another interpreter, so the cost rises in steps rather than smoothly.",
  },
  {
    q: "Is AI translation accurate enough for preaching?",
    a: "For ordinary speech it is strong, and a church glossary helps with names, book titles and recurring terms. It is weaker on poetry, strong accents and several people speaking at once. The honest way to decide is to run one of your own sermons through it — 30 free minutes is enough to hear the result before you rely on it.",
  },
  {
    q: "How much delay is there?",
    a: "Translated audio arrives in under two seconds, so listeners follow about a sentence behind the speaker. That is roughly what a human simultaneous interpreter delivers.",
  },
  {
    q: "Does it work if the church wifi is weak?",
    a: "The speaker's device needs a stable connection. Listeners need very little, because they are receiving rather than sending — mobile data on a phone is enough for them.",
  },
];

export default function BestChurchApp() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Church Translation" }]} />

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Church Translation: Options, Costs and Apps Compared
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            If part of your congregation cannot follow the service in English, there are three ways to fix it:
            ask bilingual members to interpret, hire professionals, or use a translation app. Here is what each
            actually costs and where each falls down — then the five main church translation platforms compared.
          </p>
        </div>

        {/* The question people are actually asking before they reach a product table. */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Three ways to translate a service</h2>
          <div className="space-y-4">
            {APPROACHES.map((a) => (
              <div key={a.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{a.name}</h3>
                  <span className="text-sm font-semibold text-blue-700">{a.cost}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  <span className="font-semibold text-gray-900">Works because: </span>
                  {a.good}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-900">Breaks down when: </span>
                  {a.bad}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Church translation apps compared</h2>
          <p className="text-gray-600 mb-6">
            Five platforms churches actually shortlist. We build one of them, so read the &ldquo;not the right
            choice when&rdquo; line under each — ours included — rather than the label.
          </p>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto mb-8 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left font-semibold text-gray-500">Platform</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-500">Price</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-500">Languages</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-500">App needed?</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-500">Spoken audio</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-500">Setup</th>
                </tr>
              </thead>
              <tbody>
                {APPS.map((app) => (
                  <tr key={app.name} className={app.highlight ? "bg-blue-50/50" : ""}>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {app.name}
                      {app.highlight && (
                        <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">ours</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">{app.pricing}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{app.languages}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{app.appRequired}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{app.tts}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{app.setup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-6">
            {APPS.map((app) => (
              <div
                key={app.name}
                className={`bg-white rounded-2xl border p-6 ${app.highlight ? "border-blue-300" : "border-gray-100"}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                  {app.highlight && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">our product</span>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Pricing</p>
                    <p className="text-gray-900 font-semibold">{app.pricing}</p>
                    <p className="text-xs text-gray-400">{app.pricingSub}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Suits</p>
                    <p className="text-gray-700 text-sm">{app.bestFor}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  <span className="font-semibold text-gray-900">Not the right choice when: </span>
                  {app.notFor}
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">{app.languages} languages</span>
                  <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">App: {app.appRequired}</span>
                  <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">Glossary: {app.glossary}</span>
                  <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">Diarization: {app.diarization}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What a Sunday actually costs</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Take a 90-minute service translated into Spanish, Mandarin and Arabic. On Translync that is three
              languages for an hour and a half — about $13.50, billed by the minute. A $99–150 monthly
              subscription only pays for itself if you translate several times a week. Hired interpreters for
              three languages run into the hundreds for the same morning, because each language needs its own
              person and they are booked by the session rather than the minute.
            </p>
            <p className="text-gray-600 text-sm">
              Volunteers change the arithmetic rather than removing it: no fees, but receivers for a
              congregation of any size are a real purchase, and someone has to own the rota.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Keep reading</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href="/for/churches" className="bg-white border border-gray-200 hover:border-blue-400 text-gray-700 text-sm px-4 py-2 rounded-lg transition">
              Translync for churches
            </a>
            <a href="/translation/church-service-translation" className="bg-white border border-gray-200 hover:border-blue-400 text-gray-700 text-sm px-4 py-2 rounded-lg transition">
              Church service translation
            </a>
            <a href="/vs/wordly" className="bg-white border border-gray-200 hover:border-blue-400 text-gray-700 text-sm px-4 py-2 rounded-lg transition">
              Translync vs Wordly
            </a>
          </div>
          <RelatedPosts match={["church", "churches", "sermon", "congregation"]} heading="Guides for churches" limit={4} />
        </section>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Hear it on your own sermon first</h2>
          <p className="text-blue-200 mb-6">30 free minutes. No credit card, and nothing for your congregation to install.</p>
          <a href="/login" className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3 rounded-xl transition">
            Start Free
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

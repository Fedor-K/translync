import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Church Translation App 2026 — Top 5 Compared",
  description: "Compare the best church translation apps in 2026. Pricing, features, language support, and setup complexity for Translync, Wordly, Interactio, spf.io, and OneAccord.",
  alternates: { canonical: "https://translync.app/best-church-translation-app" },
};

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
    bestFor: "Churches that want affordable, instant AI translation with no subscription",
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
    bestFor: "Small churches wanting a simple text-only translation solution",
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
  },
];

export default function BestChurchApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Best Church Translation App 2026" }]} />

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Best Church Translation App in 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We compared the top 5 church translation platforms on pricing, features, language support, and ease of use. Here's what we found.
          </p>
        </div>

        {/* Quick comparison table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto mb-10 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Platform</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500">Price</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500">Languages</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500">App needed?</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500">AI Voice</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500">Setup</th>
              </tr>
            </thead>
            <tbody>
              {APPS.map((app) => (
                <tr key={app.name} className={app.highlight ? "bg-blue-50/50" : ""}>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {app.name}
                    {app.highlight && <span className="ml-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Our pick</span>}
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

        {/* Detailed reviews */}
        <div className="space-y-8 mb-12">
          {APPS.map((app, i) => (
            <div key={app.name} className={`bg-white rounded-2xl border p-6 ${app.highlight ? "border-blue-600 shadow-md" : "border-gray-100"}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">{i + 1}</span>
                <h2 className="text-xl font-bold text-gray-900">{app.name}</h2>
                {app.highlight && <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Best overall</span>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Pricing</p>
                  <p className="text-gray-900 font-semibold">{app.pricing}</p>
                  <p className="text-xs text-gray-400">{app.pricingSub}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Best for</p>
                  <p className="text-gray-700 text-sm">{app.bestFor}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">{app.languages} languages</span>
                <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">App: {app.appRequired}</span>
                <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">Glossary: {app.glossary}</span>
                <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">Diarization: {app.diarization}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our recommendation</h2>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
            <p className="text-gray-800 leading-relaxed">
              For most churches, <strong>Translync</strong> offers the best value: pay-as-you-go pricing ($3/hr per language), 70+ languages, no app download, and specialized church glossaries. A typical Sunday service in 3 languages costs just $9 — compared to $99-150/month for subscription alternatives. Start with 30 free minutes to test it with your actual sermon.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Try the #1 church translation app</h2>
          <p className="text-blue-200 mb-6">30 free minutes. No credit card. No app download.</p>
          <a href="/login" className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3 rounded-xl transition">
            Start Free
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

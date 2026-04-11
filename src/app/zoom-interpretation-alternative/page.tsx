import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zoom Interpretation Alternative — Translync vs Zoom Translation",
  description: "Frustrated with Zoom's simultaneous interpretation? Translync offers AI translation in 70+ languages, no interpreters needed. Works with any video platform. From $3/hr.",
  keywords: ["Zoom simultaneous interpretation", "Zoom interpretation alternative", "how to add interpretation to Zoom", "Zoom translation", "Zoom multilingual meeting"],
  alternates: {
    canonical: "https://translync.app/zoom-interpretation-alternative",
    languages: {
      es: "https://translync.app/es/zoom-interpretation-alternative",
      zh: "https://translync.app/zh/zoom-interpretation-alternative",
      ar: "https://translync.app/ar/zoom-interpretation-alternative",
      pt: "https://translync.app/pt/zoom-interpretation-alternative",
    },
  },
};

const ZOOM_LIMITATIONS = [
  { problem: "Requires human interpreters", detail: "You need to find, hire, and schedule interpreters for every meeting. Costs $200-500+ per session." },
  { problem: "Limited to Zoom only", detail: "Interpretation only works inside Zoom. If you use Teams, Meet, or in-person events — no solution." },
  { problem: "Maximum 25 languages", detail: "Zoom supports up to 25 language channels. Translync supports 70+." },
  { problem: "Attendees must switch audio channels", detail: "Listeners must manually select an interpretation channel in Zoom settings — confusing for non-tech users." },
  { problem: "No AI option", detail: "Zoom only supports human interpreters. No AI translation, no automation, no cost reduction." },
  { problem: "Complex setup", detail: "Host must enable interpretation, assign interpreters to channels, manage audio routing." },
];

const TRANSLYNC_SOLUTIONS = [
  { solution: "AI-powered — no interpreters needed", detail: "Translync uses AI to transcribe, translate, and deliver audio automatically. No hiring, no scheduling." },
  { solution: "Works everywhere — not just Zoom", detail: "Use with Zoom, Teams, Meet, in-person events, or any setting with a microphone. Platform-independent." },
  { solution: "70+ languages, always available", detail: "No need to find interpreters for rare languages. AI supports 70+ languages instantly." },
  { solution: "QR code access — 3 seconds to join", detail: "Attendees scan a QR code and pick their language. No Zoom account needed, no channel switching." },
  { solution: "$3/hour per language", detail: "A 1-hour meeting in 5 languages costs $15. Compare to $500+ for 5 human interpreters." },
  { solution: "10-second setup", detail: "Create a session, share QR code, speak. No interpreter assignments, no channel configuration." },
];

const FAQ = [
  {
    q: "Can I use Translync during a Zoom call?",
    a: "Yes. Open Translync in a browser tab, share your screen's audio or use a microphone. Attendees scan the QR code on their phone and hear translation — all while staying in the Zoom call.",
  },
  {
    q: "How does Translync compare to Zoom's built-in interpretation?",
    a: "Zoom requires human interpreters ($200-500+/session), supports 25 languages max, and only works inside Zoom. Translync uses AI ($3/hr per language), supports 70+ languages, and works with any platform or in-person event.",
  },
  {
    q: "Is AI translation accurate enough for meetings?",
    a: "For business meetings, church services, and conferences, Translync achieves 90-95% accuracy. For specialized content, built-in domain glossaries (NGO, church, academic) ensure key terms are translated correctly.",
  },
  {
    q: "What about Google Meet or Microsoft Teams?",
    a: "Translync works independently of any video platform. Whether you use Zoom, Meet, Teams, Webex, or meet in person — Translync captures audio from a microphone and delivers translation to attendees' phones.",
  },
  {
    q: "Do attendees need to download anything?",
    a: "No. Attendees scan a QR code with their phone camera. Translation opens instantly in their browser. No app, no account, no download.",
  },
];

export default function ZoomAlternativePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Zoom Interpretation Alternative" }]} />

        {/* Hero */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Zoom Alternative
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Zoom Simultaneous Interpretation<br />
            <span className="text-blue-600">Without the Interpreters</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Zoom's interpretation feature requires human interpreters, costs $200-500+ per session, and only works inside Zoom. Translync gives you AI translation in 70+ languages for $3/hour — with any platform, any event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/login" className="inline-flex items-center justify-center bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg">
              Try Free — 30 Minutes
            </a>
            <a href="#how-it-works" className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-lg transition-colors">
              See How It Works
            </a>
          </div>
        </div>

        {/* Zoom Limitations */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The problem with Zoom interpretation</h2>
          <div className="space-y-3">
            {ZOOM_LIMITATIONS.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold shrink-0">!</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{item.problem}</p>
                  <p className="text-gray-600 text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Translync Solution */}
        <section id="how-it-works" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Translync solves this</h2>
          <div className="space-y-3">
            {TRANSLYNC_SOLUTIONS.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4">
                <svg className="w-7 h-7 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{item.solution}</p>
                  <p className="text-gray-600 text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Side-by-side comparison */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Zoom vs Translync — at a glance</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {[
              ["Feature", "Zoom Interpretation", "Translync"],
              ["Translation method", "Human interpreters only", "AI (automatic)"],
              ["Cost per session", "$200–500+ (interpreter fees)", "$3/hr per language"],
              ["Languages", "Up to 25", "70+"],
              ["Works outside Zoom", "No", "Yes — any platform or in-person"],
              ["Attendee setup", "Switch audio channel in Zoom", "Scan QR code on phone"],
              ["Setup time", "30+ minutes (assign interpreters)", "10 seconds"],
              ["Interpreter scheduling", "Required", "Not needed"],
              ["Speaker diarization", "No", "Yes (AI multi-speaker)"],
              ["Domain glossaries", "No", "Church, NGO, University, Community"],
              ["Free trial", "No", "30 free minutes"],
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 ${i === 0 ? "bg-gray-50 font-semibold text-gray-700" : i % 2 === 0 ? "bg-gray-50/50" : ""} ${i > 0 ? "border-t border-gray-50" : ""}`}>
                <div className="px-4 py-3 text-sm">{row[0]}</div>
                <div className="px-4 py-3 text-sm text-center text-gray-600">{row[1]}</div>
                <div className={`px-4 py-3 text-sm text-center ${i > 0 ? "bg-blue-50/30 text-blue-700 font-medium" : "bg-blue-50 text-blue-700"}`}>{row[2]}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Works for every type of event</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "Church services", desc: "Weekly sermons with AI translation in 3+ languages — no interpreter needed" },
              { icon: "Corporate meetings", desc: "International team calls with real-time translation on everyone's phone" },
              { icon: "Conferences", desc: "Multi-track events where attendees choose their language via QR code" },
              { icon: "Webinars", desc: "Live webinars on Zoom, Meet, or any platform — attendees listen in their language" },
              { icon: "Town halls", desc: "Municipal meetings accessible to immigrant communities in 70+ languages" },
              { icon: "University lectures", desc: "International students follow along in their native language" },
            ].map((uc) => (
              <div key={uc.icon} className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="font-semibold text-gray-900 mb-1">{uc.icon}</p>
                <p className="text-gray-600 text-sm">{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
                <summary className="px-6 py-5 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors list-none flex justify-between items-center">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-400 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Stop paying for interpreters</h2>
          <p className="text-blue-200 mb-6">30 free minutes. Works with Zoom, Meet, Teams, or in-person. No credit card.</p>
          <a href="/login" className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3 rounded-xl transition">
            Start Free
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

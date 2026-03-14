"use client";
import { useState } from "react";

const faqs = [
  {
    q: "How accurate is the AI translation?",
    a: "Translync uses state-of-the-art speech recognition and translation models. For standard speech in common languages, accuracy is 90–95%. For specialized terminology (biblical, technical), you can upload a custom glossary to improve results. We recommend a 30-minute free trial to test with your specific content.",
  },
  {
    q: "How much delay is there between the speaker and translation?",
    a: "Typically under 2 seconds. This is noticeably faster than traditional simultaneous interpreters (who work with 3–5 second delays). For most events — services, conferences, webinars — this is imperceptible to attendees.",
  },
  {
    q: "Which languages are supported?",
    a: "We support 70+ languages including Spanish, French, German, Arabic, Mandarin, Japanese, Korean, Russian, Portuguese, Hindi, and many more. If you need a specific language not listed, contact us — we're constantly expanding coverage.",
  },
  {
    q: "How does pricing work exactly?",
    a: "You pay $3 per hour per language. If your event is 90 minutes with 2 languages, that's $9. There are no minimums, no setup fees, and no hidden charges. The free trial includes 30 minutes at no cost — no credit card required.",
  },
  {
    q: "What do I need to get started?",
    a: "Just a browser and a microphone. No app downloads, no hardware to rent, no IT team needed. You can be live in under 10 seconds. Attendees just scan a QR code with their phone.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-5 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-50 transition"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <span className="ml-4 text-gray-400 text-xl leading-none">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <SocialProof />

      {/* SEO content block — visible text for crawlers */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Why event organizers choose Translync
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 text-gray-600 text-sm leading-relaxed">
            <div>
              <p className="mb-4">
                Translync is a real-time AI translation platform built specifically for live events. Whether you run church services, NGO conferences, university lectures, or community town halls, Translync lets every attendee hear the speaker in their own language — instantly, on their phone.
              </p>
              <p>
                Unlike traditional simultaneous interpretation, which requires expensive equipment, trained interpreters, and complex logistics, Translync works through a simple QR code. Attendees scan it with their phone, pick their language, and start listening. No app download, no account, no setup.
              </p>
            </div>
            <div>
              <p className="mb-4">
                The AI transcribes the speaker in real-time using advanced speech recognition with speaker diarization, translates to 70+ languages using context-aware AI with domain-specific glossaries, and delivers both text and natural-sounding audio to each listener.
              </p>
              <p>
                At $3 per hour per language, Translync costs a fraction of human interpretation. A 1-hour event translated into 3 languages costs just $9 — compared to $500+ for professional interpreters. Every account starts with 30 free minutes to test with real content.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

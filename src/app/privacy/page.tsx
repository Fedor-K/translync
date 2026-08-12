import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy — Translync",
  description: "Translync privacy policy. How we handle your data during real-time translation sessions.",
  alternates: { canonical: "https://translync.app/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: March 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-3">1. What We Collect</h2>
            <p>When you use Translync, we collect:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Account information:</strong> Email address used for authentication via magic link.</li>
              <li><strong>Session data:</strong> Audio streamed during translation sessions is processed in real-time and not permanently stored. Session metadata (languages, timestamps) is retained for 24 hours.</li>
              <li><strong>Usage data:</strong> Number of sessions, minutes used, and languages selected for billing and analytics purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-3">2. How We Use Your Data</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>To provide real-time translation services during your sessions.</li>
              <li>To authenticate your account and manage your sessions.</li>
              <li>To track usage for billing and free tier limits.</li>
              <li>To improve translation quality and service reliability.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-3">3. Data Processing</h2>
            <p>Audio data is processed by third-party AI services (Deepgram for transcription, OpenAI for translation and text-to-speech) in real-time. Audio is not stored after processing. Translated text chunks are stored temporarily in Redis with a 24-hour expiration.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-3">4. Data Retention</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Session data expires automatically after 24 hours.</li>
              <li>Account information is retained as long as your account is active.</li>
              <li>Session history metadata is retained for 30 days.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-3">5. Third-Party Services</h2>
            <p>We use the following services to provide translation:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Deepgram</strong> — Speech-to-text transcription</li>
              <li><strong>OpenAI</strong> — Translation and text-to-speech</li>
              <li><strong>Upstash</strong> — Session storage</li>
              <li><strong>Resend</strong> — Authentication emails</li>
              <li><strong>Vercel</strong> — Hosting</li>
              <li><strong>Fly.io</strong> — Real-time server hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-3">6. Attendee Privacy</h2>
            <p>Attendees who join a translation session via QR code do not need to create an account. No personal data is collected from attendees. Their device connects to the translation stream via WebSocket and receives translated text and audio.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-3">7. Your Rights</h2>
            <p>You can request deletion of your account and associated data at any time by contacting us at <a href="mailto:hello@translync.app" className="text-blue-600 hover:underline">hello@translync.app</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-3">8. Contact</h2>
            <p>For privacy questions, contact <a href="mailto:hello@translync.app" className="text-blue-600 hover:underline">hello@translync.app</a>.</p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
        <a href="/" className="hover:text-gray-600">Translync</a> · <a href="/terms" className="hover:text-gray-600">Terms</a>
      </footer>
    </div>
  );
}

"use client";
import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-24 bg-blue-900 text-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Break language barriers at your next event
        </h2>
        <p className="text-blue-300 text-lg mb-10 max-w-xl mx-auto">
          Join 500+ churches, NGOs, and organizations already on the waitlist.
          Be first to access Translync when we launch.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-5 py-3 rounded-lg text-gray-900 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-lg transition whitespace-nowrap"
            >
              Join Waitlist — It&apos;s Free →
            </button>
          </form>
        ) : (
          <div className="inline-flex items-center gap-3 bg-green-500/20 border border-green-400/40 rounded-xl px-8 py-4 text-green-300 font-medium text-lg">
            ✅ You&apos;re on the list! We&apos;ll be in touch soon.
          </div>
        )}

        <p className="text-blue-400 text-sm mt-6">
          Free 30-minute trial included · No credit card required
        </p>
      </div>
    </section>
  );
}

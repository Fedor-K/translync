"use client";
import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">Translync</span>
          <span className="bg-blue-500 text-xs px-2 py-0.5 rounded-full font-medium">BETA</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-blue-200">
          <a href="#how-it-works" className="hover:text-white transition">How it works</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </div>
        <a
          href="#waitlist"
          className="bg-white text-blue-800 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Join Waitlist
        </a>
      </nav>

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-700/60 border border-blue-500/40 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Now in beta · 500+ organizations on waitlist
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Real-Time AI Translation
          <br />
          <span className="text-blue-300">for Every Event</span>
        </h1>

        <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-10">
          Your speaker talks. AI translates instantly. Audience listens in their
          language — on any phone, in any language, with no hardware required.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-5 py-3 rounded-lg text-gray-900 w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Join Waitlist →
              </button>
            </form>
          ) : (
            <div className="bg-green-500/20 border border-green-400/40 rounded-lg px-6 py-3 text-green-300 font-medium">
              ✅ You&apos;re on the list! We&apos;ll reach out soon.
            </div>
          )}
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
          <div>
            <div className="text-3xl font-bold">70+</div>
            <div className="text-blue-300 text-sm mt-1">Languages</div>
          </div>
          <div>
            <div className="text-3xl font-bold">&lt;2s</div>
            <div className="text-blue-300 text-sm mt-1">Latency</div>
          </div>
          <div>
            <div className="text-3xl font-bold">$3</div>
            <div className="text-blue-300 text-sm mt-1">Per hour/lang</div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 30C1200 60 900 0 720 0C540 0 240 60 0 30L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

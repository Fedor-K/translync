export default function SegmentHero({
  hero,
}: {
  hero: { title: string; highlight: string; subtitle: string };
}) {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">Translync</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-blue-200">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How it works
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="hidden sm:inline-block text-sm text-blue-200 hover:text-white transition-colors"
          >
            Sign in
          </a>
          <a
            href="/login"
            className="bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Start Free
          </a>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-28 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          {hero.title}
          <br />
          <span className="text-blue-300">{hero.highlight}</span>
        </h1>

        <p className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          {hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="/login"
            className="inline-flex items-center justify-center bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
          >
            Start Free
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors border border-white/20"
          >
            See How It Works
          </a>
        </div>

        <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-3xl sm:text-4xl font-bold">70+</div>
            <div className="text-blue-300 text-sm mt-1">Languages</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold">&lt;2s</div>
            <div className="text-blue-300 text-sm mt-1">Latency</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold">$3</div>
            <div className="text-blue-300 text-sm mt-1">Per hr / lang</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60L1440 60L1440 30C1200 60 900 0 720 0C540 0 240 60 0 30L0 60Z"
            fill="#f9fafb"
          />
        </svg>
      </div>
    </section>
  );
}

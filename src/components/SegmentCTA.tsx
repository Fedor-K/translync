export default function SegmentCTA({
  cta,
}: {
  cta: { heading: string; subheading: string; button: string };
}) {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{cta.heading}</h2>
        <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          {cta.subheading}
        </p>

        <a
          href="/login"
          className="inline-flex items-center justify-center bg-green-500 hover:bg-green-400 text-white font-semibold px-10 py-4 rounded-lg transition-colors text-lg"
        >
          {cta.button}
        </a>

        <p className="text-blue-300 text-sm mt-6">
          30 free minutes included with every account
        </p>
      </div>
    </section>
  );
}

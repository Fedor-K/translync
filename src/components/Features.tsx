const features = [
  {
    icon: "💰",
    title: "Transparent pricing",
    desc: "No custom quotes, no surprises. $3/hour per language. See your cost before you start.",
  },
  {
    icon: "🌐",
    title: "70+ languages",
    desc: "Spanish, French, Arabic, Mandarin, Russian, and 65+ more. Including rare and regional languages.",
  },
  {
    icon: "📵",
    title: "No hardware needed",
    desc: "Works on any device with a browser. Use your existing microphone or audio system.",
  },
  {
    icon: "🖥️",
    title: "Live organizer dashboard",
    desc: "See the transcript and translation in real-time. Catch problems before your audience does.",
  },
  {
    icon: "⏺️",
    title: "Recording included",
    desc: "All translation channels recorded automatically. Download audio and subtitles after the event.",
  },
  {
    icon: "⏱️",
    title: "Pay per minute",
    desc: "No 2-hour minimums. 20-minute webinar? Pay for 20 minutes. Simple.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Built specifically for events that need real-time translation — not
            enterprise complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

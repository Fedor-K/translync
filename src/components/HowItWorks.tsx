export default function HowItWorks() {
  const steps = [
    {
      icon: "🎙️",
      step: "01",
      title: "Connect your mic",
      desc: "Open Translync in any browser. Connect your microphone or existing audio system. No app download, no hardware.",
    },
    {
      icon: "⚡",
      step: "02",
      title: "Start streaming",
      desc: "Press Start. AI begins transcribing and translating in real-time. You see a live transcript — catch issues instantly.",
    },
    {
      icon: "📱",
      step: "03",
      title: "Audience listens",
      desc: "Share a QR code. Attendees scan it, pick their language, and hear the translation on their phone — in under 2 seconds.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Up and running in 10 seconds
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            No training. No setup calls. No hardware to rent. Just open a
            browser and go.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="relative">
              <div className="bg-blue-50 rounded-2xl p-8 h-full">
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="text-xs font-bold text-blue-400 tracking-widest mb-2">
                  STEP {s.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

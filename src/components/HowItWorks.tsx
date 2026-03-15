export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Create a stream",
      desc: "Select your target languages, name your session, and start in seconds. No downloads, no hardware, just a browser.",
    },
    {
      step: "02",
      title: "Share the QR code",
      desc: "A unique QR code is generated for your session. Project it on screen or share the link. Attendees scan with their phone.",
    },
    {
      step: "03",
      title: "Speak naturally",
      desc: "AI transcribes and translates in real-time. Your audience reads or hears the translation instantly in their chosen language.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Up and running in 10 seconds
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            No training. No setup calls. No hardware to rent. Just open a
            browser and go.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {/* Connector line between steps on desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-60px)] h-px bg-blue-200" />
              )}
              <div className="bg-blue-50 rounded-2xl p-8 h-full relative">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mb-5">
                  {s.step}
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

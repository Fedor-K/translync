const plans = [
  {
    name: "Free Trial",
    price: "Free",
    sub: "30 minutes included",
    color: "border-gray-200",
    badge: null,
    features: [
      "30 min translation credit",
      "Up to 3 languages",
      "Live dashboard",
      "No credit card required",
    ],
    cta: "Start for free",
    ctaStyle: "border-2 border-blue-700 text-blue-700 hover:bg-blue-50",
  },
  {
    name: "Pay As You Go",
    price: "$3",
    sub: "per hour, per language",
    color: "border-blue-700 shadow-xl",
    badge: "Most popular",
    features: [
      "Unlimited events",
      "70+ languages",
      "Recording included",
      "Live organizer dashboard",
      "Download subtitles (SRT)",
      "Email support",
    ],
    cta: "Join Waitlist",
    ctaStyle: "bg-blue-700 text-white hover:bg-blue-800",
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "volume & SLA",
    color: "border-gray-200",
    badge: null,
    features: [
      "Everything in Pay As You Go",
      "Volume discounts",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "White-label option",
    ],
    cta: "Contact us",
    ctaStyle: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            No hidden fees. No minimum hours. No surprise invoices.
            See exactly what you&apos;ll pay before you start.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border-2 ${plan.color} p-8 relative`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{plan.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
                <div className="text-sm text-gray-500">{plan.sub}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-500 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`block text-center py-3 px-6 rounded-xl font-semibold transition text-sm ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Example: 1-hour event in 3 languages = <strong className="text-gray-600">$9 total</strong>
        </p>
      </div>
    </section>
  );
}

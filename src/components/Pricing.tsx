const plans = [
  {
    name: "Free",
    price: "$0",
    sub: "30 min / month",
    highlight: false,
    badge: null,
    features: [
      "30 minutes of translation",
      "Up to 2 languages",
      "Basic features",
      "No credit card required",
    ],
    cta: "Start Free",
    href: "/dashboard",
    ctaStyle:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  },
  {
    name: "Pay as You Go",
    price: "$3",
    sub: "per hour, per language",
    highlight: true,
    badge: "Most popular",
    features: [
      "Unlimited events",
      "70+ languages",
      "Speaker diarization",
      "Real-time audio output",
      "Session recording",
      "Priority support",
    ],
    cta: "Start Free",
    href: "/dashboard",
    ctaStyle: "bg-green-500 text-white hover:bg-green-400",
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "dedicated support",
    highlight: false,
    badge: null,
    features: [
      "Everything in Pay as You Go",
      "Custom glossaries",
      "API access",
      "Dedicated account manager",
      "Volume discounts",
      "SLA guarantee",
    ],
    cta: "Contact Us",
    href: "mailto:hello@translync.com",
    ctaStyle:
      "border-2 border-gray-300 text-gray-700 hover:bg-gray-50",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            No hidden fees. No minimum hours. No surprise invoices. See exactly
            what you&apos;ll pay before you start.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border-2 p-8 relative ${
                plan.highlight
                  ? "border-blue-600 shadow-xl"
                  : "border-gray-200"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {plan.price}
                </div>
                <div className="text-sm text-gray-500">{plan.sub}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-gray-700"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`block text-center py-3 px-6 rounded-xl font-semibold transition-colors text-sm ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Example: 1-hour event in 3 languages ={" "}
          <strong className="text-gray-600">$9 total</strong>
        </p>
      </div>
    </section>
  );
}

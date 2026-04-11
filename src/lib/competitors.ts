export interface CompetitorData {
  slug: string;
  name: string;
  tagline: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  pricing: string;
  pricingNote: string;
  features: { feature: string; competitor: string; translync: string }[];
  advantages: string[];
  idealFor: string;
  verdict: string;
}

export const COMPETITORS: Record<string, CompetitorData> = {
  wordly: {
    slug: "wordly",
    name: "Wordly",
    tagline: "AI-powered translation for meetings and events",
    title: "Wordly vs Translync — Which Translation Platform Is Better?",
    metaDescription: "Compare Wordly and Translync for real-time event translation. See pricing, features, language support, and which is better for churches, NGOs, and conferences.",
    h1: "Wordly vs Translync",
    intro: "Both Wordly and Translync offer AI-powered real-time translation for events. But they take very different approaches to pricing, accessibility, and audience delivery. Here's an honest comparison to help you choose.",
    pricing: "From $99/month (packages)",
    pricingNote: "Monthly subscription with tiered packages",
    features: [
      { feature: "Languages", competitor: "50+", translync: "70+" },
      { feature: "Pricing model", competitor: "Monthly subscription from $99/mo", translync: "Pay-as-you-go $3/hr per language" },
      { feature: "App download required", competitor: "No (web-based)", translync: "No (QR code scan)" },
      { feature: "Audience access", competitor: "Link/code sharing", translync: "QR code — scan and listen instantly" },
      { feature: "Speaker diarization", competitor: "Limited", translync: "Built-in (multi-speaker detection)" },
      { feature: "Domain glossaries", competitor: "General only", translync: "Church, NGO, University, Community glossaries in 19 languages" },
      { feature: "AI voice output", competitor: "Yes", translync: "Yes (natural TTS)" },
      { feature: "Free trial", competitor: "Demo only", translync: "30 free minutes, no credit card" },
      { feature: "Church-specific features", competitor: "Yes (packages)", translync: "Yes (liturgical glossary, worship terms)" },
      { feature: "Minimum commitment", competitor: "Monthly subscription", translync: "None — pay per session" },
    ],
    advantages: [
      "No monthly subscription — pay only when you use it ($3/hr vs $99+/mo)",
      "70+ languages vs 50+ — broader coverage for diverse communities",
      "Specialized glossaries for churches, NGOs, universities — not just general translation",
      "QR code access — attendees join in 3 seconds, no link sharing needed",
      "30 free minutes to test with real content — no sales call required",
      "Speaker diarization built-in — knows who is speaking in multi-presenter events",
    ],
    idealFor: "Wordly works well for organizations that need translation every day and prefer a fixed monthly cost. Translync is better for churches, NGOs, and event organizers who need translation weekly or for specific events — paying only for what they use.",
    verdict: "If you run weekly church services or monthly NGO events, Translync saves you money with pay-as-you-go pricing. A 1-hour church service in 3 languages costs $9 with Translync vs $99+/month with Wordly — even if you only use it 4 times.",
  },

  interactio: {
    slug: "interactio",
    name: "Interactio",
    tagline: "Enterprise RSI platform for large-scale events",
    title: "Interactio vs Translync — Enterprise RSI vs Simple AI Translation",
    metaDescription: "Compare Interactio and Translync for event translation. Interactio serves EU Parliament; Translync serves churches and NGOs. See which fits your needs.",
    h1: "Interactio vs Translync",
    intro: "Interactio is an enterprise-grade Remote Simultaneous Interpretation (RSI) platform used by the European Parliament and United Nations. Translync is a lightweight AI translation tool built for churches, NGOs, and community events. They serve very different markets.",
    pricing: "Quote-based (enterprise)",
    pricingNote: "Custom pricing, requires sales call",
    features: [
      { feature: "Translation type", competitor: "Human interpreters + AI", translync: "Pure AI translation" },
      { feature: "Pricing", competitor: "Enterprise quotes ($$$$)", translync: "$3/hr per language" },
      { feature: "Setup complexity", competitor: "Requires onboarding, training", translync: "Create session → share QR → speak" },
      { feature: "Languages", competitor: "Depends on interpreter availability", translync: "70+ always available" },
      { feature: "Minimum event size", competitor: "Designed for 100+ attendees", translync: "Works for 2 to 10,000+" },
      { feature: "Church features", competitor: "Yes (Elevation Church, Hillsong)", translync: "Yes (liturgical glossary, worship terms)" },
      { feature: "Free trial", competitor: "No — demo only", translync: "30 free minutes" },
      { feature: "App required", competitor: "Yes (Interactio app)", translync: "No — browser only" },
      { feature: "Speaker diarization", competitor: "Manual (interpreter switches)", translync: "Automatic AI detection" },
      { feature: "Domain glossaries", competitor: "Interpreter-dependent", translync: "Built-in for 5 domains" },
    ],
    advantages: [
      "1000x cheaper — $3/hr vs enterprise pricing (typically $500-2,000/event)",
      "No app download — attendees scan a QR code, no Interactio app needed",
      "Instant setup — no onboarding, no training, no sales call",
      "70+ languages always available — no interpreter scheduling needed",
      "Works for any event size — from 5-person Bible study to 5,000-seat conference",
      "30 free minutes to test — no commitment, no credit card",
    ],
    idealFor: "Interactio is the right choice for UN-level conferences where human interpretation quality is critical and budget is not a concern. Translync is the right choice for churches, NGOs, universities, and community events that need affordable, instant translation without the complexity.",
    verdict: "If your event requires certified human interpreters (legal proceedings, diplomatic meetings), choose Interactio. For everything else — church services, NGO trainings, university lectures, community meetings — Translync delivers 90-95% accuracy at 1% of the cost.",
  },

  kudo: {
    slug: "kudo",
    name: "KUDO",
    tagline: "Enterprise multilingual communication platform",
    title: "KUDO Alternative — Why Event Organizers Switch to Translync",
    metaDescription: "Looking for a KUDO alternative? Translync offers AI translation at $3/hr vs KUDO's enterprise pricing. No app, no interpreters, 70+ languages. Try free.",
    h1: "Looking for a KUDO Alternative?",
    intro: "KUDO is a premium multilingual communication platform designed for enterprise clients, with complex pricing tiers and a focus on human interpreters. If you're looking for something simpler, cheaper, and faster to set up — Translync might be what you need.",
    pricing: "Complex tiers (enterprise)",
    pricingNote: "Multiple plans, add-ons, requires evaluation",
    features: [
      { feature: "Pricing", competitor: "Complex tiers, starts at $$$", translync: "$3/hr per language, no tiers" },
      { feature: "Setup time", competitor: "Days (onboarding required)", translync: "10 seconds" },
      { feature: "Translation method", competitor: "Human interpreters + AI hybrid", translync: "Pure AI — instant, no scheduling" },
      { feature: "Languages", competitor: "200+ (with interpreters)", translync: "70+ (always available)" },
      { feature: "App required", competitor: "Yes (KUDO app)", translync: "No — QR code in browser" },
      { feature: "Church content", competitor: "No dedicated church features", translync: "Church glossary with liturgical terms" },
      { feature: "NGO features", competitor: "General enterprise features", translync: "Humanitarian glossary (UNHCR/IASC terms)" },
      { feature: "Free trial", competitor: "Demo only", translync: "30 free minutes" },
      { feature: "Audience access", competitor: "App download + meeting code", translync: "Scan QR code — 3 seconds" },
      { feature: "Contract", competitor: "Annual contracts common", translync: "No contract, no minimum" },
    ],
    advantages: [
      "No complex pricing — just $3/hr per language, period",
      "No app download for attendees — QR code works in any browser",
      "No interpreter scheduling — AI is always available in 70+ languages",
      "No onboarding — create a session and start translating in 10 seconds",
      "Specialized glossaries — church, NGO, university, community domains",
      "No annual contract — use it once or every week, pay only for what you use",
    ],
    idealFor: "KUDO excels at large enterprise events where human interpretation quality and 200+ language coverage justify the premium pricing. Translync is built for the 95% of events that don't need enterprise complexity — churches, NGOs, universities, and community gatherings.",
    verdict: "If you're a church paying $500+/month for KUDO or struggling with their complex setup, Translync does the same job for $9/week (1-hour service, 3 languages). No app, no contract, no interpreters to book.",
  },

  interprefy: {
    slug: "interprefy",
    name: "Interprefy",
    tagline: "Cloud-based remote interpreting platform",
    title: "Interprefy vs Translync — Cloud RSI vs AI Translation",
    metaDescription: "Compare Interprefy and Translync. Interprefy is cloud RSI for enterprises; Translync is AI translation for churches and events. See pricing and features.",
    h1: "Interprefy vs Translync",
    intro: "Interprefy is a Swiss cloud-based remote interpreting platform serving corporate clients and international organizations. Translync is an AI-first translation platform for events, churches, and community organizations. Here's how they compare.",
    pricing: "Quote-based",
    pricingNote: "Custom quotes, enterprise focus",
    features: [
      { feature: "Pricing", competitor: "Quote-based (enterprise)", translync: "$3/hr per language" },
      { feature: "Translation type", competitor: "Human interpreters via cloud", translync: "AI translation" },
      { feature: "Setup", competitor: "Requires project management", translync: "Self-service, 10 seconds" },
      { feature: "Languages", competitor: "Depends on interpreter pool", translync: "70+ always available" },
      { feature: "Church features", competitor: "None", translync: "Full liturgical glossary" },
      { feature: "Minimum event", competitor: "Enterprise-scale", translync: "Any size" },
      { feature: "Free trial", competitor: "No", translync: "30 free minutes" },
      { feature: "App required", competitor: "Interprefy app or web", translync: "No app — QR code" },
      { feature: "Glossaries", competitor: "Interpreter provides", translync: "Built-in for 5 domains in 19 languages" },
      { feature: "Contract", competitor: "Per-event or annual", translync: "No contract" },
    ],
    advantages: [
      "Transparent pricing — $3/hr per language, no quotes needed",
      "Self-service — no project manager, no scheduling",
      "Church and NGO glossaries — Interprefy has zero church content",
      "No app required for attendees",
      "Always available — no interpreter booking windows",
      "Free trial with real content — 30 minutes, no commitment",
    ],
    idealFor: "Interprefy is built for corporate events and international organizations that need human interpreters. Translync is built for churches, NGOs, and community events that need affordable AI translation without the overhead.",
    verdict: "Interprefy doesn't even have a church page. If you're a church or NGO, Translync was built specifically for you — with domain glossaries, simple pricing, and zero setup complexity.",
  },
};

export const COMPETITOR_SLUGS = Object.keys(COMPETITORS);

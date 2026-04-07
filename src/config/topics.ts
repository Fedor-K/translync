export interface TopicSeed {
  topic: string;
  keywords: string[];
  category: string;
  segment?: string; // churches | ngos | universities | communities
}

export const TOPIC_POOL: TopicSeed[] = [
  // ═══ CHURCHES ═══
  {
    topic: "How to translate a church service in real-time with AI",
    keywords: ["church translation app", "real-time sermon translation", "multilingual church service", "AI interpreter for church"],
    category: "guides",
    segment: "churches",
  },
  {
    topic: "5 ways multilingual churches grow faster",
    keywords: ["multilingual church growth", "church language barriers", "immigrant church members"],
    category: "tips",
    segment: "churches",
  },
  {
    topic: "AI vs human interpreters for church services: cost, quality, and logistics compared",
    keywords: ["church interpreter cost", "AI translation vs human interpreter", "simultaneous interpretation church"],
    category: "comparisons",
    segment: "churches",
  },
  {
    topic: "How one church went from 2 languages to 12 with AI translation",
    keywords: ["multilingual church case study", "church translation success story"],
    category: "use-cases",
    segment: "churches",
  },

  // ═══ NGOs ═══
  {
    topic: "Real-time translation for humanitarian conferences: a practical guide",
    keywords: ["NGO conference translation", "humanitarian event interpretation", "multilingual conference tools"],
    category: "guides",
    segment: "ngos",
  },
  {
    topic: "How AI translation is changing humanitarian field operations",
    keywords: ["AI in humanitarian work", "translation technology NGO", "language barriers humanitarian"],
    category: "industry",
    segment: "ngos",
  },
  {
    topic: "Reducing interpretation costs for NGO events by 90%",
    keywords: ["NGO translation cost", "cheap interpretation for nonprofits", "AI interpreter NGO"],
    category: "use-cases",
    segment: "ngos",
  },

  // ═══ UNIVERSITIES ═══
  {
    topic: "How to make university lectures accessible to international students",
    keywords: ["lecture translation app", "international student accessibility", "university AI translation"],
    category: "guides",
    segment: "universities",
  },
  {
    topic: "AI lecture translation: what professors need to know",
    keywords: ["AI translation for lectures", "professor translation tool", "classroom interpretation"],
    category: "tips",
    segment: "universities",
  },
  {
    topic: "The ROI of AI translation for university international programs",
    keywords: ["university translation ROI", "international student retention", "campus accessibility"],
    category: "industry",
    segment: "universities",
  },

  // ═══ COMMUNITIES ═══
  {
    topic: "Breaking language barriers at town hall meetings with AI",
    keywords: ["town hall translation", "community meeting interpreter", "immigrant language access"],
    category: "guides",
    segment: "communities",
  },
  {
    topic: "How to make municipal services accessible in 70+ languages",
    keywords: ["municipal translation", "government language access", "immigrant services translation"],
    category: "guides",
    segment: "communities",
  },

  // ═══ GENERAL / PRODUCT ═══
  {
    topic: "Glossa vs Translync: which real-time translation app is right for your event?",
    keywords: ["glossa alternative", "glossa vs translync", "best event translation app", "real-time translation comparison"],
    category: "comparisons",
  },
  {
    topic: "Best real-time translation apps for events in 2026",
    keywords: ["best translation app for events", "live translation software", "event interpreter app 2026"],
    category: "comparisons",
  },
  {
    topic: "How real-time AI translation works: the technology behind Translync",
    keywords: ["how AI translation works", "real-time speech translation technology", "deepgram openai translation"],
    category: "industry",
  },
  {
    topic: "QR code translation: how attendees join in 3 seconds",
    keywords: ["QR code translation", "no app translation", "event translation QR"],
    category: "tips",
  },
];

// Pick a random unused topic (simple round-robin by index)
export function pickNextTopic(usedSlugs: string[]): TopicSeed | null {
  for (const topic of TOPIC_POOL) {
    const slug = topic.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (!usedSlugs.includes(slug)) {
      return topic;
    }
  }
  return null;
}

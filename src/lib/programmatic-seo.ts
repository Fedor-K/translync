export interface ProgrammaticPage {
  slug: string;
  eventType: string;
  language: string;
  languageCode: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  challenges: string[];
  howItWorks: string[];
  benefits: string[];
  cta: string;
}

const EVENT_TYPES = [
  { id: "conference", name: "Conference", plural: "conferences" },
  { id: "church-service", name: "Church Service", plural: "church services" },
  { id: "wedding", name: "Wedding", plural: "weddings" },
  { id: "seminar", name: "Seminar", plural: "seminars" },
  { id: "workshop", name: "Workshop", plural: "workshops" },
  { id: "town-hall", name: "Town Hall Meeting", plural: "town hall meetings" },
  { id: "medical-conference", name: "Medical Conference", plural: "medical conferences" },
  { id: "legal-seminar", name: "Legal Seminar", plural: "legal seminars" },
  { id: "university-lecture", name: "University Lecture", plural: "university lectures" },
  { id: "ngo-training", name: "NGO Training", plural: "NGO training sessions" },
  { id: "corporate-meeting", name: "Corporate Meeting", plural: "corporate meetings" },
  { id: "startup-pitch", name: "Startup Pitch", plural: "startup pitch events" },
  { id: "religious-gathering", name: "Religious Gathering", plural: "religious gatherings" },
  { id: "community-event", name: "Community Event", plural: "community events" },
  { id: "summit", name: "International Summit", plural: "international summits" },
];

const LANGUAGES = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Mandarin" },
  { code: "ar", name: "Arabic" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "hi", name: "Hindi" },
  { code: "it", name: "Italian" },
  { code: "tr", name: "Turkish" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
  { code: "uk", name: "Ukrainian" },
  { code: "sv", name: "Swedish" },
];

function generatePage(eventType: typeof EVENT_TYPES[number], lang: typeof LANGUAGES[number]): ProgrammaticPage {
  const slug = `${eventType.id}-translation-in-${lang.name.toLowerCase()}`;

  return {
    slug,
    eventType: eventType.name,
    language: lang.name,
    languageCode: lang.code,
    title: `${eventType.name} Translation in ${lang.name} — Translync`,
    metaDescription: `Real-time AI translation for ${eventType.plural} in ${lang.name}. No interpreters, no hardware. Attendees scan a QR code. From $3/hour.`,
    h1: `${eventType.name} Translation in ${lang.name}`,
    intro: `Need real-time ${lang.name} translation for your ${eventType.name.toLowerCase()}? Translync provides instant AI-powered translation so every attendee can follow along in ${lang.name} — directly on their phone, no app download required.`,
    challenges: [
      `Finding qualified ${lang.name} interpreters for ${eventType.plural} is expensive and logistically complex`,
      `Traditional interpretation equipment requires setup, testing, and technical staff`,
      `Attendees need headsets or dedicated receivers — adding cost and friction`,
      `Last-minute language needs are impossible to accommodate with human interpreters`,
    ],
    howItWorks: [
      `Create a translation session on Translync and select ${lang.name} as a target language`,
      `Share the QR code with your ${eventType.name.toLowerCase()} attendees — display it on screen or print it`,
      `Attendees scan the QR code with their phone and select ${lang.name}`,
      `The speaker talks naturally — AI transcribes, translates, and delivers ${lang.name} audio in under 2 seconds`,
    ],
    benefits: [
      `${lang.name} translation at a fraction of interpreter costs — just $3/hour`,
      `No app download — works instantly in any mobile browser`,
      `AI speaker diarization identifies who is speaking in multi-presenter ${eventType.plural}`,
      `Domain-specific glossaries ensure accurate ${eventType.name.toLowerCase()} terminology`,
      `Support for 70+ languages — add more languages anytime`,
      `30 free minutes to test with your actual content`,
    ],
    cta: `Start translating your ${eventType.name.toLowerCase()} into ${lang.name} today — 30 free minutes, no credit card required.`,
  };
}

// Generate all pages
export function getAllProgrammaticPages(): ProgrammaticPage[] {
  const pages: ProgrammaticPage[] = [];
  for (const eventType of EVENT_TYPES) {
    for (const lang of LANGUAGES) {
      pages.push(generatePage(eventType, lang));
    }
  }
  return pages;
}

export function getProgrammaticPage(slug: string): ProgrammaticPage | null {
  return getAllProgrammaticPages().find((p) => p.slug === slug) || null;
}

export function getAllSlugs(): string[] {
  return getAllProgrammaticPages().map((p) => p.slug);
}

// 15 event types × 16 languages = 240 pages
export const TOTAL_PAGES = EVENT_TYPES.length * LANGUAGES.length;

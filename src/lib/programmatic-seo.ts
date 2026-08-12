/**
 * Event-translation pages.
 *
 * This used to be a 15 × 16 matrix: every event type crossed with every
 * language, 240 URLs from one template. Search Console's verdict after months
 * live was 25 impressions and zero clicks across all 240. Google indexed them
 * and showed them to nobody — the pages were not rejected, they were simply
 * built for phrases nobody types. "conference translation in swedish" is not a
 * search; "conference translation" is, 40 times a month.
 *
 * So the language axis is gone. It was never a search axis, only a way of
 * multiplying URLs. Languages now appear as content on the page, which is where
 * a reader wanted them anyway.
 *
 * The event axis was cut too, to the seven event types with measurable demand.
 * Keyword Planner reports the other eight at zero, and a page targeting a phrase
 * nobody searches cannot earn traffic however well it is written.
 *
 * Every retired URL 301s — see LEGACY_REDIRECTS, consumed by next.config.ts.
 */

export interface Faq {
  q: string;
  a: string;
}

export interface ProgrammaticPage {
  slug: string;
  eventType: string;
  plural: string;
  /** Monthly searches for this page's target phrase, per Keyword Planner. */
  demand: number;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  challenges: string[];
  howItWorks: string[];
  benefits: string[];
  faqs: Faq[];
  cta: string;
}

/** Event types that survived the demand check, with their measured volume. */
const EVENT_TYPES = [
  { id: "wedding", name: "Wedding", plural: "weddings", demand: 50 },
  { id: "conference", name: "Conference", plural: "conferences", demand: 40 },
  { id: "summit", name: "International Summit", plural: "international summits", demand: 30 },
  { id: "church-service", name: "Church Service", plural: "church services", demand: 10 },
  { id: "workshop", name: "Workshop", plural: "workshops", demand: 10 },
  { id: "seminar", name: "Seminar", plural: "seminars", demand: 10 },
  { id: "town-hall", name: "Town Hall Meeting", plural: "town hall meetings", demand: 10 },
];

/** Event types retired for zero measured demand. Their URLs redirect to the hub. */
const RETIRED_EVENT_IDS = [
  "medical-conference",
  "legal-seminar",
  "university-lecture",
  "ngo-training",
  "corporate-meeting",
  "startup-pitch",
  "religious-gathering",
  "community-event",
];

/**
 * Languages the old matrix used as URL suffixes. They stay here for two reasons:
 * they are the content of the "languages covered" section, and they are needed to
 * reconstruct the 240 retired URLs so each one can be redirected.
 */
export const FEATURED_LANGUAGES = [
  "Spanish", "French", "German", "Mandarin", "Arabic", "Portuguese",
  "Russian", "Japanese", "Korean", "Hindi", "Italian", "Turkish",
  "Dutch", "Polish", "Ukrainian", "Swedish",
];

function generatePage(event: (typeof EVENT_TYPES)[number]): ProgrammaticPage {
  const lower = event.name.toLowerCase();
  return {
    slug: `${event.id}-translation`,
    eventType: event.name,
    plural: event.plural,
    demand: event.demand,
    title: `${event.name} Translation — Live in 70+ Languages | Translync`,
    metaDescription: `Real-time translation for ${event.plural}. Attendees scan a QR code and listen in their own language on their phone. No interpreters, no headsets, $3 per hour.`,
    h1: `${event.name} Translation`,
    intro: `Running a ${lower} where not everyone speaks the same language? Translync translates the speaker in real time and delivers it to every attendee's phone — no interpreter booth, no receivers to hand out, and nothing for anyone to install.`,
    challenges: [
      `Booking interpreters for ${event.plural} means paying for a full day even when you need two hours, and finding them at all for less common languages`,
      `Interpretation equipment has to be delivered, set up, tested, collected and paid for as a separate line item`,
      `Receivers and headsets add cost per attendee, and someone has to hand them out and get them back`,
      `A guest who turns up needing a language you did not plan for cannot be accommodated`,
    ],
    howItWorks: [
      `Create a session and pick which languages your ${lower} needs`,
      `Put the QR code on a screen, in the programme, or on a card on each seat`,
      `Attendees scan it and choose their language — it opens in their phone's browser, with nothing to download`,
      `The speaker talks normally; transcription, translation and audio reach every listener in under two seconds`,
    ],
    benefits: [
      `$3 per hour per language, billed by the minute — a two-hour ${lower} in three languages costs $18`,
      `Works on any phone with a browser, so there is no app to install and nothing to distribute`,
      `Speaker diarization keeps track of who is talking when a ${lower} has several presenters`,
      `Add a language on the day, even mid-session, without booking anyone`,
      `Custom glossaries, so names and terms specific to your ${lower} come through correctly`,
      `30 free minutes to run it against your own content before you decide`,
    ],
    faqs: [
      {
        q: `How many languages can one ${lower} run at once?`,
        a: `As many as you need. Each attendee picks their own, so ten people can be listening in ten different languages at the same time. You are billed $3 per hour for each language actually in use.`,
      },
      {
        q: `Do attendees need to install anything?`,
        a: `No. Scanning the QR code opens a web page in whatever browser their phone already has. There is no app, no account and no sign-up for listeners.`,
      },
      {
        q: `How much delay is there?`,
        a: `Translated audio reaches listeners in under two seconds, so they follow along about a sentence behind — roughly what a human simultaneous interpreter delivers.`,
      },
      {
        q: `Is it accurate enough for a real ${lower}?`,
        a: `For most ${event.plural} yes, and you can check before committing: 30 free minutes is enough to run your own material through it. Where terminology matters, load a glossary so specific names and terms come out the way you want.`,
      },
      {
        q: `What if the venue's internet is poor?`,
        a: `The speaker's device needs a stable connection. Listeners need very little, since they are receiving audio rather than sending it — mobile data on a phone is enough.`,
      },
    ],
    cta: `Try it on your next ${lower} — 30 minutes free, no card required.`,
  };
}

export function getAllProgrammaticPages(): ProgrammaticPage[] {
  return EVENT_TYPES.map(generatePage);
}

export function getProgrammaticPage(slug: string): ProgrammaticPage | null {
  return getAllProgrammaticPages().find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return getAllProgrammaticPages().map((p) => p.slug);
}

export const TOTAL_PAGES = EVENT_TYPES.length;

/**
 * The 240 URLs the old matrix published, each pointing at what replaced it.
 *
 * A retired page must not 404. These URLs are in Google's index today and some
 * carry impressions; a 404 throws away whatever standing they have. A kept event
 * type sends its language variants to the single page that now covers them; a
 * retired one sends them to the hub.
 */
export const LEGACY_REDIRECTS: { source: string; destination: string }[] = (() => {
  const keptIds = EVENT_TYPES.map((e) => e.id);
  const out: { source: string; destination: string }[] = [];
  for (const id of [...keptIds, ...RETIRED_EVENT_IDS]) {
    const destination = keptIds.includes(id) ? `/translation/${id}-translation` : "/translation";
    for (const language of FEATURED_LANGUAGES) {
      out.push({
        source: `/translation/${id}-translation-in-${language.toLowerCase()}`,
        destination,
      });
    }
  }
  // The retired event types also lose their bare slug, in case anything links to it.
  for (const id of RETIRED_EVENT_IDS) {
    out.push({ source: `/translation/${id}-translation`, destination: "/translation" });
  }
  return out;
})();

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
 * The event axis was cut twice. First to the seven types with measurable demand,
 * since a page aimed at a phrase nobody searches cannot earn traffic however well
 * it is written. Then to two, once what a customer is worth entered the ranking —
 * see EVENT_TYPES for the figures.
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
  /** The phrase this page leads with — the head of its keyword cluster, which is
   *  not necessarily the phrase the slug happens to contain. */
  headTerm: string;
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

/**
 * The two segments the site is focused on, with the demand of their whole keyword
 * cluster rather than of one phrase.
 *
 * Seven event types survived the first cut, chosen on search volume. Adding what
 * a customer is worth changed the answer: a church translates every Sunday and is
 * worth ~$608 a year, a conference organizer comes back through a season at ~$162,
 * and a wedding pays $14 once. Estimated annual revenue across the seven ran
 * $14,762 for church and $9,623 for conference, then fell to $73 and below for
 * everything else — two orders of magnitude, not a close call.
 *
 * Note the conference figure comes from the head of its cluster, "conference
 * interpretation" at 210/mo, not from "conference translation" at 40/mo. Judging
 * the segment by the single phrase in its slug undersold it by five times.
 */
const EVENT_TYPES = [
  {
    id: "church-service",
    name: "Church Service",
    plural: "church services",
    demand: 270,
    // The phrase to lead with, which is not always the one in the slug. The slug
    // is fixed by what Google already has indexed; the title is not.
    headTerm: "Church Translation",
  },
  {
    id: "conference",
    name: "Conference",
    plural: "conferences",
    demand: 660,
    // "conference interpretation" is searched 210 times a month; "conference
    // translation", which this page was titled for, 40. Same page, same content,
    // five times the demand — the slug was quietly deciding the target.
    headTerm: "Conference Interpretation",
  },
];

/**
 * Retired event types, and where each one goes.
 *
 * Everything that is still an event with an audience folds into the conference
 * page, which now covers that ground. Weddings do not: a wedding is neither a
 * conference nor a repeat customer, so it goes to the hub rather than pretending
 * to be served by a page about conferences.
 */
const RETIRED: { id: string; to: string }[] = [
  // Cut in this pass: real search volume, but customers who pay once or not much.
  { id: "wedding", to: "/translation" },
  { id: "summit", to: "/translation/conference-translation" },
  { id: "workshop", to: "/translation/conference-translation" },
  { id: "seminar", to: "/translation/conference-translation" },
  { id: "town-hall", to: "/translation/conference-translation" },
  // Cut earlier for zero measured demand.
  { id: "medical-conference", to: "/translation/conference-translation" },
  { id: "legal-seminar", to: "/translation/conference-translation" },
  { id: "university-lecture", to: "/translation/conference-translation" },
  { id: "ngo-training", to: "/translation/conference-translation" },
  { id: "corporate-meeting", to: "/translation/conference-translation" },
  { id: "startup-pitch", to: "/translation/conference-translation" },
  { id: "religious-gathering", to: "/translation/church-service-translation" },
  { id: "community-event", to: "/translation/conference-translation" },
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
    headTerm: event.headTerm,
    demand: event.demand,
    title: `${event.headTerm} — Live in 70+ Languages | Translync`,
    metaDescription: `${event.headTerm} in real time for ${event.plural}. Attendees scan a QR code and listen in their own language on their phone. No interpreters, no headsets, $3 per hour.`,
    h1: event.headTerm,
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

  // The 240 language variants of everything that ever existed.
  for (const id of keptIds) {
    for (const language of FEATURED_LANGUAGES) {
      out.push({
        source: `/translation/${id}-translation-in-${language.toLowerCase()}`,
        destination: `/translation/${id}-translation`,
      });
    }
  }
  for (const { id, to } of RETIRED) {
    for (const language of FEATURED_LANGUAGES) {
      out.push({ source: `/translation/${id}-translation-in-${language.toLowerCase()}`, destination: to });
    }
    // And the bare slug, which for five of these was a live page until now.
    out.push({ source: `/translation/${id}-translation`, destination: to });
  }
  return out;
})();

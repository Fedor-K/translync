export interface SegmentContent {
  slug: string;
  label: string;
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
  };
  socialProof: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  faq: { q: string; a: string }[];
  cta: {
    heading: string;
    subheading: string;
    button: string;
  };
  meta: {
    title: string;
    description: string;
  };
}

export const SEGMENTS: Record<string, SegmentContent> = {
  churches: {
    slug: "churches",
    label: "Churches",
    hero: {
      title: "Break Language Barriers",
      highlight: "in Your Church",
      subtitle:
        "Your congregation speaks many languages. Now every member can hear the sermon in their own language — instantly, on their phone. No interpreters, no extra equipment.",
    },
    socialProof: [
      "Grace Community Church",
      "Hillside Fellowship",
      "New Life International",
      "Faith Chapel Global",
      "Calvary Multilingual Church",
      "CrossBridge Church",
    ],
    testimonial: {
      quote:
        "We have members from 12 countries. Before Translync, half the congregation couldn't follow the sermon. Now everyone participates fully — and we saved thousands on interpreter fees.",
      author: "Pastor David Kim",
      role: "Grace Community Church, Los Angeles",
    },
    faq: [
      {
        q: "How do church members join the translation?",
        a: "Project the QR code on screen during the service. Members scan it with their phone and choose their language. No app download, no account needed — it works instantly in the browser.",
      },
      {
        q: "Does it work with worship music and singing?",
        a: "Translync works best with spoken content — sermons, prayers, announcements. For songs, we recommend displaying lyrics on screen separately. The AI is optimized for natural speech.",
      },
      {
        q: "Can we use religious terminology correctly?",
        a: "Yes. Select the domain glossary when creating a session. You can also upload custom glossaries with terms specific to your denomination or tradition.",
      },
      {
        q: "What if our internet connection is slow?",
        a: "Translync uses very little bandwidth — about the same as a voice call. Standard church WiFi is more than enough. Each listener uses their own mobile data, so the church network isn't overloaded.",
      },
      {
        q: "How much does it cost for a weekly service?",
        a: "At $3/hour per language, a 1-hour service in 3 languages costs $9. You get 30 free minutes per month to try it first — no credit card required.",
      },
    ],
    cta: {
      heading: "Every Member Deserves to Understand",
      subheading:
        "Start translating your services today. 30 free minutes, no credit card.",
      button: "Start Free for Your Church",
    },
    meta: {
      title: "Translync for Churches — Real-Time AI Sermon Translation",
      description:
        "Let every church member hear the sermon in their language. Real-time AI translation for multilingual congregations. 70+ languages, no app needed, from $3/hour.",
    },
  },

  ngos: {
    slug: "ngos",
    label: "NGOs",
    hero: {
      title: "Make Every Event Accessible",
      highlight: "in Any Language",
      subtitle:
        "Your field teams work across borders and languages. Translync gives every participant real-time translation at conferences, trainings, and community meetings — no interpreters needed.",
    },
    socialProof: [
      "Global Outreach Foundation",
      "International Aid Network",
      "Mercy Relief International",
      "World Education Alliance",
      "Humanitarian Response Group",
      "RefugeeBridge",
    ],
    testimonial: {
      quote:
        "During our regional training with participants from 8 countries, Translync replaced 4 simultaneous interpreters. The cost savings were significant, and the translations were immediate.",
      author: "Maria Santos",
      role: "Program Director, Global Outreach Foundation",
    },
    faq: [
      {
        q: "Does it handle humanitarian terminology?",
        a: "Yes. Translync includes a built-in NGO/humanitarian glossary with 200+ terms from UNHCR, IASC, and Sphere Standards. Acronyms like GBV, WASH, and IDP are handled correctly and consistently.",
      },
      {
        q: "Can it work in low-connectivity field environments?",
        a: "Translync requires an internet connection, but uses minimal bandwidth — comparable to a voice call. It works well on 3G/4G mobile networks. Each participant uses their own device and data connection.",
      },
      {
        q: "How do we handle multi-language meetings with 10+ languages?",
        a: "Create a session and select all target languages. Translync translates simultaneously to all of them. Each participant chooses their language on their phone. There's no limit to the number of listeners.",
      },
      {
        q: "Is the data secure?",
        a: "All audio and translations are processed in real-time and not permanently stored. Session data expires after 24 hours. No recordings are kept unless you explicitly choose to save them.",
      },
      {
        q: "What's the pricing for organizations?",
        a: "$3/hour per language, pay as you go. For large-scale deployments or recurring events, contact us for enterprise pricing with volume discounts and dedicated support.",
      },
    ],
    cta: {
      heading: "Translation Shouldn't Be a Barrier to Impact",
      subheading:
        "Start translating your events today. 30 free minutes, no setup required.",
      button: "Start Free for Your Organization",
    },
    meta: {
      title: "Translync for NGOs — AI Translation for Humanitarian Events",
      description:
        "Real-time AI translation for NGO conferences, field trainings, and community meetings. Built-in humanitarian glossary, 70+ languages, from $3/hour.",
    },
  },

  universities: {
    slug: "universities",
    label: "Universities",
    hero: {
      title: "Make Lectures Accessible",
      highlight: "to Every Student",
      subtitle:
        "International students shouldn't struggle with language. Translync translates lectures, seminars, and campus events in real-time — right on their phone.",
    },
    socialProof: [
      "European University Alliance",
      "Global Campus Network",
      "InterStudy Foundation",
      "Academic Bridge Institute",
      "Multilingual Education Hub",
      "UniversityConnect",
    ],
    testimonial: {
      quote:
        "We piloted Translync for our international orientation week with students from 30 countries. The feedback was overwhelming — students said it was the first time they truly understood everything.",
      author: "Dr. Elena Fischer",
      role: "Director of International Programs, European University Alliance",
    },
    faq: [
      {
        q: "Can students use it during regular lectures?",
        a: "Yes. The professor creates a session and shares the QR code at the start of the lecture. Students scan it and follow along with real-time translation on their phone — as text or audio.",
      },
      {
        q: "Does it handle academic and technical vocabulary?",
        a: "Translync includes domain glossaries for common academic fields. Professors can also upload custom glossaries with course-specific terminology to improve translation accuracy.",
      },
      {
        q: "How many students can join simultaneously?",
        a: "There's no limit on the number of listeners. Each student connects through their own phone. The system scales automatically — whether it's 10 students or 500.",
      },
      {
        q: "Does it work in large lecture halls?",
        a: "Yes. The speaker uses a laptop or phone with a microphone. For large halls, we recommend using the room's audio system or a lapel mic for best results. Students use their own phones and earbuds.",
      },
      {
        q: "What does it cost for a university?",
        a: "$3/hour per language. A 2-hour lecture translated into 3 languages costs $18. For department-wide or campus-wide deployment, contact us for enterprise pricing.",
      },
    ],
    cta: {
      heading: "Education Without Language Barriers",
      subheading:
        "Start translating lectures and events. 30 free minutes, no IT setup needed.",
      button: "Start Free for Your University",
    },
    meta: {
      title: "Translync for Universities — AI Lecture Translation",
      description:
        "Real-time AI translation for lectures, seminars, and campus events. Help international students follow along in their language. 70+ languages, from $3/hour.",
    },
  },

  communities: {
    slug: "communities",
    label: "Communities",
    hero: {
      title: "Connect Your Community",
      highlight: "Across Every Language",
      subtitle:
        "Immigrant communities, cultural centers, and neighborhood organizations — give everyone a voice. Real-time translation for town halls, meetings, and community events.",
    },
    socialProof: [
      "Newcomers Alliance",
      "Cultural Bridge Center",
      "City Integration Program",
      "Immigrant Support Network",
      "Community Voice Initiative",
      "United Neighborhoods",
    ],
    testimonial: {
      quote:
        "Our town hall meetings used to exclude half the community because of language. Now everyone participates — in Spanish, Vietnamese, Arabic, and Somali — all at once.",
      author: "Rosa Martinez",
      role: "Community Organizer, Newcomers Alliance",
    },
    faq: [
      {
        q: "How do community members join?",
        a: "Display the QR code on a screen or print it on flyers. Attendees scan with their phone camera — no app download needed. They pick their language and start listening immediately.",
      },
      {
        q: "Does it work for languages like Somali, Dari, or Tagalog?",
        a: "Yes. Translync supports 70+ languages including less common ones. If your language isn't listed, contact us — we're constantly expanding coverage.",
      },
      {
        q: "Can it handle emotional or sensitive topics?",
        a: "Translync translates faithfully and neutrally. It doesn't editorialize or soften content. For community discussions about sensitive topics, the translation preserves the speaker's intent and tone.",
      },
      {
        q: "Is it affordable for small community organizations?",
        a: "At $3/hour per language, a 2-hour meeting in 4 languages costs $24. You get 30 free minutes to try it first. For nonprofits, contact us about discounted rates.",
      },
      {
        q: "Do people need smartphones?",
        a: "Yes, each listener needs a smartphone with a browser. For attendees without phones, you can set up a shared tablet or laptop at their table with the translation playing.",
      },
    ],
    cta: {
      heading: "Every Voice Matters. Every Language Counts.",
      subheading:
        "Start translating your community events. 30 free minutes, no barriers.",
      button: "Start Free for Your Community",
    },
    meta: {
      title: "Translync for Communities — AI Translation for Local Events",
      description:
        "Real-time AI translation for town halls, community meetings, and cultural events. Help immigrant communities participate fully. 70+ languages, from $3/hour.",
    },
  },
};

export const SEGMENT_SLUGS = Object.keys(SEGMENTS);

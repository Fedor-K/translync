"use client";
import { useState, useEffect } from "react";
import { TRANSLATIONS, type Locale } from "./i18n";
import { LOCALE_COOKIE } from "./locale-detect";

// English defaults — used when locale is "en" or translations not available
const EN_DASHBOARD = {
  title: "Dashboard",
  subtitle: "Manage your translation streams",
  newStream: "+ New Stream",
  yourStreams: "Your Streams",
  sessionsTotal: "total",
  noStreamsTitle: "No streams yet",
  noStreamsSubtitle: "Create your first translation stream to get started",
  createFirstStream: "Create First Stream",
  createNewStream: "+ Create new stream",
  usageThisMonth: "Usage This Month",
  minutes: "Minutes",
  sessions: "Sessions",
  freeTier: "Free tier",
  languagesThisMonth: "Languages This Month",
  noLanguagesYet: "No languages used yet",
  howItWorksTitle: "How it works",
  howItWorksSteps: [
    "Create a translation stream",
    "Share the QR code with attendees",
    "Start speaking -- translations appear live",
  ],
  learnMore: "Learn more",
  signOut: "Sign out",
  newTranslationStream: "New Translation Stream",
  sessionName: "Session name",
  sessionNamePlaceholder: "e.g. Sunday Service, Annual Conference",
  sessionNameHint: "Optional — helps you identify this session later",
  domain: "Domain",
  speakerLanguage: "Speaker language",
  translateTo: "Translate to",
  estimatedCost: "Est. cost",
  perHour: "/hour",
  language: "language",
  languages: "languages",
  startTranslationSession: "Start Translation Session",
  freeMinutesNote: "30 minutes free · No credit card required",
  selectAtLeastOne: "Select at least one target language",
  live: "Live",
  ended: "Ended",
  expired: "Expired",
  open: "Open",
  copyLink: "Copy Link",
  copied: "Copied!",
  qr: "QR",
  remove: "Remove",
  shareSession: "Share Session",
  downloadQR: "Download QR",
};

const EN_SESSION = {
  readyToStart: "Ready to start",
  step1: "Share the QR code above with your audience",
  step2: "Click Start Translation below",
  step3: "Allow microphone access when your browser asks",
  step4: "Speak naturally — translations appear live for your audience",
  startTranslation: "Start Translation",
  micPermission: "Your browser will ask for microphone permission",
  connecting: "Connecting...",
  hearingYou: "Hearing you...",
  speakIntoMic: "Speak into microphone",
  stopSession: "Stop Session",
  sessionEnded: "Session ended",
  totalSegments: "Total segments",
  shareWithAudience: "Share with audience",
  shareSubtitle: "Attendees scan QR or open the link on their phone",
  preview: "Preview",
  liveTranscript: "Live Transcript",
  micBlocked: "Microphone access blocked",
  tryAgain: "Try Again",
  streamViaOBS: "Stream via OBS",
  obsAlternative: "Alternative",
  obsDescription: "Use OBS Studio instead of browser microphone for professional audio",
  obsRtmpUrl: "RTMP URL",
  obsStreamKey: "Stream Key",
  obsCopy: "Copy",
  obsSetupTitle: "OBS Setup (3 steps):",
  obsSteps: [
    "Open OBS → Settings → Stream → Service: Custom",
    "Paste the RTMP URL as Server and the Stream Key above",
    "Click Start Streaming in OBS — translation begins automatically",
  ],
  obsTip: "Tip: For best results, use Audio Output Capture in OBS sources for clean audio without background noise.",
};

const EN_LISTEN = {
  selectLanguage: "Select language",
  listening: "Listening...",
  waiting: "Waiting for speaker...",
  sessionEndedTitle: "Session ended",
  sessionEndedSubtitle: "The speaker has ended this session",
  mute: "Mute",
  unmute: "Unmute",
};

export function useLocale() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // Read from cookie
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const localeCookie = cookies.find((c) => c.startsWith(`${LOCALE_COOKIE}=`));
    if (localeCookie) {
      const val = localeCookie.split("=")[1];
      if (["en", "es", "zh", "ar", "pt"].includes(val)) {
        setLocale(val as Locale);
        return;
      }
    }
    // Fallback to browser language
    const browserLang = navigator.language.split("-")[0].toLowerCase();
    if (["es", "zh", "ar", "pt"].includes(browserLang)) {
      setLocale(browserLang as Locale);
    }
  }, []);

  const t = locale === "en" ? null : TRANSLATIONS[locale as "es" | "zh" | "ar" | "pt"];

  return {
    locale,
    dashboard: (t?.dashboard as typeof EN_DASHBOARD) || EN_DASHBOARD,
    session: (t?.session as typeof EN_SESSION) || EN_SESSION,
    listen: (t?.listen as typeof EN_LISTEN) || EN_LISTEN,
  };
}

// Set locale cookie when user switches language
export function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

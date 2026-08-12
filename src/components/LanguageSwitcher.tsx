"use client";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { setLocaleCookie } from "@/lib/use-locale";

// This switches the APP's interface language — dashboard, session, listen — which
// has always been driven by a cookie. It used to navigate to /es, /zh, /ar, /pt as
// well, because the marketing pages had translated copies at those URLs. Those
// copies are gone: Google indexed them and showed them to nobody for 28 days. So
// the switcher no longer produces links, it sets the cookie and reloads in place.

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
];

export default function LanguageSwitcher({ current = "en" }: { current?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2 py-1.5 rounded-lg transition-colors"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span className="text-sm">{currentLang.flag}</span>
        <svg
          className={`w-3 h-3 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 min-w-[150px]" style={{ backgroundColor: "#ffffff" }}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-sm transition-colors ${
                  lang.code === current
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setLocaleCookie(lang.code as Locale);
                  setOpen(false);
                  // useLocale() reads the cookie on mount, so the interface picks
                  // the new language up on the next render pass.
                  window.location.reload();
                }}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                {lang.code === current && (
                  <svg className="w-3.5 h-3.5 ml-auto text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

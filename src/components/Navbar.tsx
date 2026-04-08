"use client";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const LOCALE_PREFIXES = ["es", "zh", "ar"];

export default function Navbar() {
  const pathname = usePathname();

  // Detect current locale from path
  let current = "en";
  for (const prefix of LOCALE_PREFIXES) {
    if (pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)) {
      current = prefix;
      break;
    }
  }

  return (
    <header className="bg-blue-900 text-white relative z-20">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href={current === "en" ? "/" : `/${current}`} className="font-bold text-xl">Translync</a>
        <div className="flex items-center gap-3">
          <LanguageSwitcher current={current} />
          <a href="/blog" className="hidden sm:inline-block text-sm text-blue-200 hover:text-white">Blog</a>
          <a href="/login" className="bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-4 py-2 rounded-lg">
            Start Free
          </a>
        </div>
      </div>
    </header>
  );
}

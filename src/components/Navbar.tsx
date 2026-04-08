import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ current = "en" }: { current?: string }) {
  return (
    <header className="bg-blue-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="/" className="font-bold text-xl">Translync</a>
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

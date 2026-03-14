export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-white font-bold text-xl mb-1">Translync</div>
            <div className="text-sm">Real-time AI translation for events</div>
          </div>

          <div className="flex gap-8 text-sm">
            <a href="#how-it-works" className="hover:text-white transition">
              How it works
            </a>
            <a href="#pricing" className="hover:text-white transition">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white transition">
              FAQ
            </a>
            <a
              href="mailto:hello@translync.com"
              className="hover:text-white transition"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <span>© 2026 Translync. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

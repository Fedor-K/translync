export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div>
            <div className="text-white font-bold text-xl mb-2">Translync</div>
            <p className="text-sm max-w-xs leading-relaxed">
              Real-time AI translation for events, churches, NGOs, and
              conferences.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12 sm:gap-16">
            <div>
              <h4 className="text-white text-sm font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/translation" className="hover:text-white transition-colors">
                    Translation Services
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-3">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/for/churches" className="hover:text-white transition-colors">
                    For Churches
                  </a>
                </li>
                <li>
                  <a href="/for/ngos" className="hover:text-white transition-colors">
                    For NGOs
                  </a>
                </li>
                <li>
                  <a href="/for/universities" className="hover:text-white transition-colors">
                    For Universities
                  </a>
                </li>
                <li>
                  <a href="/for/communities" className="hover:text-white transition-colors">
                    For Communities
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@translync.app"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm">
          <span>&copy; 2026 Translync. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

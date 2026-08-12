import type { Metadata } from "next";

// The login page is a client component and cannot export metadata itself, so it
// inherited the root layout's hardcoded homepage canonical — telling Google the
// homepage and the login page are the same document.
export const metadata: Metadata = {
  title: "Log in — Translync",
  alternates: { canonical: "https://translync.app/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

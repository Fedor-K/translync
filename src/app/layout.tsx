import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import GA4UserTracker from "@/components/GA4UserTracker";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Translync — AI Translation for Live Events",
  description:
    "Real-time AI translation in 70+ languages. No hardware, no app. Attendees scan a QR code and hear translation instantly. From $3/hour.",
  keywords: [
    "real-time translation for events",
    "live interpretation software",
    "church translation app",
    "simultaneous translation app for churches",
    "AI interpreter for nonprofits",
    "live translation for conferences",
    "glossa alternative",
    "real-time speech translation",
    "event translation software",
    "AI simultaneous interpretation",
  ],
  authors: [{ name: "Translync" }],
  creator: "Translync",
  publisher: "Translync",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    title: "Translync — Real-Time AI Translation for Events",
    description:
      "Break language barriers at your events. AI-powered live translation in 70+ languages. No hardware required. From $3/hour.",
    url: "https://translync.app",
    siteName: "Translync",
    locale: "en_US",
    images: [
      {
        url: "https://translync.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Translync — Real-Time AI Translation for Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Translync — Real-Time AI Translation for Events",
    description:
      "AI-powered live translation in 70+ languages. No hardware. From $3/hour.",
    images: ["https://translync.app/og-image.png"],
  },
  // NOTE: this canonical is inherited by every page that does not declare its
  // own, which silently points them at the homepage. Any new route needs its own
  // `alternates.canonical`.
  alternates: {
    canonical: "https://translync.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={inter.className}>
        <Providers>
          <JsonLd />
          <GA4UserTracker />
          {children}
        </Providers>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-Q5KTGGYPVF" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Q5KTGGYPVF');` }} />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Translync — Real-Time AI Translation for Churches, NGOs & Events",
  description:
    "AI-powered live translation in 70+ languages. No hardware, no interpreters. Works in any browser — attendees scan a QR code and hear translation instantly. From $3/hour.",
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
  alternates: {
    canonical: "https://translync.app",
    languages: {
      en: "https://translync.app",
      es: "https://translync.app/es",
      zh: "https://translync.app/zh",
      ar: "https://translync.app/ar",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <JsonLd />
          {children}
        </Providers>
      </body>
    </html>
  );
}

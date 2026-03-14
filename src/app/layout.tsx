import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Translync — Real-Time AI Translation for Events",
  description:
    "Break language barriers at your events. AI-powered live translation in 70+ languages. No hardware required. Pay only for what you use.",
  openGraph: {
    title: "Translync — Real-Time AI Translation for Events",
    description:
      "Break language barriers at your events. AI-powered live translation in 70+ languages.",
    url: "https://translync.com",
    siteName: "Translync",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

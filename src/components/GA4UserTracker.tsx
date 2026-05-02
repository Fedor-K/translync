"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GA4UserTracker() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email && window.gtag) {
      // Set user ID for GA4
      window.gtag("config", "G-Q5KTGGYPVF", {
        user_id: session.user.email,
      });
      // Set user properties
      window.gtag("set", "user_properties", {
        user_email: session.user.email,
      });
    }
  }, [session]);

  return null;
}

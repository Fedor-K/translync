import NextAuth from "next-auth";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";
import type { NextAuthConfig } from "next-auth";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const config: NextAuthConfig = {
  adapter: UpstashRedisAdapter(redis),
  providers: [
    {
      id: "resend",
      name: "Email",
      type: "email",
      maxAge: 60 * 10, // 10 min link validity
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Translync <noreply@translync.app>",
            to: email,
            subject: "Sign in to Translync",
            html: `
              <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 32px;">
                <h2 style="color: #1e40af; margin-bottom: 8px;">Translync</h2>
                <p style="color: #374151; font-size: 16px;">Click the button below to sign in:</p>
                <a href="${url}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; margin: 16px 0;">
                  Sign in to Translync
                </a>
                <p style="color: #9ca3af; font-size: 13px; margin-top: 24px;">
                  If you didn't request this, ignore this email.<br/>
                  This link expires in 10 minutes.
                </p>
              </div>
            `,
          }),
        });

        if (!res.ok) {
          const body = await res.text();
          throw new Error(`Resend error ${res.status}: ${body}`);
        }
      },
    },
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/login?check=1",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const checkEmail = searchParams.get("check") === "1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const { signIn } = await import("next-auth/react");
      const result = await signIn("resend", { email, callbackUrl: "/dashboard", redirect: false });
      if (result?.error) {
        setError("Could not send magic link. Please try again.");
        setLoading(false);
      } else {
        setSent(true);
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  if (sent || checkEmail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Check your email</h1>
          <p className="text-gray-500 text-sm mb-2">
            We sent a magic link to{email ? <span className="font-semibold text-gray-700"> {email}</span> : " your email"}.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Click the link in the email to sign in.
          </p>
          <p className="text-gray-400 text-xs mb-4">
            Link expires in 10 minutes. Check spam if not found.
          </p>
          <button
            onClick={() => { setSent(false); setError(""); }}
            className="text-blue-600 text-sm hover:underline"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Sign in to Translync</h1>
          <p className="text-gray-500 text-sm mt-1">Enter your email to sign in or create an account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          {error && (
            <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 mb-4 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-4">
          No password needed. We'll email you a link.
        </p>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <a href="/" className="text-blue-600 text-sm hover:underline">← Back to home</a>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

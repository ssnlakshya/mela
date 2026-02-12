"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { ALLOWED_OWNER_EMAILS } from "@/lib/auth/allowlist";

const PASSWORD_HINT = "pass123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = createBrowserSupabaseClient();
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          router.replace("/owner/stall");
        }
      } catch {
        // Ignore session check errors on load.
      }
    };

    void checkSession();
  }, [router]);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthStatus(null);

    const normalizedEmail = email.trim().toLowerCase();
    if (!ALLOWED_OWNER_EMAILS.includes(normalizedEmail)) {
      setAuthStatus("Email is not approved for access.");
      return;
    }

    setIsAuthenticating(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password.trim(),
      });

      if (error) {
        setAuthStatus(error.message);
      } else {
        router.push("/owner/stall");
      }
    } catch (error) {
      setAuthStatus(error instanceof Error ? error.message : "Sign in failed.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-orange-100 bg-white p-8 shadow-[0_20px_60px_rgba(255,140,0,0.15)]">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Stall Owner Portal
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-neutral-900">
            Sign in to manage your stall
          </h1>
          <p className="mt-3 text-neutral-600">
            Access is currently limited to approved email addresses.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSignIn}>
          <div>
            <label className="text-sm font-medium text-neutral-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@ssn.edu.in"
              className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={`Temporary password: ${PASSWORD_HINT}`}
              className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isAuthenticating ? "Signing in..." : "Continue with Email"}
          </button>
        </form>

        {authStatus && (
          <div className="mt-4 rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
            {authStatus}
          </div>
        )}

        <div className="mt-6 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Allowed emails
          </p>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            {ALLOWED_OWNER_EMAILS.map((allowedEmail) => (
              <li key={allowedEmail} className="rounded-lg bg-white/80 px-3 py-2">
                {allowedEmail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

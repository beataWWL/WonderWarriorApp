"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const { error: err } = await signIn.email({ email, password });
    setPending(false);
    if (err) {
      setError(err.message ?? "Sign-in failed. Check your email and password.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="max-w-[480px] mx-auto px-6 pt-20 pb-16">
      <header className="text-center mb-10">
        <p className="font-label font-semibold text-ember text-[0.75rem] uppercase tracking-[0.4em] mb-2">
          Welcome Back
        </p>
        <h1 className="font-display brand-gradient text-[clamp(1.6rem,3.5vw,2.2rem)] leading-[1.25]">
          Return to Practice
        </h1>
      </header>

      <form
        onSubmit={onSubmit}
        className="bg-deep-ocean/60 border border-[rgba(0,212,255,0.15)] rounded-3xl p-8 space-y-5"
      >
        <label className="block">
          <span className="font-label font-semibold uppercase tracking-[0.25em] text-[0.72rem] text-lightning block mb-2">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="w-full font-body bg-abyss/50 border border-[rgba(0,212,255,0.15)] rounded-xl text-clarity text-[0.95rem] px-4 py-3 outline-none transition focus:border-lightning focus:shadow-[0_0_0_3px_rgba(0,212,255,0.12)]"
          />
        </label>

        <label className="block">
          <span className="font-label font-semibold uppercase tracking-[0.25em] text-[0.72rem] text-lightning block mb-2">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full font-body bg-abyss/50 border border-[rgba(0,212,255,0.15)] rounded-xl text-clarity text-[0.95rem] px-4 py-3 outline-none transition focus:border-lightning focus:shadow-[0_0_0_3px_rgba(0,212,255,0.12)]"
          />
        </label>

        {error ? (
          <p className="font-body text-[0.9rem] text-flame bg-flame/10 border border-flame/30 rounded-lg px-4 py-3">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full font-label font-bold uppercase tracking-[0.3em] text-[0.8rem] text-white px-8 py-3 rounded-full transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(90deg, #ff6b1a, #ff9d57)",
            boxShadow: "0 4px 20px rgba(255,107,26,0.4)",
          }}
        >
          {pending ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="text-center font-body text-[0.9rem] text-muted mt-6">
        New here?{" "}
        <Link
          href="/signup"
          className="text-lightning hover:text-ember transition"
        >
          Create an account
        </Link>
      </p>
    </main>
  );
}

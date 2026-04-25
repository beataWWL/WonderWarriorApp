"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const { error: err } = await signUp.email({ name, email, password });
    setPending(false);
    if (err) {
      setError(err.message ?? "Sign-up failed. Try again.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="max-w-[480px] mx-auto px-6 pt-20 pb-16">
      <header className="text-center mb-10">
        <p className="font-label font-semibold text-ember text-[0.75rem] uppercase tracking-[0.4em] mb-2">
          Create Account
        </p>
        <h1 className="font-display brand-gradient text-[clamp(1.6rem,3.5vw,2.2rem)] leading-[1.25]">
          Begin Your Practice
        </h1>
      </header>

      <form
        onSubmit={onSubmit}
        className="bg-deep-ocean/60 border border-edge rounded-3xl p-8 space-y-5"
      >
        <Field
          label="Name"
          type="text"
          value={name}
          onChange={setName}
          autoComplete="name"
          required
        />
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          required
          minLength={8}
          helper="At least 8 characters."
        />

        {error ? (
          <p className="font-body text-[0.9rem] text-flame bg-flame/10 border border-flame/30 rounded-lg px-4 py-3">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="btn-flame w-full font-label font-bold uppercase tracking-[0.3em] text-[0.8rem] text-white px-8 py-3 rounded-full transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="text-center font-body text-[0.9rem] text-muted mt-6">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="text-lightning hover:text-ember transition"
        >
          Sign in
        </Link>
      </p>
    </main>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  autoComplete,
  required,
  minLength,
  helper,
}: {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  helper?: string;
}) {
  return (
    <label className="block">
      <span className="font-label font-semibold uppercase tracking-[0.25em] text-[0.72rem] text-lightning block mb-2">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        className="w-full font-body bg-abyss/50 border border-edge rounded-xl text-clarity text-[0.95rem] px-4 py-3 outline-none transition focus:border-lightning focus:shadow-[0_0_0_3px_rgba(0,212,255,0.12)]"
      />
      {helper ? (
        <span className="font-body text-[0.8rem] text-muted mt-1 block">
          {helper}
        </span>
      ) : null}
    </label>
  );
}

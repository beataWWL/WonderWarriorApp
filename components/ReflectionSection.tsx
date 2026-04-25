"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "@/lib/auth-client";

type Props = {
  classSlug: string;
  prompt: string;
  placeholders: string[];
};

const storageKey = (slug: string) => `wonder_${slug}`;

export function ReflectionSection({ classSlug, prompt, placeholders }: Props) {
  const { data: session, isPending: sessionPending } = useSession();
  const isSignedIn = !!session?.user;

  const [values, setValues] = useState<string[]>(() =>
    placeholders.map(() => ""),
  );
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load existing reflections on mount / when session resolves.
  useEffect(() => {
    if (sessionPending) return;

    if (isSignedIn) {
      // Signed in → fetch from API.
      let cancelled = false;
      (async () => {
        try {
          const res = await fetch(
            `/api/reflections?classSlug=${encodeURIComponent(classSlug)}`,
          );
          if (!res.ok) return;
          const data = (await res.json()) as {
            reflections: { promptIndex: number; content: string }[];
          };
          if (cancelled) return;
          setValues((prev) => {
            const next = [...prev];
            for (const row of data.reflections) {
              if (row.promptIndex >= 0 && row.promptIndex < next.length) {
                next[row.promptIndex] = row.content;
              }
            }
            return next;
          });
        } catch {
          /* network error — leave fields empty */
        }
      })();
      return () => {
        cancelled = true;
      };
    }

    // Signed out → read localStorage (preserves pre-auth behavior).
    try {
      const raw = localStorage.getItem(storageKey(classSlug));
      if (!raw) return;
      const data = JSON.parse(raw) as Record<string, string>;
      setValues((prev) =>
        prev.map((_, i) => data[`ref-${classSlug}-${i}`] ?? ""),
      );
    } catch {
      /* ignore corrupt storage */
    }
  }, [classSlug, isSignedIn, sessionPending]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function onSave() {
    setError(null);
    if (isSignedIn) {
      setSaving(true);
      try {
        // POST each value. Parallel requests; all upserts are idempotent.
        const results = await Promise.all(
          values.map((content, promptIndex) =>
            fetch("/api/reflections", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ classSlug, promptIndex, content }),
            }),
          ),
        );
        const failed = results.find((r) => !r.ok);
        if (failed) {
          setError("Couldn't save. Please try again.");
          setSaving(false);
          return;
        }
      } catch {
        setError("Network error. Your notes weren't saved.");
        setSaving(false);
        return;
      }
      setSaving(false);
    } else {
      const data: Record<string, string> = {};
      values.forEach((v, i) => {
        data[`ref-${classSlug}-${i}`] = v;
      });
      localStorage.setItem(storageKey(classSlug), JSON.stringify(data));
    }

    setSaved(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSaved(false), 2000);
  }

  return (
    <section className="bg-storm/15 border border-edge rounded-2xl p-8 mb-6">
      <h3 className="font-label font-semibold text-[0.75rem] uppercase tracking-[0.35em] text-lightning mb-5">
        📓 Reflection Journal
      </h3>
      <p className="font-serif italic text-muted text-[1rem] mb-4">{prompt}</p>

      {!sessionPending && !isSignedIn ? (
        <p className="font-body text-[0.85rem] text-muted bg-abyss/40 border border-edge rounded-xl px-4 py-3 mb-4">
          Your notes are being saved to this browser only.{" "}
          <a
            href="/signin"
            className="text-lightning hover:text-ember transition"
          >
            Sign in
          </a>{" "}
          to sync across devices.
        </p>
      ) : null}

      {placeholders.map((placeholder, i) => (
        <textarea
          key={i}
          value={values[i] ?? ""}
          onChange={(e) =>
            setValues((prev) => {
              const next = [...prev];
              next[i] = e.target.value;
              return next;
            })
          }
          placeholder={placeholder}
          rows={3}
          className="w-full font-body bg-abyss/50 border border-edge rounded-xl text-clarity text-[0.95rem] p-4 resize-y min-h-[100px] leading-[1.7] outline-none mb-3 transition focus:border-lightning focus:shadow-[0_0_0_3px_rgba(0,212,255,0.12)] placeholder:text-muted/50"
        />
      ))}

      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={onSave}
          type="button"
          disabled={saving}
          className="btn-flame font-label font-bold uppercase tracking-[0.3em] text-[0.75rem] text-white px-7 py-2.5 rounded-full transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : "Save Notes"}
        </button>
        {saved ? (
          <span className="font-label uppercase tracking-[0.2em] text-[0.75rem] text-lightning">
            ✓ Saved{isSignedIn ? " to your account" : ""}
          </span>
        ) : null}
        {error ? (
          <span className="font-label uppercase tracking-[0.2em] text-[0.75rem] text-flame">
            {error}
          </span>
        ) : null}
      </div>
    </section>
  );
}

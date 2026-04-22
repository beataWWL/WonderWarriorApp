"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  classSlug: string;
  prompt: string;
  placeholders: string[];
};

const storageKey = (slug: string) => `wonder_${slug}`;

export function ReflectionSection({ classSlug, prompt, placeholders }: Props) {
  const [values, setValues] = useState<string[]>(() =>
    placeholders.map(() => "")
  );
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(classSlug));
      if (!raw) return;
      const data = JSON.parse(raw) as Record<string, string>;
      setValues((prev) =>
        prev.map((_, i) => data[`ref-${classSlug}-${i}`] ?? "")
      );
    } catch {
      /* ignore corrupt storage */
    }
  }, [classSlug]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function onSave() {
    const data: Record<string, string> = {};
    values.forEach((v, i) => {
      data[`ref-${classSlug}-${i}`] = v;
    });
    localStorage.setItem(storageKey(classSlug), JSON.stringify(data));
    setSaved(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSaved(false), 2000);
  }

  return (
    <section className="bg-storm/15 border border-[rgba(0,212,255,0.15)] rounded-2xl p-8 mb-6">
      <h3 className="font-label font-semibold text-[0.75rem] uppercase tracking-[0.35em] text-lightning mb-5">
        📓 Reflection Journal
      </h3>
      <p className="font-serif italic text-muted text-[1rem] mb-4">{prompt}</p>
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
          className="w-full font-body bg-abyss/50 border border-[rgba(0,212,255,0.15)] rounded-xl text-clarity text-[0.95rem] p-4 resize-y min-h-[100px] leading-[1.7] outline-none mb-3 transition focus:border-lightning focus:shadow-[0_0_0_3px_rgba(0,212,255,0.12)] placeholder:text-muted/50"
        />
      ))}
      <button
        onClick={onSave}
        type="button"
        className="font-label font-bold uppercase tracking-[0.3em] text-[0.75rem] text-white px-7 py-2.5 rounded-full transition hover:opacity-90"
        style={{
          background: "linear-gradient(90deg, #ff6b1a, #ff9d57)",
          boxShadow: "0 4px 20px rgba(255,107,26,0.35)",
        }}
      >
        Save Notes
      </button>
      {saved ? (
        <span className="font-label uppercase tracking-[0.2em] text-[0.75rem] text-lightning ml-4">
          ✓ Saved
        </span>
      ) : null}
    </section>
  );
}

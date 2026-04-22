import Link from "next/link";
import type { ClassData } from "@/lib/classes";

type Props = {
  prev?: ClassData;
  next?: ClassData;
};

export function ClassNav({ prev, next }: Props) {
  return (
    <div className="flex gap-4 justify-center py-8 flex-wrap">
      <Link
        href={prev ? `/classes/${prev.slug}` : "/"}
        className="font-label font-semibold uppercase tracking-[0.3em] text-[0.75rem] text-lightning px-8 py-3 rounded-full border border-[rgba(0,212,255,0.4)] transition hover:bg-lightning/8 hover:border-lightning hover:shadow-[0_0_20px_rgba(0,212,255,0.25)]"
      >
        ← {prev ? prev.title.split(/[—:]/)[0].trim() : "Home"}
      </Link>
      <Link
        href={next ? `/classes/${next.slug}` : "/"}
        className="font-label font-bold uppercase tracking-[0.3em] text-[0.75rem] text-white px-8 py-3 rounded-full transition hover:opacity-90"
        style={{
          background: "linear-gradient(90deg, #ff6b1a, #ff9d57)",
          boxShadow: "0 4px 20px rgba(255,107,26,0.4)",
        }}
      >
        {next
          ? `Next: ${next.title.split(/[—:]/)[0].trim()} →`
          : "Return to Home ✦"}
      </Link>
    </div>
  );
}

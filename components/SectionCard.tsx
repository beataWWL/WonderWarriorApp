import type { ReactNode } from "react";

type Props = {
  title: string;
  icon?: string;
  children: ReactNode;
  accent?: "lightning" | "ember" | "flame";
};

export function SectionCard({
  title,
  icon,
  children,
  accent = "lightning",
}: Props) {
  const titleColor =
    accent === "flame"
      ? "text-flame"
      : accent === "ember"
      ? "text-ember"
      : "text-lightning";
  const iconBg =
    accent === "flame"
      ? "bg-flame/15 border-flame/30"
      : accent === "ember"
      ? "bg-ember/15 border-ember/30"
      : "bg-lightning/15 border-lightning/25";

  return (
    <section className="bg-deep-ocean border border-[rgba(0,212,255,0.15)] rounded-2xl p-8 mb-6">
      <h3
        className={`font-label font-semibold text-[0.75rem] uppercase tracking-[0.35em] mb-5 flex items-center gap-3 ${titleColor}`}
      >
        {icon ? (
          <span
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm border ${iconBg}`}
          >
            {icon}
          </span>
        ) : null}
        {title}
      </h3>
      {children}
    </section>
  );
}

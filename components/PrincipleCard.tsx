import Link from "next/link";

type Props = {
  principleNum: number;
  principleTagline: string;
  practiceNum: number;
  practiceName: string;
  href: string;
};

export function PrincipleCard({
  principleNum,
  principleTagline,
  practiceNum,
  practiceName,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden block bg-deep-ocean border border-[rgba(0,212,255,0.15)] rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-lightning hover:bg-[rgba(0,24,51,0.8)] hover:shadow-[0_10px_40px_rgba(0,212,255,0.12),0_10px_40px_rgba(255,140,66,0.06)]"
    >
      <span
        className="absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, #00d4ff, #ff8c42)",
        }}
      />
      <p className="font-label font-semibold text-[0.7rem] text-ember uppercase tracking-[0.35em] mb-2">
        Principle {principleNum}
      </p>
      <p className="font-serif italic text-[0.95rem] text-muted leading-relaxed">
        {principleTagline}
      </p>
      <p className="font-label font-semibold text-[0.7rem] text-ember uppercase tracking-[0.35em] mt-3 mb-2">
        Practice {practiceNum}
      </p>
      <h3 className="font-display text-[1.25rem] text-clarity leading-snug mb-2">
        {practiceName}
      </h3>
      <span className="inline-block font-label uppercase tracking-[0.3em] text-[0.75rem] text-lightning mt-2">
        Explore →
      </span>
    </Link>
  );
}

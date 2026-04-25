import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-12">
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(0,212,255,0.18) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(255,140,66,0.14) 0%, transparent 60%)",
        }}
      />
      <p className="font-serif italic text-[1.15rem] text-muted mb-2 relative">
        An immersive experience
      </p>
      <h1
        className="font-display font-normal brand-gradient text-[clamp(2rem,5vw,3.5rem)] leading-[1.25] mb-2 tracking-[0.02em] relative"
        style={{ textShadow: "0 0 60px rgba(0,212,255,0.25)" }}
      >
        Being a Wonder Warrior
      </h1>
      <p className="font-label font-semibold tracking-[0.35em] uppercase text-[0.85rem] text-ember mb-12 relative">
        with Beata Chapman, Ph.D.
        <br />
        the Wonder Warrior
      </p>
      <blockquote className="max-w-[600px] font-serif italic text-muted leading-[1.8] text-[1.05rem] mb-12 p-6 bg-[rgba(0,168,214,0.06)] border-l-[3px] border-lightning rounded-r-xl text-left relative">
        Wonder is not defined by nor dependent on any particular feeling. It is
        not reliant on joy, positivity, awe, or specialness — it is neither
        created nor found. Wonder is endemic in the mundane, the everyday, the
        simple.
      </blockquote>
      <Link
        href="/classes/warm-stillness"
        className="btn-flame relative inline-block font-label font-bold uppercase tracking-[0.3em] text-[0.75rem] text-white px-8 py-3 rounded-full transition hover:opacity-90"
      >
        Begin the Journey →
      </Link>
    </section>
  );
}

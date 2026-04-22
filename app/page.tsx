import { Hero } from "@/components/Hero";
import { PrincipleCard } from "@/components/PrincipleCard";
import { classes } from "@/lib/classes";

const taglines: Record<string, string> = {
  "warm-stillness": "Building the heart to stay",
  "generative-commitment": "Stabilizing the vessel",
  "wide-field": "Widening the field",
  "living-in-question": "Breaking through blocks and habits of mind",
  purposelessness: "The wisdom of nowhere to go, nothing to fix",
  "deep-noticing": "Antidote to suffering",
  "body-of-now": "Intimacy in everyday life",
};

const facts = [
  "Unhindered by sorrow, rage, or lust — the ability to experience strong, hot emotions is a natural source of wonder.",
  "Wonder is not reliant on joy, positivity, or specialness — it is endemic in the mundane, the everyday, the simple.",
  "Wonder connects us to the great mystery — the profound, the unknowable that is always here. Nothing is hidden.",
  "You bring wonder by loving the world as it is — by letting it be. When you do that, wonder reflects itself back to you as you are, wherever you are.",
];

const skills = [
  "Refine consciousness — widen and narrow focus at will",
  "Eyes that hear and ears that see — go beyond dividing",
  "Suspend knowing — let go of naming and other habits of mind",
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="px-6 py-16 max-w-[1100px] mx-auto">
        <p className="font-label font-semibold text-ember text-center text-[0.75rem] uppercase tracking-[0.4em] mb-2">
          The Seven Principles and Practices for a
          <br />
          Life of Wonder
        </p>
        <h2 className="font-display brand-gradient-warm text-center text-[2rem] mb-12">
          Your 7 Practices
        </h2>

        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {classes.map((c) => (
            <PrincipleCard
              key={c.slug}
              principleNum={c.num}
              principleTagline={taglines[c.slug] ?? c.subtitle}
              practiceNum={c.num}
              practiceName={c.title}
              href={`/classes/${c.slug}`}
            />
          ))}
        </div>
      </section>

      <div className="max-w-[960px] mx-auto px-6 pb-16">
        <section className="bg-deep-ocean/60 border border-[rgba(0,212,255,0.15)] rounded-3xl p-10 mb-8">
          <h3 className="font-label font-semibold text-lightning text-center text-[0.8rem] uppercase tracking-[0.4em] mb-8">
            Facts About Wonder
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {facts.map((fact, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span
                  className="shrink-0 mt-[0.4rem] w-2 h-2 rounded-full bg-lightning"
                  style={{ boxShadow: "0 0 12px rgba(0,212,255,0.7)" }}
                />
                <p className="font-serif text-[1rem] text-muted leading-[1.7]">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-deep-ocean border border-[rgba(0,212,255,0.15)] rounded-3xl p-10 text-center">
          <h3 className="font-label font-semibold text-ember text-[0.8rem] uppercase tracking-[0.4em] mb-8">
            Building the Wonder Muscle — Skill Set
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-ember/12 border border-ember/30 rounded-full px-6 py-2.5 font-label uppercase tracking-[0.15em] text-[0.8rem] text-ember"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

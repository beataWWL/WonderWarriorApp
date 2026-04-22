import type { Block } from "@/lib/classes";
import { QuoteBlock } from "@/components/QuoteBlock";
import { PracticeSteps } from "@/components/PracticeSteps";

type Props = { block: Block };

export function BlockRenderer({ block }: Props) {
  switch (block.type) {
    case "p":
      return (
        <p
          className="text-clarity leading-[1.8] text-[0.95rem] mb-3 last:mb-0"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );

    case "italic-note":
      return (
        <p
          className="font-serif italic text-muted text-[1rem] leading-[1.8] mb-3 last:mb-0"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );

    case "core-intention":
      return (
        <p className="mb-5">
          <strong className="text-ember font-label uppercase tracking-[0.25em] text-[0.75rem] block mb-1">
            Core Intention
          </strong>
          <span
            className="text-clarity leading-[1.8] text-[1rem]"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </p>
      );

    case "featured-quote":
      return (
        <p
          className="font-serif italic text-[1.2rem] text-spark mb-3"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );

    case "quote":
      return <QuoteBlock text={block.text} cite={block.cite} />;

    case "steps":
      return <PracticeSteps steps={block.steps} />;

    case "tags":
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          {block.tags.map((tag) => (
            <span
              key={tag}
              className="bg-force/15 border border-force/30 rounded-full px-3.5 py-1.5 font-label uppercase tracking-[0.2em] text-[0.7rem] text-force"
            >
              {tag}
            </span>
          ))}
        </div>
      );

    case "notice-list":
      return (
        <div className="grid gap-3 mt-4 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
          {block.items.map((item) => (
            <div
              key={item}
              className="bg-lightning/8 border border-lightning/20 rounded-xl px-4 py-3 font-label uppercase tracking-[0.12em] text-[0.78rem] text-force text-center"
            >
              {item}
            </div>
          ))}
        </div>
      );

    case "is-not-grid":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-deep-ocean/60 rounded-xl px-5 py-4 font-body text-[0.92rem] text-muted border border-flame/25">
            <h4 className="font-label font-semibold text-[0.7rem] uppercase tracking-[0.3em] mb-2 text-flame">
              Is NOT
            </h4>
            <ul className="list-none p-0 space-y-1">
              {block.isNot.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-deep-ocean/60 rounded-xl px-5 py-4 font-body text-[0.92rem] text-muted border border-lightning/25">
            <h4 className="font-label font-semibold text-[0.7rem] uppercase tracking-[0.3em] mb-2 text-lightning">
              IS
            </h4>
            <ul className="list-none p-0 space-y-1">
              {block.is.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      );

    case "agreements":
      return (
        <div className="flex flex-col gap-3">
          {block.items.map((item, i) => (
            <p
              key={i}
              className="bg-storm/12 rounded-xl px-5 py-4 font-serif text-[1rem] text-muted leading-[1.6] border-l-2 border-lightning"
            >
              {item}
            </p>
          ))}
        </div>
      );
  }
}

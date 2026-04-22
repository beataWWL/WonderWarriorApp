type Props = { text: string; cite?: string };

export function QuoteBlock({ text, cite }: Props) {
  return (
    <blockquote className="border-l-[3px] border-ember bg-ember/5 rounded-r-xl px-6 py-5 my-5 font-serif italic text-[1.05rem] text-muted leading-[1.8]">
      <p>{text}</p>
      {cite ? (
        <cite className="block mt-3 font-label not-italic uppercase tracking-[0.25em] text-[0.75rem] text-ember">
          — {cite}
        </cite>
      ) : null}
    </blockquote>
  );
}

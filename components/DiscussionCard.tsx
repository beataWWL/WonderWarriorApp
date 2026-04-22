type Props = { title: string; questions: string[] };

export function DiscussionCard({ title, questions }: Props) {
  return (
    <section className="bg-flame/5 border border-flame/25 rounded-2xl p-8 mb-6">
      <h3 className="font-label font-semibold text-[0.75rem] uppercase tracking-[0.35em] text-flame mb-5">
        {title}
      </h3>
      <ol className="space-y-3">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-4 items-start">
            <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full border border-flame/35 bg-flame/15 flex items-center justify-center font-label font-bold text-[0.7rem] text-flame">
              {i + 1}
            </span>
            <p
              className="text-clarity text-[0.95rem] leading-[1.7]"
              dangerouslySetInnerHTML={{ __html: q }}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

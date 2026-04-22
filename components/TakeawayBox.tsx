type Props = { title: string; body: string };

export function TakeawayBox({ title, body }: Props) {
  return (
    <section
      className="border border-ember rounded-2xl p-8 text-center mb-6"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(255,140,66,0.08))",
        boxShadow:
          "0 0 40px rgba(255,140,66,0.12), 0 0 40px rgba(0,212,255,0.08)",
      }}
    >
      <h3 className="font-label font-semibold text-[0.75rem] uppercase tracking-[0.4em] text-ember mb-4">
        {title}
      </h3>
      <p
        className="font-serif italic text-[1.2rem] text-clarity leading-[1.7]"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </section>
  );
}

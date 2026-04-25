type Props = { steps: string[] };

export function PracticeSteps({ steps }: Props) {
  return (
    <ol className="space-y-4 my-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-5 items-start">
          <span className="flame-orb shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-label font-bold text-[0.85rem] text-white">
            {i + 1}
          </span>
          <p
            className="text-clarity leading-[1.7] text-[0.95rem] pt-1"
            dangerouslySetInnerHTML={{ __html: step }}
          />
        </li>
      ))}
    </ol>
  );
}

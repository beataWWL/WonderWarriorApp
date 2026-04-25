import Link from "next/link";
import { classes } from "@/lib/classes";
import { SectionCard } from "@/components/SectionCard";

export function CourseReview() {
  return (
    <SectionCard title="Course Review — All 7 Practices" icon="🔄">
      <ul className="flex flex-col gap-3 mt-2">
        {classes.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/classes/${c.slug}`}
              className="flex items-center gap-4 bg-storm/12 rounded-xl px-5 py-3.5 border-l-2 border-lightning font-serif text-[1rem] text-muted leading-[1.6] hover:text-clarity hover:bg-storm/20 transition"
            >
              <strong className="font-label text-ember mr-1 font-semibold">
                {c.num}.
              </strong>
              {c.title} — {c.principle}
            </Link>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

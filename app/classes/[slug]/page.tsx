import { notFound } from "next/navigation";
import { classes, getAdjacentClasses, getClassBySlug } from "@/lib/classes";
import { SectionCard } from "@/components/SectionCard";
import { DiscussionCard } from "@/components/DiscussionCard";
import { TakeawayBox } from "@/components/TakeawayBox";
import { ReflectionSection } from "@/components/ReflectionSection";
import { CourseReview } from "@/components/CourseReview";
import { ClassNav } from "@/components/ClassNav";
import { BlockRenderer } from "@/components/BlockRenderer";
import type { Section } from "@/lib/classes";

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }));
}

export default async function ClassPage(props: PageProps<"/classes/[slug]">) {
  const { slug } = await props.params;
  const data = getClassBySlug(slug);
  if (!data) notFound();

  const { prev, next } = getAdjacentClasses(slug);

  return (
    <article className="max-w-[960px] mx-auto px-6 pb-8">
      <header className="text-center pt-12 pb-8 mb-10 border-b border-edge">
        <p className="font-label font-semibold text-ember text-[0.75rem] uppercase tracking-[0.4em] mb-2">
          {data.label}
        </p>
        <p className="font-label font-semibold text-lightning text-[0.7rem] uppercase tracking-[0.35em] mb-1">
          Principle {data.num}
        </p>
        <p className="font-display text-clarity text-[clamp(1.1rem,2.4vw,1.5rem)] leading-snug mb-5">
          {data.principle}
        </p>
        <p className="font-label font-semibold text-ember text-[0.7rem] uppercase tracking-[0.35em] mb-1">
          Practice {data.num}
        </p>
        <h1 className="font-display brand-gradient text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.25]">
          {data.title}
        </h1>
      </header>

      {data.sections.map((section, i) => (
        <SectionRenderer key={i} section={section} classSlug={data.slug} />
      ))}

      <ClassNav prev={prev} next={next} />
    </article>
  );
}

function SectionRenderer({
  section,
  classSlug,
}: {
  section: Section;
  classSlug: string;
}) {
  switch (section.kind) {
    case "card":
      return (
        <SectionCard title={section.title} icon={section.icon}>
          {section.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </SectionCard>
      );

    case "discussion":
      return (
        <DiscussionCard title={section.title} questions={section.questions} />
      );

    case "takeaway":
      return <TakeawayBox title={section.title} body={section.body} />;

    case "reflection":
      return (
        <ReflectionSection
          classSlug={classSlug}
          prompt={section.prompt}
          placeholders={section.placeholders}
        />
      );

    case "course-review":
      return <CourseReview />;
  }
}

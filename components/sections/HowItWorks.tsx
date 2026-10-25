import { Section, SectionHeading } from "@/components/ui/Section";
import { HOW_STEPS } from "@/lib/data";

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="paper" labelledBy="how-title">
      <SectionHeading
        id="how-title"
        title="From first look to a routine, in five steps."
        intro="The flow is the same whether you start on your phone or at a retail Skin Station."
      />
      <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {HOW_STEPS.map(({ title, body, icon: Icon }, i) => (
          <li key={title} className="relative">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-plum text-white">
                <Icon size={20} aria-hidden="true" />
              </span>
              {i < HOW_STEPS.length - 1 && (
                <span aria-hidden="true" className="hidden h-px flex-1 bg-plum/20 lg:block" />
              )}
            </div>
            <p className="mt-5 text-sm font-medium text-rose-700">Step {i + 1}</p>
            <h3 className="mt-1 font-display text-xl font-normal leading-snug text-ink">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

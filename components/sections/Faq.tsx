import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FAQS } from "@/lib/data";

export function Faq() {
  return (
    <Section id="faq" tone="white" labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <SectionHeading id="faq-title" title="Questions, answered plainly." />
        <div className="divide-y divide-line border-y border-line">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex min-h-[4rem] cursor-pointer list-none items-center justify-between gap-6 rounded py-4 font-display text-xl font-normal text-ink">
                {f.q}
                <ChevronDown
                  size={20}
                  className="shrink-0 text-plum transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-slate">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

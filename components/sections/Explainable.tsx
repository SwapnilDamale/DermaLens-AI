import { Check, Info, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FILTER_FUNNEL, MATCH_ROWS, STATED_PREFERENCES } from "@/lib/data";

export function Explainable() {
  return (
    <Section id="explainable" tone="white" labelledBy="explain-title">
      <SectionHeading
        id="explain-title"
        title="Why this product? Here is the full answer."
        intro="Each recommendation lists how it lines up with the goals and limits you stated, and flags anything worth knowing before you buy."
      />

      {/* Constraint-first pipeline */}
      <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4" aria-label="How a sample catalogue is narrowed">
        {FILTER_FUNNEL.map((f, i) => (
          <li key={f.label} className="bg-paper px-5 py-5">
            <p className="font-display text-3xl font-light text-plum">{f.count}</p>
            <p className="mt-1 text-sm text-slate">{f.label}</p>
            {i < FILTER_FUNNEL.length - 1 && <span className="sr-only">, then</span>}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-slate">Illustrative counts. Limits remove products first; only what remains is ranked.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="card self-start bg-blush p-6 sm:p-8">
          <h3 className="font-display text-2xl font-normal">What you told us</h3>
          <dl className="mt-5 space-y-5">
            {STATED_PREFERENCES.map((p) => (
              <div key={p.label}>
                <dt className="text-sm text-slate">{p.label}</dt>
                <dd className="mt-0.5 font-medium text-ink">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="card shadow-panel p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-2xl font-normal">Barrier Calm Serum</h3>
            <p className="text-sm text-slate">Sample explanation</p>
          </div>
          <ul className="mt-6 divide-y divide-line">
            {MATCH_ROWS.map((r) => (
              <li key={r.title} className="flex gap-4 py-4">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    r.status === "match" ? "bg-plum text-white" : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {r.status === "match" ? <Check size={14} aria-hidden="true" /> : <Info size={14} aria-hidden="true" />}
                  <span className="sr-only">{r.status === "match" ? "Matches" : "Note"}</span>
                </span>
                <div>
                  <p className="font-medium text-ink">{r.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-slate">{r.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center sm:text-left">
        <ButtonLink href="/recommendations" variant="secondary">
          Try the interactive recommendation demo <ArrowRight size={18} aria-hidden="true" />
        </ButtonLink>
      </div>
    </Section>
  );
}

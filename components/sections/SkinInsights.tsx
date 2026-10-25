import { Check, Info, TriangleAlert } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CAPTURE_QUALITY, INSIGHT_FEATURES } from "@/lib/data";

const confidenceStyle = {
  High: "text-plum bg-plum-50",
  Medium: "text-slate bg-blush",
  Low: "text-rose-700 bg-rose-50",
} as const;

export function SkinInsights() {
  return (
    <Section id="skin-insights" tone="blush" labelledBy="insights-title">
      <SectionHeading
        id="insights-title"
        title="Skin insights that describe what is visible, and how sure we are."
        intro="Each indicator shows how prominent a visible feature looks, plus a confidence note. Weak captures are flagged rather than hidden."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="card shadow-panel p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-2xl font-normal">Sample profile</h3>
            <span className="badge-demo">
              <Info size={13} aria-hidden="true" /> Illustrative demo data
            </span>
          </div>
          <ul className="mt-6 divide-y divide-line">
            {INSIGHT_FEATURES.map((f) => (
              <li key={f.label} className="grid gap-3 py-5 sm:grid-cols-[1fr_1.1fr_9.5rem] sm:items-center sm:gap-6">
                <div>
                  <p className="font-medium text-ink">{f.label}</p>
                  <p className="text-sm text-slate">{f.area}</p>
                </div>
                <div>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium text-ink">{f.level}</span>
                    <span className="text-slate">{f.value} / 100 sample</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-plum-100" aria-hidden="true">
                    <div className="h-full rounded-full bg-plum" style={{ width: `${f.value}%` }} />
                  </div>
                </div>
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${confidenceStyle[f.confidence]}`}>
                  {f.confidence} confidence
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="card p-6 sm:p-8">
            <h3 className="font-display text-2xl font-normal">Capture quality</h3>
            <p className="mt-1 text-sm text-slate">Checked before any insight is shown.</p>
            <ul className="mt-5 space-y-4">
              {CAPTURE_QUALITY.map((q) => (
                <li key={q.label} className="flex items-center justify-between gap-4 text-[15px]">
                  <span className="text-slate">{q.label}</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                    {q.ok ? (
                      <Check size={16} className="text-plum" aria-hidden="true" />
                    ) : (
                      <TriangleAlert size={16} className="text-rose-700" aria-hidden="true" />
                    )}
                    {q.result}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-lg bg-blush px-4 py-3 text-sm leading-relaxed text-slate">
              Sharpness is fair, so a retake would raise confidence on tone variation.
            </p>
          </div>
          <p className="text-sm leading-relaxed text-slate">
            This panel shows made-up sample values to illustrate the interface. It is not a real analysis, and
            DermaLens AI never diagnoses skin conditions.
          </p>
          <div className="pt-2">
            <ButtonLink href="/assessment">
              Take the skin assessment →
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

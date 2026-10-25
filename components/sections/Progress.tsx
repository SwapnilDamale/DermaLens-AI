import { Ban, Info } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ADHERENCE, CAPTURES } from "@/lib/data";

const cellStyle = ["bg-plum-100", "bg-rose-200", "bg-plum"] as const;
const cellName = ["Skipped", "One routine", "Morning and evening"] as const;
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function Progress() {
  const total = ADHERENCE.flat().length * 2;
  const done = ADHERENCE.flat().reduce<number>((a, b) => a + b, 0);

  return (
    <Section id="progress" tone="blush" labelledBy="progress-title">
      <SectionHeading
        id="progress-title"
        title="Progress you can trust, because comparisons are fair."
        intro="Lighting, distance and angle all change how skin looks. DermaLens AI only compares captures taken in comparable conditions, and says so when it cannot."
      />
      <p className="badge-demo mt-6">
        <Info size={13} aria-hidden="true" /> Illustrative sample history
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6 sm:p-8">
          <h3 className="font-display text-2xl font-normal">Visible shine across captures</h3>
          <ul className="mt-6 space-y-6">
            {CAPTURES.map((c) => (
              <li key={c.date}>
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="font-medium text-ink">
                    {c.date}: {c.label}
                  </span>
                  <span className="text-slate">{c.shine !== null ? `${c.shine} / 100 sample` : "Not compared"}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-plum-100" aria-hidden="true">
                  {c.shine !== null ? (
                    <div className="h-full rounded-full bg-plum" style={{ width: `${c.shine}%` }} />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, #CFC2E4 0 6px, transparent 6px 12px)",
                      }}
                    />
                  )}
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-slate">
                  {!c.comparable && <Ban size={14} className="text-rose-700" aria-hidden="true" />}
                  {c.note}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6 sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-normal">Routine adherence</h3>
            <p className="text-sm text-slate">
              {done} of {total} routines
            </p>
          </div>
          <div className="mt-6 grid grid-cols-[auto_repeat(7,1fr)] items-center gap-x-2 gap-y-2" role="img" aria-label={`Four weeks of sample routine adherence: ${done} of ${total} routines completed`}>
            <span aria-hidden="true" />
            {DAYS.map((d, i) => (
              <span key={i} aria-hidden="true" className="text-center text-xs text-slate">
                {d}
              </span>
            ))}
            {ADHERENCE.map((week, w) => (
              <div key={w} className="contents">
                <span aria-hidden="true" className="pr-2 text-xs text-slate">
                  Wk {w + 1}
                </span>
                {week.map((v, d) => (
                  <span key={d} aria-hidden="true" className={`aspect-square rounded-md ${cellStyle[v]}`} />
                ))}
              </div>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate">
            {cellName.map((n, i) => (
              <li key={n} className="flex items-center gap-2">
                <span aria-hidden="true" className={`h-3 w-3 rounded-sm ${cellStyle[i]}`} />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/progress" variant="secondary">
          View full progress tracking →
        </ButtonLink>
        <ButtonLink href="/dashboard" variant="primary">
          Open your dashboard
        </ButtonLink>
      </div>
    </Section>
  );
}

"use client";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { CAPTURES, ADHERENCE, INSIGHT_FEATURES } from "@/lib/data";

function AdherenceChart() {
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const colours = ["bg-transparent", "bg-plum/30", "bg-plum"];

  return (
    <div>
      <div className="flex items-end gap-2 mb-6">
        {ADHERENCE.map((week, wi) => {
          const total = week.length * 2;
          const done = week.reduce((a, b) => a + b, 0);
          const pct = Math.round((done / total) * 100);
          return (
            <div key={wi} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs font-semibold text-plum">{pct}%</span>
              <div className="w-full rounded-t-md bg-plum-50 overflow-hidden" style={{ height: "96px" }}>
                <div className="w-full rounded-t-md bg-plum transition-all duration-700" style={{ height: `${pct}%` }} />
              </div>
              <span className="text-[11px] text-slate text-center leading-tight">{weeks[wi]}</span>
            </div>
          );
        })}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="pb-2 text-left text-slate font-normal w-14">Week</th>
              {days.map(d => <th key={d} className="pb-2 text-center text-slate font-normal">{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {ADHERENCE.map((week, wi) => (
              <tr key={wi}>
                <td className="py-1 text-slate">{wi + 1}</td>
                {week.map((val, di) => (
                  <td key={di} className="py-1 text-center">
                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium ${colours[val]} ${val > 0 ? "text-white" : "text-slate/30 bg-line"}`}>
                      {val === 2 ? "✓✓" : val === 1 ? "✓" : "–"}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex gap-4">
          {[["bg-plum", "Both routines"], ["bg-plum/30", "One routine"], ["bg-line", "Skipped"]].map(([cls, label]) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-slate">
              <span className={`h-3 w-3 rounded-sm ${cls}`} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkinTrendChart() {
  const comparable = CAPTURES.filter(c => c.comparable && c.shine !== null);
  const maxShine = 80;

  return (
    <div>
      {comparable.length < 2 ? (
        <p className="text-sm text-slate">Not enough comparable captures to show a trend.</p>
      ) : (
        <div className="flex items-end gap-6">
          {comparable.map((c, i) => {
            const pct = ((c.shine ?? 0) / maxShine) * 100;
            const isFirst = i === 0;
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-sm font-semibold text-plum">{c.shine}</span>
                <div className="w-14 rounded-t-md bg-plum-50 overflow-hidden" style={{ height: "80px" }}>
                  <div className="w-full rounded-t-md transition-all duration-700" style={{ height: `${pct}%`, background: isFirst ? "#D65370" : "#3D285E" }} />
                </div>
                <span className="text-xs text-slate text-center">{c.date}</span>
                <span className={`text-[10px] rounded-full px-2 py-0.5 ${isFirst ? "bg-rose-50 text-rose-700" : "bg-plum-50 text-plum"}`}>{c.label}</span>
              </div>
            );
          })}
          {comparable.length >= 2 && (
            <div className="flex-1 pl-4 text-sm text-slate">
              <p className="font-medium text-plum">
                {((comparable[comparable.length - 1].shine ?? 0) < (comparable[0].shine ?? 0))
                  ? `Visible shine reduced from ${comparable[0].shine} to ${comparable[comparable.length - 1].shine}`
                  : "No visible change in comparable captures"}
              </p>
              <p className="mt-1 text-xs">Comparable captures only — see note below.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProgressClient() {
  return (
    <div className="bg-paper pb-24 pt-8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 space-y-8">
        <p className="badge-demo inline-flex">All data shown is illustrative sample data</p>

        {/* Adherence */}
        <div className="card p-6">
          <h2 className="font-display text-2xl font-normal text-ink mb-1">Routine adherence</h2>
          <p className="text-sm text-slate mb-6">4-week sample. ✓✓ = both AM and PM completed.</p>
          <AdherenceChart />
        </div>

        {/* Capture history */}
        <div className="card p-6">
          <h2 className="font-display text-2xl font-normal text-ink mb-1">Assessment captures</h2>
          <p className="text-sm text-slate mb-6">Skin comparisons are only shown for captures taken in comparable conditions.</p>
          <div className="space-y-3">
            {CAPTURES.map((c, i) => (
              <div key={i} className="flex flex-wrap items-start gap-4 rounded-xl border border-line bg-white p-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-ink">{c.label}</span>
                    <span className="chip">{c.date}</span>
                    {c.comparable
                      ? <span className="inline-flex items-center gap-1 text-xs text-plum"><CheckCircle2 size={13} /> Comparable</span>
                      : <span className="inline-flex items-center gap-1 text-xs text-slate"><AlertCircle size={13} /> Not comparable</span>}
                  </div>
                  <p className="mt-1 text-sm text-slate">{c.note}</p>
                </div>
                {c.shine !== null && c.comparable ? (
                  <div className="text-right">
                    <p className="text-xs text-slate">Visible shine</p>
                    <p className="font-display text-2xl font-light text-plum">{c.shine}</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate/50 self-center">Value excluded</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visible shine trend */}
        <div className="card p-6">
          <h2 className="font-display text-2xl font-normal text-ink mb-1">Visible shine trend</h2>
          <p className="text-sm text-slate mb-6">Comparable captures only. Higher = more visible shine in sample data.</p>
          <SkinTrendChart />
        </div>

        {/* Skin features */}
        <div className="card p-6">
          <h2 className="font-display text-2xl font-normal text-ink mb-4">Latest skin profile snapshot</h2>
          <div className="space-y-4">
            {INSIGHT_FEATURES.map(f => (
              <div key={f.label}>
                <div className="flex justify-between text-sm mb-1">
                  <div>
                    <span className="font-medium text-ink">{f.label}</span>
                    <span className="ml-2 text-slate text-xs">{f.area}</span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${f.confidence === "High" ? "bg-plum-50 text-plum" : f.confidence === "Medium" ? "bg-rose-50 text-rose-700" : "bg-line text-slate"}`}>
                    {f.confidence} confidence
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-line overflow-hidden">
                    <div className="h-full rounded-full bg-plum" style={{ width: `${f.value}%` }} />
                  </div>
                  <span className="text-sm font-medium text-plum w-8 text-right">{f.value}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="badge-demo mt-6 inline-flex">Illustrative demo data — not actual analysis</p>
        </div>

        <div className="rounded-xl border border-line bg-white p-5 text-sm text-slate leading-relaxed">
          <strong className="text-ink">Comparable captures explained: </strong>
          Lighting, distance and angle change how skin looks. DermaLens AI only compares
          captures taken in similar conditions so you are not misled by environmental differences.
          If conditions differ, the capture is still stored but excluded from trend comparisons.
        </div>

        <div className="flex gap-3">
          <Link href="/assessment" className="inline-flex h-11 items-center rounded-full bg-plum px-6 text-sm font-medium text-white hover:bg-plum-800">
            Start a new assessment
          </Link>
          <Link href="/routines" className="inline-flex h-11 items-center rounded-full border border-plum/20 px-6 text-sm font-medium text-plum hover:border-plum hover:bg-plum-50">
            View routines
          </Link>
        </div>
      </div>
    </div>
  );
}

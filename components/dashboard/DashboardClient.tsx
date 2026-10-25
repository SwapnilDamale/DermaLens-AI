"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle2, Circle, RotateCcw, X, Plus, ArrowRight, Activity, Sun, Moon } from "lucide-react";
import { ALL_PRODUCTS } from "@/lib/products";
import { ROUTINE, INSIGHT_FEATURES, CAPTURES, ADHERENCE } from "@/lib/data";
import { useRoutineState } from "@/lib/routine";
import { rankProducts } from "@/lib/recommendations";

function buildStepId(time: string, index: number) {
  return `${time}-${index}`;
}

function getProduct(id: string) {
  return ALL_PRODUCTS.find(p => p.id === id);
}

type RoutinePanelProps = { time: "morning" | "evening" };
function RoutinePanel({ time }: RoutinePanelProps) {
  const routine = ROUTINE[time];
  const steps = routine.steps;
  const stepIds = steps.map((_, i) => buildStepId(time, i));
  const { completed, removed, toggle, removeStep, restoreStep, reset, doneCount, total, pct } = useRoutineState(stepIds);

  return (
    <div className="card overflow-hidden">
      <div className={`flex items-center justify-between px-6 py-4 ${time === "morning" ? "bg-plum-50" : "bg-plum-900"}`}>
        <div className="flex items-center gap-3">
          {time === "morning" ? <Sun size={18} className="text-plum" /> : <Moon size={18} className="text-white" />}
          <h3 className={`font-display text-lg font-normal ${time === "morning" ? "text-ink" : "text-white"}`}>
            {time === "morning" ? "Morning routine" : "Evening routine"}
          </h3>
        </div>
        <button type="button" onClick={reset} className={`flex items-center gap-1.5 text-xs font-medium ${time === "morning" ? "text-slate hover:text-rose" : "text-plum-200 hover:text-white"}`}>
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate">{doneCount} of {total} steps done</span>
          <span className="font-medium text-plum">{pct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
          <div className="h-full rounded-full bg-plum transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ul className="divide-y divide-line px-2 pb-4">
        {steps.map((step, i) => {
          const id = buildStepId(time, i);
          const isRemoved = removed.includes(id);
          const isDone = !!completed[id];
          const product = getProduct(step.productId);
          if (isRemoved) return null;
          return (
            <li key={id} className="flex items-start gap-3 px-4 py-4">
              <button type="button" onClick={() => toggle(id)} aria-label={isDone ? "Mark incomplete" : "Mark complete"} className="mt-0.5 shrink-0 text-plum">
                {isDone ? <CheckCircle2 size={22} fill="currentColor" fillOpacity={0.15} /> : <Circle size={22} />}
              </button>
              {product && (
                <div className="relative hidden sm:block h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-line">
                  <Image
                    src={`/products/${product.kind}.jpg`}
                    alt={product.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-wider ${isDone ? "text-slate/50" : "text-rose"}`}>{step.role}</p>
                <p className={`font-medium leading-snug ${isDone ? "text-slate/50 line-through" : "text-ink"}`}>{product?.name ?? step.productId}</p>
                <p className="mt-0.5 text-xs text-slate">{step.why}</p>
              </div>
              <button type="button" onClick={() => removeStep(id)} aria-label="Remove step" className="shrink-0 text-slate/40 hover:text-rose mt-1">
                <X size={15} />
              </button>
            </li>
          );
        })}
      </ul>

      {removed.length > 0 && (
        <div className="border-t border-line px-6 pb-4 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate mb-2">Removed steps</p>
          {removed.filter(id => id.startsWith(time)).map(id => {
            const idx = parseInt(id.split("-")[1]);
            const step = steps[idx];
            const product = step ? getProduct(step.productId) : null;
            return (
              <button key={id} type="button" onClick={() => restoreStep(id)} className="flex w-full items-center gap-2 rounded-lg border border-dashed border-line px-3 py-2 text-sm text-slate hover:border-plum hover:text-plum mb-1">
                <Plus size={14} /> Restore: {product?.name ?? step?.productId}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProgressSection() {
  const weeks = ["Wk 1", "Wk 2", "Wk 3", "Wk 4"];
  const weeklyPct = ADHERENCE.map(week => {
    const total = week.length * 2;
    const done = week.reduce((a, b) => a + b, 0);
    return Math.round((done / total) * 100);
  });

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={18} className="text-plum" />
        <h3 className="font-display text-lg font-normal text-ink">Routine adherence</h3>
        <span className="badge-demo ml-auto text-[11px]">Sample data</span>
      </div>
      {/* Bar chart */}
      <div className="flex items-end gap-3 h-32 mt-2">
        {weeklyPct.map((pct, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs font-medium text-plum">{pct}%</span>
            <div className="w-full rounded-t-md bg-plum-50 overflow-hidden" style={{ height: "80px" }}>
              <div className="w-full rounded-t-md bg-plum transition-all duration-700" style={{ height: `${pct}%` }} />
            </div>
            <span className="text-xs text-slate">{weeks[i]}</span>
          </div>
        ))}
      </div>
      {/* Capture history */}
      <div className="mt-6 border-t border-line pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate mb-3">Assessment history</p>
        <ul className="space-y-2">
          {CAPTURES.map((c, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg border border-line bg-paper px-4 py-3 text-sm">
              <div>
                <span className="font-medium text-ink">{c.label}</span>
                <span className="ml-2 text-slate">{c.date}</span>
              </div>
              <div className="flex items-center gap-2">
                {c.shine !== null ? (
                  <span className="chip text-[11px]">Shine: {c.shine}</span>
                ) : (
                  <span className="text-xs text-slate/60">Not comparable</span>
                )}
                {c.comparable ? (
                  <span className="text-xs text-plum">✓ Comparable</span>
                ) : (
                  <span className="text-xs text-slate/50">⚠ Conditions differ</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SkinProfileCard() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-normal text-ink">Skin profile</h3>
        <span className="badge-demo text-[11px]">Illustrative demo</span>
      </div>
      <div className="space-y-3">
        {INSIGHT_FEATURES.map(f => (
          <div key={f.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-ink">{f.label}</span>
              <span className={`font-medium ${f.confidence === "High" ? "text-plum" : f.confidence === "Medium" ? "text-rose" : "text-slate"}`}>{f.level}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-line overflow-hidden">
              <div className="h-full rounded-full bg-plum" style={{ width: `${f.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <Link href="/assessment" className="mt-5 flex items-center gap-1.5 text-sm font-medium text-plum hover:underline">
        Retake assessment <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function RecommendedPreview() {
  const { ranked } = rankProducts(ALL_PRODUCTS, {
    goals: ["visible-dryness", "visible-shine"],
    maxBudget: 40,
    brands: [],
    excludeIngredients: [],
    fragranceFreeOnly: true,
    veganOnly: false,
    crueltyFreeOnly: false,
  });
  const top = ranked.slice(0, 3);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-normal text-ink">Recommended for you</h3>
        <Link href="/recommendations" className="text-sm font-medium text-plum hover:underline">See all →</Link>
      </div>
      <ul className="space-y-3">
        {top.map(r => (
          <li key={r.product.id} className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-line">
              <Image
                src={`/products/${r.product.kind}.jpg`}
                alt={r.product.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink truncate">{r.product.name}</p>
              <p className="text-xs text-slate">{r.product.brand} · ${r.product.price}</p>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-xs font-bold text-plum">{r.score}</span>
              <p className="text-[10px] text-slate">score</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate/60">Based on illustrative demo preferences</p>
    </div>
  );
}

export default function DashboardClient() {
  return (
    <div className="bg-paper pb-24 pt-8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="badge-demo">Demo dashboard — sample data throughout</p>
            <h1 className="h-display mt-3 text-4xl sm:text-5xl">Your skin dashboard</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/assessment" className="inline-flex h-11 items-center rounded-full bg-plum px-6 text-sm font-medium text-white hover:bg-plum-800">
              Start assessment
            </Link>
            <Link href="/products" className="inline-flex h-11 items-center rounded-full border border-plum/20 px-6 text-sm font-medium text-plum hover:border-plum hover:bg-plum-50">
              Browse products
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6">
            <SkinProfileCard />
            <RecommendedPreview />
          </div>

          {/* Centre + right: routines */}
          <div className="space-y-6 lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2">
              <RoutinePanel time="morning" />
              <RoutinePanel time="evening" />
            </div>
            <ProgressSection />
          </div>
        </div>
      </div>
    </div>
  );
}

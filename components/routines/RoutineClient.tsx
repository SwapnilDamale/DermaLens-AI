"use client";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Circle, RotateCcw, X, Plus, Sun, Moon } from "lucide-react";
import { ALL_PRODUCTS } from "@/lib/products";
import { ROUTINE } from "@/lib/data";
import { useRoutineState } from "@/lib/routine";

function buildStepId(time: string, index: number) { return `${time}-${index}`; }
function getProduct(id: string) { return ALL_PRODUCTS.find(p => p.id === id); }

function FullRoutinePanel({ time }: { time: "morning" | "evening" }) {
  const routine = ROUTINE[time];
  const steps = routine.steps;
  const stepIds = steps.map((_, i) => buildStepId(time, i));
  const { completed, removed, toggle, removeStep, restoreStep, reset, doneCount, total, pct } = useRoutineState(stepIds);
  const isDark = time === "evening";

  return (
    <div className="card overflow-hidden">
      <div className={`px-6 py-5 ${isDark ? "bg-plum-900" : "bg-blush"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? <Moon size={20} className="text-plum-200" /> : <Sun size={20} className="text-plum" />}
            <div>
              <h2 className={`font-display text-xl font-normal ${isDark ? "text-white" : "text-ink"}`}>
                {time === "morning" ? "Morning routine" : "Evening routine"}
              </h2>
              <p className={`text-sm ${isDark ? "text-plum-200" : "text-slate"}`}>{routine.summary}</p>
            </div>
          </div>
          <button type="button" onClick={reset} className={`flex items-center gap-1.5 text-sm font-medium ${isDark ? "text-plum-200 hover:text-white" : "text-slate hover:text-rose"}`}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className={isDark ? "text-plum-200" : "text-slate"}>{doneCount} of {total} complete</span>
            <span className={`font-semibold ${isDark ? "text-white" : "text-plum"}`}>{pct}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${isDark ? "bg-rose" : "bg-plum"}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="divide-y divide-line">
        {steps.map((step, i) => {
          const id = buildStepId(time, i);
          if (removed.includes(id)) return null;
          const isDone = !!completed[id];
          const product = getProduct(step.productId);
          return (
            <div key={id} className={`flex items-start gap-4 p-5 transition-colors ${isDone ? "bg-paper/60" : "bg-white"}`}>
              <button type="button" onClick={() => toggle(id)} aria-label={isDone ? "Mark incomplete" : "Mark complete"} className="mt-0.5 shrink-0 text-plum transition-transform active:scale-95">
                {isDone ? <CheckCircle2 size={24} /> : <Circle size={24} className="text-line" />}
              </button>
              {product && (
                <div className="relative hidden sm:block h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line">
                  <Image
                    src={`/products/${product.kind}.jpg`}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${isDone ? "text-slate/40" : "text-rose"}`}>{step.role}</p>
                <p className={`font-medium ${isDone ? "text-slate/50 line-through" : "text-ink"}`}>{product?.name ?? step.productId}</p>
                {product && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {product.keyIngredients.slice(0, 2).map(ing => (
                      <span key={ing} className="chip text-[11px]">{ing}</span>
                    ))}
                    {product.fragranceFree && <span className="chip text-[11px] !bg-plum-50 !text-plum !border-plum/20">FF</span>}
                  </div>
                )}
                <p className="mt-1.5 text-sm text-slate">{step.why}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                {product && (
                  <Link href={`/products/${product.id}`} className="text-xs font-medium text-plum hover:underline">
                    Details →
                  </Link>
                )}
                <button type="button" onClick={() => removeStep(id)} aria-label={`Remove ${step.role} step`} className="text-slate/30 hover:text-rose">
                  <X size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {removed.filter(id => id.startsWith(time)).length > 0 && (
        <div className="border-t border-dashed border-line bg-paper px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate mb-2">Removed steps</p>
          <div className="space-y-1">
            {removed.filter(id => id.startsWith(time)).map(id => {
              const idx = parseInt(id.split("-")[1]);
              const step = steps[idx];
              const product = step ? getProduct(step.productId) : null;
              return (
                <button key={id} type="button" onClick={() => restoreStep(id)}
                  className="flex w-full items-center gap-2 rounded-lg border border-dashed border-plum/20 px-3 py-2 text-sm text-plum hover:bg-plum-50">
                  <Plus size={14} /> Restore: {product?.name ?? step?.role}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RoutineClient() {
  return (
    <div className="bg-paper pb-24 pt-8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <FullRoutinePanel time="morning" />
          <FullRoutinePanel time="evening" />
        </div>
        <div className="mt-8 rounded-xl border border-line bg-white p-6">
          <h2 className="font-display text-xl font-normal text-ink">About these routines</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            These are illustrative sample routines based on demo skin profile data. In a live version,
            your routine would be built from your actual assessment results and preferences.
            Always patch-test new products and introduce them one at a time.
          </p>
          <p className="badge-demo mt-4 inline-flex">Sample data — not personalised medical advice</p>
        </div>
      </div>
    </div>
  );
}

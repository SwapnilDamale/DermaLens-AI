"use client";
import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Circle, RotateCcw, ChevronRight, Wifi, ShieldCheck, Sparkles } from "lucide-react";
import { SKIN_GOALS, ALL_PRODUCTS, type GoalKey } from "@/lib/products";
import { SIMULATED_FEATURES } from "@/lib/assessment";
import { rankProducts } from "@/lib/recommendations";

type KioskStep = "welcome" | "goals" | "scanning" | "profile" | "recommendations" | "done";

const BUDGET_OPTIONS = [
  { label: "Under $25", value: 25 },
  { label: "$25 – $40", value: 40 },
  { label: "$40 – $60", value: 60 },
  { label: "No limit", value: 0 },
];

export default function KioskClient() {
  const [step, setStep] = useState<KioskStep>("welcome");
  const [selectedGoals, setSelectedGoals] = useState<GoalKey[]>([]);
  const [budget, setBudget] = useState<number>(40);
  const [scanPct, setScanPct] = useState(0);
  const [scanDone, setScanDone] = useState(false);

  const reset = () => {
    setStep("welcome");
    setSelectedGoals([]);
    setBudget(40);
    setScanPct(0);
    setScanDone(false);
  };

  const toggleGoal = (key: GoalKey) =>
    setSelectedGoals(prev => prev.includes(key) ? prev.filter(g => g !== key) : [...prev, key]);

  const startScan = () => {
    setStep("scanning");
    setScanPct(0);
    setScanDone(false);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 12) + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setScanDone(true);
        setTimeout(() => setStep("profile"), 800);
      }
      setScanPct(p);
    }, 180);
  };

  const { ranked } = rankProducts(ALL_PRODUCTS, {
    goals: selectedGoals,
    maxBudget: budget,
    brands: [],
    excludeIngredients: [],
    fragranceFreeOnly: false,
    veganOnly: false,
    crueltyFreeOnly: false,
  });
  const topRecs = ranked.slice(0, 4);

  return (
    <div className="min-h-screen bg-plum-900 flex items-start justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">

        {/* Kiosk chrome */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi size={14} className="text-plum-200" />
            <span className="text-xs text-plum-200">DermaLens Skin Station</span>
            <span className="badge-demo text-[11px]">Demo mode</span>
          </div>
          <button type="button" onClick={reset} className="flex items-center gap-1.5 text-xs font-medium text-plum-200 hover:text-white">
            <RotateCcw size={12} /> Reset kiosk
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow-panel overflow-hidden min-h-[600px] flex flex-col">

          {/* ── WELCOME ── */}
          {step === "welcome" && (
            <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-plum-50 mb-6">
                <Sparkles size={32} className="text-plum" />
              </div>
              <h1 className="font-display text-4xl font-light text-ink">Welcome to the<br/>DermaLens Skin Station</h1>
              <p className="mt-4 text-lg text-slate max-w-md">
                Discover skincare products matched to your visible skin characteristics and preferences — right here in-store.
              </p>

              <div className="mt-8 rounded-xl border border-plum/20 bg-plum-50 p-5 text-left max-w-md">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-plum mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-ink">Privacy notice</p>
                    <ul className="mt-2 text-sm text-slate space-y-1">
                      <li>• This demo uses no camera or sensors</li>
                      <li>• No personal data is collected or stored</li>
                      <li>• All results shown are illustrative sample data</li>
                      <li>• Recommendations are not medical advice</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep("goals")}
                className="mt-10 inline-flex h-16 items-center gap-3 rounded-2xl bg-plum px-10 text-xl font-medium text-white transition-colors hover:bg-plum-800 active:scale-95"
              >
                Start <ChevronRight size={22} />
              </button>
            </div>
          )}

          {/* ── GOALS ── */}
          {step === "goals" && (
            <div className="flex flex-1 flex-col p-8">
              <p className="text-sm font-medium uppercase tracking-wider text-rose mb-2">Step 1 of 2</p>
              <h2 className="font-display text-3xl font-light text-ink">What would you like to address?</h2>
              <p className="mt-2 text-slate mb-6">Select your skin goals and budget.</p>

              <div className="grid gap-3 sm:grid-cols-2 mb-8">
                {SKIN_GOALS.map(goal => {
                  const sel = selectedGoals.includes(goal.key);
                  return (
                    <button
                      key={goal.key}
                      type="button"
                      aria-pressed={sel}
                      onClick={() => toggleGoal(goal.key)}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors text-base ${sel ? "border-plum bg-plum-50" : "border-line bg-white hover:border-plum/30"}`}
                    >
                      {sel ? <CheckCircle2 size={22} className="text-plum shrink-0" /> : <Circle size={22} className="text-line shrink-0" />}
                      <span className={`font-medium ${sel ? "text-plum" : "text-ink"}`}>{goal.label}</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-sm font-semibold uppercase tracking-wider text-slate mb-3">Budget per product</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-8">
                {BUDGET_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={budget === opt.value}
                    onClick={() => setBudget(opt.value)}
                    className={`rounded-xl border p-4 text-sm font-medium transition-colors ${budget === opt.value ? "border-plum bg-plum text-white" : "border-line bg-white text-ink hover:border-plum"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="mt-auto flex gap-4">
                <button type="button" onClick={() => setStep("welcome")} className="h-14 rounded-xl border border-line px-6 text-base font-medium text-slate hover:border-plum hover:text-plum">
                  Back
                </button>
                <button
                  type="button"
                  onClick={startScan}
                  className="flex-1 h-14 rounded-xl bg-plum text-lg font-medium text-white hover:bg-plum-800 active:scale-[0.98] transition-transform"
                >
                  Simulate skin scan →
                </button>
              </div>
            </div>
          )}

          {/* ── SCANNING ── */}
          {step === "scanning" && (
            <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
              <div className="relative mb-8">
                <div className="h-40 w-40 rounded-full border-4 border-plum-50 flex items-center justify-center">
                  <div
                    className="h-40 w-40 rounded-full absolute"
                    style={{
                      background: `conic-gradient(#3D285E ${scanPct * 3.6}deg, transparent 0deg)`,
                      transition: "background 0.2s",
                    }}
                  />
                  <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center z-10 relative">
                    <span className="font-display text-4xl font-light text-plum">{scanPct}%</span>
                  </div>
                </div>
              </div>
              <h2 className="font-display text-3xl font-light text-ink">
                {scanDone ? "Scan complete" : "Simulating scan…"}
              </h2>
              <p className="mt-3 text-slate max-w-sm">
                {scanDone
                  ? "Processing your illustrative skin profile."
                  : "Analysing lighting, skin zones and visible characteristics. Demo mode — no camera is used."}
              </p>
              <p className="badge-demo mt-6">Demo only — no actual scan occurs</p>
            </div>
          )}

          {/* ── PROFILE ── */}
          {step === "profile" && (
            <div className="flex flex-1 flex-col p-8">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium uppercase tracking-wider text-rose">Skin profile</p>
                <span className="badge-demo text-[11px]">Illustrative demo data</span>
              </div>
              <h2 className="font-display text-3xl font-light text-ink mb-6">Your sample skin profile</h2>

              <div className="space-y-4 flex-1">
                {SIMULATED_FEATURES.map(f => (
                  <div key={f.label} className="rounded-xl border border-line bg-paper p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-medium text-ink">{f.label}</span>
                        <span className="ml-2 text-xs text-slate">{f.area}</span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${f.confidence === "High" ? "bg-plum-50 text-plum" : "bg-rose-50 text-rose-700"}`}>
                        {f.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 rounded-full bg-line overflow-hidden">
                        <div className="h-full rounded-full bg-plum" style={{ width: `${f.value}%` }} />
                      </div>
                      <span className="text-sm font-bold text-plum w-8 text-right">{f.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-rose/20 bg-rose-50 p-4 text-sm text-slate">
                These are <strong className="text-rose-700">illustrative sample values</strong> for demonstration purposes only.
                Not a medical assessment. For skin concerns, consult a dermatologist.
              </div>

              <div className="mt-6 flex gap-4">
                <button type="button" onClick={() => setStep("goals")} className="h-14 rounded-xl border border-line px-6 text-base font-medium text-slate hover:border-plum hover:text-plum">
                  Back
                </button>
                <button type="button" onClick={() => setStep("recommendations")} className="flex-1 h-14 rounded-xl bg-plum text-lg font-medium text-white hover:bg-plum-800">
                  See product recommendations →
                </button>
              </div>
            </div>
          )}

          {/* ── RECOMMENDATIONS ── */}
          {step === "recommendations" && (
            <div className="flex flex-1 flex-col p-8">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium uppercase tracking-wider text-rose">Recommendations</p>
                <span className="badge-demo text-[11px]">Demo store inventory</span>
              </div>
              <h2 className="font-display text-3xl font-light text-ink mb-2">Products that fit your profile</h2>
              <p className="text-sm text-slate mb-6">
                {topRecs.length} product{topRecs.length !== 1 ? "s" : ""} match your goals
                {budget > 0 ? ` within $${budget}` : ""}.
              </p>

              {topRecs.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-center">
                  <div>
                    <p className="font-display text-2xl font-light text-ink">No matches</p>
                    <p className="mt-2 text-slate">Try adjusting your budget or goals.</p>
                    <button type="button" onClick={() => setStep("goals")} className="mt-6 h-12 rounded-xl bg-plum px-8 text-base font-medium text-white">
                      Adjust preferences
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 space-y-4">
                  {topRecs.map((r, i) => (
                    <div key={r.product.id} className="flex items-start gap-4 rounded-xl border border-line bg-white p-5">
                      <div className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line">
                        <Image
                          src={`/products/${r.product.kind}.jpg`}
                          alt={r.product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-rose">{r.product.brand}</p>
                            <p className="font-display text-lg font-normal text-ink leading-snug">{r.product.name}</p>
                            <p className="text-sm text-slate">{r.product.category}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-display text-xl font-light text-plum">${r.product.price}</p>
                            <p className="text-xs text-slate">Match: {r.score}</p>
                          </div>
                        </div>
                        {r.matchReasons[0] && (
                          <p className="mt-2 text-sm text-slate">
                            <span className="text-plum">✓</span> {r.matchReasons[0]}
                          </p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {r.product.fragranceFree && <span className="chip text-[11px]">Fragrance-free</span>}
                          {r.product.vegan && <span className="chip text-[11px]">Vegan</span>}
                          {r.product.keyIngredients.slice(0, 2).map(ing => (
                            <span key={ing} className="chip text-[11px]">{ing}</span>
                          ))}
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-plum text-white text-sm font-bold">
                        {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex gap-4">
                <button type="button" onClick={() => setStep("profile")} className="h-14 rounded-xl border border-line px-6 text-base font-medium text-slate hover:border-plum hover:text-plum">
                  Back
                </button>
                <button type="button" onClick={() => setStep("done")} className="flex-1 h-14 rounded-xl bg-plum text-lg font-medium text-white hover:bg-plum-800">
                  Finish session →
                </button>
              </div>
            </div>
          )}

          {/* ── DONE ── */}
          {step === "done" && (
            <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-plum mb-6">
                <CheckCircle2 size={36} className="text-white" />
              </div>
              <h2 className="font-display text-3xl font-light text-ink">Thank you!</h2>
              <p className="mt-3 text-lg text-slate max-w-md">
                Your personalised product list is ready. Speak with a store advisor or visit the full DermaLens AI platform to explore further.
              </p>
              <p className="badge-demo mt-6">Demo session complete — no data was stored</p>
              <button
                type="button"
                onClick={reset}
                className="mt-10 inline-flex h-16 items-center gap-3 rounded-2xl bg-plum px-10 text-xl font-medium text-white transition-colors hover:bg-plum-800"
              >
                <RotateCcw size={20} /> Start new session
              </button>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-plum-200">
          DermaLens AI Skin Station · Demo mode · No camera or data collection
        </p>
      </div>
    </div>
  );
}

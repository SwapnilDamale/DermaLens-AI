"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  AlertCircle,
  Upload,
  X,
  RotateCcw,
  ChevronRight,
  Eye,
  Shield,
  Sparkles,
} from "lucide-react";
import {
  STEPS,
  CHARACTERISTICS,
  SIMULATED_FEATURES,
  SIMULATED_QUALITY,
  DEFAULT_ANSWERS,
  type AssessmentAnswers,
  type AssessmentStep,
  type SelfReportedCharacteristic,
} from "@/lib/assessment";
import { SKIN_GOALS, PRODUCT_BRANDS, type GoalKey } from "@/lib/products";

// ─────────────────────────────────────────────────────────────────────────────
// Progress indicator
// ─────────────────────────────────────────────────────────────────────────────
const QUESTIONNAIRE_STEPS: AssessmentStep[] = [
  "goals",
  "characteristics",
  "budget",
  "brands",
  "ingredients",
  "fragrance",
  "existing",
  "image",
  "review",
];

function ProgressBar({ step }: { step: AssessmentStep }) {
  if (step === "intro" || step === "results") return null;
  const idx = QUESTIONNAIRE_STEPS.indexOf(step);
  const pct = idx < 0 ? 100 : Math.round(((idx + 1) / QUESTIONNAIRE_STEPS.length) * 100);
  const stepInfo = STEPS.find((s) => s.key === step);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-plum">{stepInfo?.title ?? "Assessment"}</span>
        <span className="text-slate">Step {Math.max(1, idx + 1)} of {QUESTIONNAIRE_STEPS.length}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-plum transition-all duration-500"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Assessment progress: ${pct}%`}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step: Intro
// ─────────────────────────────────────────────────────────────────────────────
function StepIntro({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="badge-demo inline-flex">Non-diagnostic — no medical claims</p>
        <h2 className="mt-4 font-display text-3xl font-light text-ink sm:text-4xl">
          Your personalised skin assessment
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate">
          This short questionnaire helps DermaLens AI understand your skincare goals, budget
          and preferences so it can suggest compatible products and explain why each one fits.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            Icon: Shield,
            title: "Non-diagnostic",
            body: "DermaLens AI describes visible characteristics. It does not diagnose skin conditions or replace a dermatologist.",
          },
          {
            Icon: Eye,
            title: "Optional image",
            body: "You can skip the photo entirely and answer a questionnaire only. No image is required.",
          },
          {
            Icon: Sparkles,
            title: "Your data stays here",
            body: "This is a local demo. Nothing you enter is sent to any server or stored beyond your browser session.",
          },
        ].map(({ Icon, title, body }) => (
          <div key={title} className="rounded-xl border border-line bg-white p-5">
            <Icon className="text-plum" size={22} aria-hidden="true" />
            <p className="mt-3 font-medium text-ink">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate">{body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-rose/20 bg-rose-50 p-5 text-sm leading-relaxed text-ink">
        <strong className="font-semibold text-rose-700">Important:</strong> DermaLens AI is not
        a medical tool. If you have a persistent, painful, changing or bleeding skin concern,
        speak to a qualified healthcare professional.
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-plum px-8 text-[15px] font-medium text-white transition-colors hover:bg-plum-800"
        >
          Start questionnaire <ArrowRight size={18} aria-hidden="true" />
        </button>
        <Link
          href="/#how-it-works"
          className="inline-flex h-12 items-center justify-center rounded-full border border-plum/20 px-8 text-[15px] font-medium text-plum transition-colors hover:border-plum hover:bg-plum-50"
        >
          How it works first
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step: Goals
// ─────────────────────────────────────────────────────────────────────────────
function StepGoals({
  answers,
  onChange,
}: {
  answers: AssessmentAnswers;
  onChange: (a: Partial<AssessmentAnswers>) => void;
}) {
  const toggle = (key: GoalKey) => {
    const next = answers.goals.includes(key)
      ? answers.goals.filter((g) => g !== key)
      : [...answers.goals, key];
    onChange({ goals: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light text-ink">
          What would you like to address?
        </h2>
        <p className="mt-2 text-slate">Select all that apply. You can change these later.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {SKIN_GOALS.map((goal) => {
          const selected = answers.goals.includes(goal.key);
          return (
            <button
              key={goal.key}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(goal.key)}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                selected
                  ? "border-plum bg-plum-50"
                  : "border-line bg-white hover:border-plum/30 hover:bg-paper"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  selected
                    ? "border-plum bg-plum text-white"
                    : "border-line bg-white text-transparent"
                }`}
              >
                ✓
              </span>
              <span className={`text-sm font-medium ${selected ? "text-plum" : "text-ink"}`}>
                {goal.label}
              </span>
            </button>
          );
        })}
      </div>
      {answers.goals.length === 0 && (
        <p className="text-sm text-slate/60">
          Select at least one goal to get more relevant recommendations.
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step: Skin Characteristics
// ─────────────────────────────────────────────────────────────────────────────
function StepCharacteristics({
  answers,
  onChange,
}: {
  answers: AssessmentAnswers;
  onChange: (a: Partial<AssessmentAnswers>) => void;
}) {
  const toggle = (key: SelfReportedCharacteristic) => {
    const next = answers.characteristics.includes(key)
      ? answers.characteristics.filter((c) => c !== key)
      : [...answers.characteristics, key];
    onChange({ characteristics: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light text-ink">
          How does your skin feel day to day?
        </h2>
        <p className="mt-2 text-slate">
          Self-reported only — this is not a clinical assessment. Select all that describe your
          experience.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {CHARACTERISTICS.map((c) => {
          const selected = answers.characteristics.includes(c.key);
          return (
            <button
              key={c.key}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(c.key)}
              className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                selected
                  ? "border-plum bg-plum-50"
                  : "border-line bg-white hover:border-plum/30"
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  selected
                    ? "border-plum bg-plum text-white"
                    : "border-line bg-white text-transparent"
                }`}
              >
                ✓
              </span>
              <div>
                <p className={`text-sm font-medium ${selected ? "text-plum" : "text-ink"}`}>
                  {c.label}
                </p>
                <p className="mt-0.5 text-xs text-slate">{c.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step: Budget
// ─────────────────────────────────────────────────────────────────────────────
const BUDGET_OPTIONS = [
  { label: "No limit", value: 0 },
  { label: "Under $20", value: 19 },
  { label: "$20 – $35", value: 35 },
  { label: "$35 – $50", value: 50 },
  { label: "Over $50", value: 999 },
];

function StepBudget({
  answers,
  onChange,
}: {
  answers: AssessmentAnswers;
  onChange: (a: Partial<AssessmentAnswers>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light text-ink">
          What is your budget per product?
        </h2>
        <p className="mt-2 text-slate">
          This is applied as a hard limit — products above this price will not appear in your
          recommendations.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BUDGET_OPTIONS.map((opt) => {
          const selected = answers.maxBudget === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange({ maxBudget: opt.value })}
              className={`flex items-center justify-between rounded-xl border p-4 text-left transition-colors ${
                selected
                  ? "border-plum bg-plum-50"
                  : "border-line bg-white hover:border-plum/30"
              }`}
            >
              <span className={`font-medium ${selected ? "text-plum" : "text-ink"}`}>
                {opt.label}
              </span>
              {selected && (
                <CheckCircle2 size={18} className="text-plum" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step: Brand preferences
// ─────────────────────────────────────────────────────────────────────────────
function StepBrands({
  answers,
  onChange,
}: {
  answers: AssessmentAnswers;
  onChange: (a: Partial<AssessmentAnswers>) => void;
}) {
  const toggle = (brand: string) => {
    const next = answers.preferredBrands.includes(brand)
      ? answers.preferredBrands.filter((b) => b !== brand)
      : [...answers.preferredBrands, brand];
    onChange({ preferredBrands: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light text-ink">
          Any preferred brands?
        </h2>
        <p className="mt-2 text-slate">
          Leave empty to see products from all brands. Selecting brands will restrict recommendations
          to those only.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {PRODUCT_BRANDS.map((brand) => {
          const selected = answers.preferredBrands.includes(brand);
          return (
            <button
              key={brand}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(brand)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selected
                  ? "border-plum bg-plum text-white"
                  : "border-line bg-white text-ink hover:border-plum hover:text-plum"
              }`}
            >
              {brand}
            </button>
          );
        })}
      </div>
      {answers.preferredBrands.length === 0 && (
        <p className="text-sm text-slate/60">No brand preference — showing all brands.</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step: Ingredient exclusions
// ─────────────────────────────────────────────────────────────────────────────
const COMMON_EXCLUSIONS = [
  "Parfum / fragrance",
  "Essential oils",
  "Alcohol",
  "Retinol / retinoids",
  "Salicylic acid",
  "AHA / glycolic acid",
  "Parabens",
  "Sulphates",
];

function StepIngredients({
  answers,
  onChange,
}: {
  answers: AssessmentAnswers;
  onChange: (a: Partial<AssessmentAnswers>) => void;
}) {
  const [input, setInput] = useState("");

  const add = (term: string) => {
    const t = term.trim().toLowerCase();
    if (t && !answers.excludeIngredients.includes(t)) {
      onChange({ excludeIngredients: [...answers.excludeIngredients, t] });
    }
    setInput("");
  };

  const remove = (term: string) =>
    onChange({ excludeIngredients: answers.excludeIngredients.filter((x) => x !== term) });

  const toggleSuggestion = (s: string) => {
    const lower = s.toLowerCase();
    if (answers.excludeIngredients.includes(lower)) {
      remove(lower);
    } else {
      add(s);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light text-ink">
          Anything to exclude?
        </h2>
        <p className="mt-2 text-slate">
          Products containing these ingredients will not appear in your recommendations. This is a
          hard constraint.
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate">
          Common exclusions
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {COMMON_EXCLUSIONS.map((s) => {
            const active = answers.excludeIngredients.includes(s.toLowerCase());
            return (
              <button
                key={s}
                type="button"
                aria-pressed={active}
                onClick={() => toggleSuggestion(s)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-rose bg-rose text-white"
                    : "border-line bg-white text-slate hover:border-rose/50 hover:text-ink"
                }`}
              >
                {active && <span className="mr-1">✗</span>}
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate">
          Add your own
        </p>
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add(input);
              }
            }}
            placeholder="Type an ingredient and press Enter…"
            className="h-11 flex-1 rounded-full border border-line bg-white px-4 text-sm focus:border-plum focus:outline-none"
            aria-label="Add ingredient exclusion"
          />
          <button
            type="button"
            onClick={() => add(input)}
            className="h-11 rounded-full bg-plum px-5 text-sm font-medium text-white transition-colors hover:bg-plum-800"
          >
            Add
          </button>
        </div>
      </div>

      {answers.excludeIngredients.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate">
            Your exclusion list
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {answers.excludeIngredients.map((e) => (
              <span
                key={e}
                className="inline-flex items-center gap-1.5 rounded-full border border-rose/20 bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700"
              >
                {e}
                <button
                  type="button"
                  onClick={() => remove(e)}
                  aria-label={`Remove ${e} from exclusions`}
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step: Fragrance & preferences
// ─────────────────────────────────────────────────────────────────────────────
function StepFragrance({
  answers,
  onChange,
}: {
  answers: AssessmentAnswers;
  onChange: (a: Partial<AssessmentAnswers>) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-light text-ink">
          Fragrance and other preferences
        </h2>
        <p className="mt-2 text-slate">
          Selecting fragrance-free, vegan or cruelty-free will apply as hard constraints.
          Products that do not match will be excluded from your recommendations.
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            key: "fragranceFreeOnly" as const,
            label: "Fragrance-free only",
            description:
              "Exclude any product that contains added fragrance, parfum or essential oils as scent.",
          },
          {
            key: "veganOnly" as const,
            label: "Vegan only",
            description: "Exclude products containing animal-derived ingredients.",
          },
          {
            key: "crueltyFreeOnly" as const,
            label: "Cruelty-free only",
            description: "Exclude products tested on animals.",
          },
        ].map(({ key, label, description }) => {
          const value = answers[key];
          return (
            <label
              key={key}
              className="flex cursor-pointer items-start gap-4 rounded-xl border border-line bg-white p-4 transition-colors hover:border-plum/30 select-none"
            >
              <input
                type="checkbox"
                checked={value}
                onChange={() => onChange({ [key]: !value })}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                  value ? "bg-plum" : "bg-line"
                }`}
              >
                <span
                  className={`ml-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    value ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </span>
              <div>
                <p className="font-medium text-ink">{label}</p>
                <p className="mt-0.5 text-sm text-slate">{description}</p>
              </div>
            </label>
          );
        })}
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate">
          Routine preference
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {(
            [
              { value: "minimal", label: "Minimal", desc: "2–3 steps" },
              { value: "full", label: "Full routine", desc: "4–6 steps" },
              { value: "no-preference", label: "No preference", desc: "Show everything" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={answers.routinePreference === opt.value}
              onClick={() => onChange({ routinePreference: opt.value })}
              className={`rounded-xl border p-4 text-left transition-colors ${
                answers.routinePreference === opt.value
                  ? "border-plum bg-plum-50"
                  : "border-line bg-white hover:border-plum/30"
              }`}
            >
              <p className={`font-medium ${answers.routinePreference === opt.value ? "text-plum" : "text-ink"}`}>
                {opt.label}
              </p>
              <p className="mt-0.5 text-xs text-slate">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step: Existing products
// ─────────────────────────────────────────────────────────────────────────────
function StepExisting({
  answers,
  onChange,
}: {
  answers: AssessmentAnswers;
  onChange: (a: Partial<AssessmentAnswers>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light text-ink">
          What do you already use?
        </h2>
        <p className="mt-2 text-slate">
          Optional. Helps avoid suggesting products you already have. This is stored locally only.
        </p>
      </div>
      <textarea
        value={answers.existingProducts}
        onChange={(e) => onChange({ existingProducts: e.target.value })}
        rows={5}
        placeholder="e.g. CeraVe Moisturising Cream, La Roche-Posay SPF 50+, a niacinamide serum…"
        className="w-full rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-ink placeholder-slate/50 focus:border-plum focus:outline-none"
        aria-label="List your existing skincare products"
      />
      <p className="text-xs text-slate/60">
        Maximum 500 characters.{" "}
        <span className={answers.existingProducts.length > 500 ? "text-rose" : ""}>
          {answers.existingProducts.length}/500
        </span>
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step: Optional image capture
// ─────────────────────────────────────────────────────────────────────────────
type ImageState = "idle" | "previewing" | "checking" | "passed" | "failed";

function StepImage({
  answers,
  onChange,
}: {
  answers: AssessmentAnswers;
  onChange: (a: Partial<AssessmentAnswers>) => void;
}) {
  const [imageState, setImageState] = useState<ImageState>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please select a JPEG, PNG or WebP image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setImageState("previewing");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const runCheck = () => {
    setImageState("checking");
    // Simulated quality check — always passes after 1.5 s for the demo
    setTimeout(() => {
      setImageState("passed");
      onChange({ imageCaptured: true });
    }, 1500);
  };

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setImageState("idle");
    setError(null);
    onChange({ imageCaptured: false });
    if (fileRef.current) fileRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light text-ink">
          Optional: add a reference photo
        </h2>
        <p className="mt-2 text-slate">
          A front-facing photo in good, even daylight can provide additional visual context.
          This is entirely optional — skip this step if you prefer not to use the camera.
        </p>
      </div>

      {/* Privacy notice */}
      <div className="rounded-xl border border-plum/20 bg-plum-50 p-5 text-sm leading-relaxed text-ink">
        <p className="font-semibold text-plum">Your privacy</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-slate">
          <li>The image is processed in your browser only. It is never uploaded to any server.</li>
          <li>No facial data is stored, transmitted or used to train any model.</li>
          <li>The simulated results shown on the next screen are demo data, not actual analysis.</li>
          <li>Removing the image removes it from your browser session immediately.</li>
        </ul>
      </div>

      {/* Photo guidance */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Front view", desc: "Face the camera directly, eyes forward" },
          { label: "Even lighting", desc: "Natural daylight, no harsh shadows or flash" },
          { label: "40 cm distance", desc: "Far enough to fit your full face in frame" },
        ].map(({ label, desc }) => (
          <div key={label} className="rounded-xl border border-line bg-white p-4">
            <Camera className="text-plum" size={20} aria-hidden="true" />
            <p className="mt-2 font-medium text-ink">{label}</p>
            <p className="mt-0.5 text-xs text-slate">{desc}</p>
          </div>
        ))}
      </div>

      {/* Upload area or preview */}
      {imageState === "idle" && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-line bg-white p-10 text-center transition-colors hover:border-plum/50"
        >
          <Upload className="text-plum/40" size={36} aria-hidden="true" />
          <div>
            <p className="font-medium text-ink">Drag a photo here</p>
            <p className="mt-1 text-sm text-slate">JPEG, PNG or WebP · Max 10 MB</p>
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex h-11 items-center rounded-full bg-plum px-6 text-sm font-medium text-white transition-colors hover:bg-plum-800"
          >
            Browse files
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleInput}
            className="sr-only"
            aria-label="Upload a skin reference photo"
          />
          {error && (
            <p className="flex items-center gap-2 text-sm text-rose-700">
              <AlertCircle size={16} />
              {error}
            </p>
          )}
        </div>
      )}

      {(imageState === "previewing" || imageState === "checking") && previewUrl && (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl border border-line bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Your selected reference photo preview"
              className="max-h-72 w-full object-cover"
            />
            <button
              type="button"
              onClick={reset}
              aria-label="Remove image"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow hover:bg-rose hover:text-white"
            >
              <X size={15} />
            </button>
          </div>
          {imageState === "previewing" && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={runCheck}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-plum px-6 text-sm font-medium text-white transition-colors hover:bg-plum-800"
              >
                Run quality check
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-6 text-sm font-medium text-slate hover:border-plum hover:text-plum"
              >
                <RotateCcw size={15} />
                Replace
              </button>
            </div>
          )}
          {imageState === "checking" && (
            <div className="flex items-center gap-3 text-sm text-slate">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-plum border-t-transparent" />
              Checking image quality…
            </div>
          )}
        </div>
      )}

      {imageState === "passed" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-plum/20 bg-plum-50 p-4">
            <CheckCircle2 className="text-plum" size={22} aria-hidden="true" />
            <div>
              <p className="font-medium text-plum">Quality check passed</p>
              <p className="text-sm text-slate">Good lighting and face position detected.</p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="ml-auto text-sm font-medium text-rose hover:underline"
            >
              Remove
            </button>
          </div>

          {/* Simulated quality results */}
          <div className="rounded-xl border border-line bg-white overflow-hidden">
            <p className="border-b border-line px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate">
              Simulated quality check — demo data
            </p>
            <ul className="divide-y divide-line">
              {SIMULATED_QUALITY.map((q) => (
                <li key={q.label} className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm text-ink">{q.label}</span>
                  <span
                    className={`flex items-center gap-1.5 text-sm font-medium ${
                      q.ok ? "text-plum" : "text-slate"
                    }`}
                  >
                    {q.ok ? (
                      <CheckCircle2 size={15} aria-hidden="true" />
                    ) : (
                      <AlertCircle size={15} aria-hidden="true" />
                    )}
                    {q.result}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="text-sm text-slate">
        <strong>Skip this step</strong> — the questionnaire results are enough to generate
        personalised recommendations without a photo.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step: Review
// ─────────────────────────────────────────────────────────────────────────────
function StepReview({
  answers,
  onEdit,
}: {
  answers: AssessmentAnswers;
  onEdit: (step: AssessmentStep) => void;
}) {
  const goalLabels = answers.goals.map(
    (g) => SKIN_GOALS.find((sg) => sg.key === g)?.label ?? g
  );

  const characteristicLabels = answers.characteristics.map(
    (c) => CHARACTERISTICS.find((ch) => ch.key === c)?.label ?? c
  );

  const budgetLabel =
    answers.maxBudget === 0
      ? "No limit"
      : answers.maxBudget === 999
      ? "Over $50"
      : `Up to $${answers.maxBudget}`;

  const rows: { label: string; value: string; step: AssessmentStep }[] = [
    {
      label: "Goals",
      value: goalLabels.length > 0 ? goalLabels.join(", ") : "None selected",
      step: "goals",
    },
    {
      label: "Skin feel",
      value: characteristicLabels.length > 0 ? characteristicLabels.join(", ") : "Not specified",
      step: "characteristics",
    },
    { label: "Budget", value: budgetLabel, step: "budget" },
    {
      label: "Preferred brands",
      value: answers.preferredBrands.length > 0 ? answers.preferredBrands.join(", ") : "Any brand",
      step: "brands",
    },
    {
      label: "Exclude ingredients",
      value:
        answers.excludeIngredients.length > 0
          ? answers.excludeIngredients.join(", ")
          : "Nothing excluded",
      step: "ingredients",
    },
    {
      label: "Fragrance-free",
      value: answers.fragranceFreeOnly ? "Yes (hard constraint)" : "No preference",
      step: "fragrance",
    },
    {
      label: "Vegan",
      value: answers.veganOnly ? "Yes (hard constraint)" : "No preference",
      step: "fragrance",
    },
    {
      label: "Cruelty-free",
      value: answers.crueltyFreeOnly ? "Yes (hard constraint)" : "No preference",
      step: "fragrance",
    },
    {
      label: "Routine preference",
      value: answers.routinePreference === "no-preference"
        ? "No preference"
        : answers.routinePreference === "minimal"
        ? "Minimal (2–3 steps)"
        : "Full routine (4–6 steps)",
      step: "fragrance",
    },
    {
      label: "Photo",
      value: answers.imageCaptured ? "Provided (demo only)" : "Not provided",
      step: "image",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light text-ink">
          Review your answers
        </h2>
        <p className="mt-2 text-slate">
          Check everything looks right before generating your profile.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-white">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-start justify-between gap-4 px-5 py-4 ${
              i < rows.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                {row.label}
              </p>
              <p className="mt-0.5 text-sm text-ink">{row.value}</p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(row.step)}
              className="shrink-0 text-sm font-medium text-plum hover:underline"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <p className="badge-demo inline-flex">
        This data is stored in your browser only. Nothing is sent to any server.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step: Results
// ─────────────────────────────────────────────────────────────────────────────
function StepResults({ answers }: { answers: AssessmentAnswers }) {
  const router = useRouter();

  const goalLabels = answers.goals.map(
    (g) => SKIN_GOALS.find((sg) => sg.key === g)?.label ?? g
  );

  const params = new URLSearchParams();
  if (answers.goals.length > 0) params.set("goals", answers.goals.join(","));
  if (answers.maxBudget > 0) params.set("budget", String(answers.maxBudget));
  if (answers.fragranceFreeOnly) params.set("ff", "1");
  if (answers.veganOnly) params.set("vegan", "1");
  if (answers.crueltyFreeOnly) params.set("cf", "1");
  if (answers.excludeIngredients.length > 0)
    params.set("excl", answers.excludeIngredients.join(","));

  const recsHref = `/recommendations?${params.toString()}`;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <p className="badge-demo inline-flex">
          Simulated demo data — not actual AI analysis
        </p>
        <h2 className="mt-4 font-display text-3xl font-light text-ink">
          Your illustrative skin profile
        </h2>
        <p className="mt-3 text-slate">
          The values below are <strong>simulated sample data</strong> generated for demonstration
          purposes only. They do not represent the results of actual image analysis. DermaLens AI
          does not diagnose skin conditions.
        </p>
      </div>

      {/* Simulated features */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate">
          Visible characteristics — illustrative sample
        </h3>
        <div className="mt-4 space-y-4">
          {SIMULATED_FEATURES.map((feature) => (
            <div key={feature.label} className="rounded-xl border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-ink">{feature.label}</p>
                  <p className="mt-0.5 text-sm text-slate">{feature.area}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      feature.confidence === "High"
                        ? "bg-plum-50 text-plum"
                        : feature.confidence === "Medium"
                        ? "bg-rose-50 text-rose-700"
                        : "bg-line text-slate"
                    }`}
                  >
                    {feature.confidence} confidence
                  </span>
                  <p className="mt-1 text-xs text-slate">{feature.level}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-plum transition-all duration-700"
                    style={{ width: `${feature.value}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-medium text-plum">
                  {feature.value}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Goals summary */}
      {goalLabels.length > 0 && (
        <div className="rounded-xl border border-plum/20 bg-plum-50 p-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-plum">
            Your stated goals
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {goalLabels.map((g) => (
              <span
                key={g}
                className="rounded-full border border-plum/20 bg-white px-3 py-1 text-sm font-medium text-plum"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Non-diagnostic notice */}
      <div className="rounded-xl border border-rose/20 bg-rose-50 p-5 text-sm leading-relaxed text-ink">
        <p className="font-semibold text-rose-700">Non-diagnostic notice</p>
        <p className="mt-2 text-slate">
          The characteristics shown above are illustrative sample data created for this demo.
          They are not derived from actual analysis of any image. DermaLens AI is not a medical
          device and does not diagnose, treat or prevent any skin condition. If you have a
          persistent, painful, changing or bleeding skin concern, speak to a qualified dermatologist
          or healthcare professional.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href={recsHref}
          onClick={(e) => {
            e.preventDefault();
            router.push(recsHref);
          }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-plum px-8 text-[15px] font-medium text-white transition-colors hover:bg-plum-800"
        >
          Discover compatible products <ChevronRight size={18} />
        </a>
        <Link
          href="/products"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-plum/20 px-8 text-[15px] font-medium text-plum transition-colors hover:border-plum hover:bg-plum-50"
        >
          Browse the full catalogue
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root assessment client
// ─────────────────────────────────────────────────────────────────────────────
export default function AssessmentClient() {
  const [step, setStep] = useState<AssessmentStep>("intro");
  const [answers, setAnswers] = useState<AssessmentAnswers>(DEFAULT_ANSWERS);

  const updateAnswers = useCallback((patch: Partial<AssessmentAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
  }, []);

  const goTo = (s: AssessmentStep) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextMap: Record<AssessmentStep, AssessmentStep> = {
    intro: "goals",
    goals: "characteristics",
    characteristics: "budget",
    budget: "brands",
    brands: "ingredients",
    ingredients: "fragrance",
    fragrance: "existing",
    existing: "image",
    image: "review",
    review: "results",
    results: "results",
  };

  const prevMap: Record<AssessmentStep, AssessmentStep> = {
    intro: "intro",
    goals: "intro",
    characteristics: "goals",
    budget: "characteristics",
    brands: "budget",
    ingredients: "brands",
    fragrance: "ingredients",
    existing: "fragrance",
    image: "existing",
    review: "image",
    results: "review",
  };

  const showNav = step !== "intro" && step !== "results";

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <ProgressBar step={step} />

      {step === "intro" && <StepIntro onNext={() => goTo("goals")} />}
      {step === "goals" && <StepGoals answers={answers} onChange={updateAnswers} />}
      {step === "characteristics" && <StepCharacteristics answers={answers} onChange={updateAnswers} />}
      {step === "budget" && <StepBudget answers={answers} onChange={updateAnswers} />}
      {step === "brands" && <StepBrands answers={answers} onChange={updateAnswers} />}
      {step === "ingredients" && <StepIngredients answers={answers} onChange={updateAnswers} />}
      {step === "fragrance" && <StepFragrance answers={answers} onChange={updateAnswers} />}
      {step === "existing" && <StepExisting answers={answers} onChange={updateAnswers} />}
      {step === "image" && <StepImage answers={answers} onChange={updateAnswers} />}
      {step === "review" && <StepReview answers={answers} onEdit={goTo} />}
      {step === "results" && <StepResults answers={answers} />}

      {showNav && (
        <div className="mt-10 flex items-center justify-between border-t border-line pt-8">
          <button
            type="button"
            onClick={() => goTo(prevMap[step])}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-6 text-[15px] font-medium text-plum transition-colors hover:border-plum hover:bg-plum-50"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back
          </button>
          <button
            type="button"
            onClick={() => goTo(nextMap[step])}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-plum px-8 text-[15px] font-medium text-white transition-colors hover:bg-plum-800"
          >
            {step === "review" ? "Generate my profile" : "Continue"}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

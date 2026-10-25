"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Check, ChevronDown, ChevronUp } from "lucide-react";
import { ALL_PRODUCTS, SKIN_GOALS, PRODUCT_BRANDS, type GoalKey } from "@/lib/products";
import {
  rankProducts,
  summariseConstraintFailures,
  type RecommendationFilters,
} from "@/lib/recommendations";
import { useWishlist, useCompareList } from "@/lib/wishlist";

const BUDGET_OPTIONS = [
  { label: "No limit", value: 0 },
  { label: "Under $20", value: 19 },
  { label: "$20 – $35", value: 35 },
  { label: "$35 – $50", value: 50 },
];

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-plum transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="w-9 text-right text-sm font-medium text-plum">{score}</span>
    </div>
  );
}

export default function RecommendationClient() {
  const [goals, setGoals] = useState<GoalKey[]>([]);
  const [maxBudget, setMaxBudget] = useState<number>(0);
  const [brands, setBrands] = useState<string[]>([]);
  const [excludeInput, setExcludeInput] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState<string[]>([]);
  const [fragranceFreeOnly, setFragranceFreeOnly] = useState(false);
  const [veganOnly, setVeganOnly] = useState(false);
  const [crueltyFreeOnly, setCrueltyFreeOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { has: inWishlist, toggle: toggleWishlist } = useWishlist();
  const { has: inCompare, add: addCompare, remove: removeCompare, ids: compareIds, max: compareMax } = useCompareList();

  const toggleGoal = (key: GoalKey) =>
    setGoals((prev) =>
      prev.includes(key) ? prev.filter((g) => g !== key) : [...prev, key]
    );

  const toggleBrand = (brand: string) =>
    setBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );

  const addExclude = () => {
    const term = excludeInput.trim().toLowerCase();
    if (term && !excludeIngredients.includes(term)) {
      setExcludeIngredients((prev) => [...prev, term]);
      setExcludeInput("");
    }
  };

  const filters: RecommendationFilters = {
    goals,
    maxBudget,
    brands,
    excludeIngredients,
    fragranceFreeOnly,
    veganOnly,
    crueltyFreeOnly,
  };

  const { ranked, excluded } = rankProducts(ALL_PRODUCTS, filters);
  const failureSummary = summariseConstraintFailures(excluded);

  return (
    <div className="bg-paper pb-24 pt-8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Demo banner */}
        <p className="badge-demo mb-8 inline-flex">
          Frontend demo — all filtering is done locally. No AI model or server is used.
        </p>

        <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
          {/* ── Preference panel ── */}
          <aside className="space-y-8 rounded-2xl border border-line bg-white p-6 self-start sticky top-24">
            <div>
              <h2 className="font-display text-xl font-normal text-ink">Your preferences</h2>
              <p className="mt-1 text-sm text-slate">Hard constraints are applied first.</p>
            </div>

            {/* Goals */}
            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-wider text-slate">
                Skincare goals
              </legend>
              <div className="mt-3 space-y-2.5">
                {SKIN_GOALS.map((goal) => (
                  <label key={goal.key} className="flex cursor-pointer items-center gap-3 text-sm text-ink">
                    <input
                      type="checkbox"
                      checked={goals.includes(goal.key)}
                      onChange={() => toggleGoal(goal.key)}
                      className="accent-plum h-4 w-4"
                    />
                    {goal.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Budget */}
            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-wider text-slate">
                Budget per product
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setMaxBudget(opt.value)}
                    className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                      maxBudget === opt.value
                        ? "border-plum bg-plum text-white"
                        : "border-line text-slate hover:border-plum hover:text-plum"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Brands */}
            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-wider text-slate">
                Preferred brands
              </legend>
              <p className="mt-1 text-xs text-slate/70">Leave empty for any brand.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRODUCT_BRANDS.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => toggleBrand(brand)}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                      brands.includes(brand)
                        ? "border-plum bg-plum text-white"
                        : "border-line text-slate hover:border-plum hover:text-plum"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Exclude ingredients */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                Ingredients to exclude
              </p>
              <p className="mt-1 text-xs text-slate/70">Type a keyword and press Enter.</p>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={excludeInput}
                  onChange={(e) => setExcludeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addExclude())}
                  placeholder="e.g. parfum, retinol…"
                  className="h-10 flex-1 rounded-full border border-line px-4 text-sm focus:border-plum focus:outline-none"
                  aria-label="Add ingredient to exclude"
                />
                <button
                  type="button"
                  onClick={addExclude}
                  className="h-10 w-10 rounded-full bg-plum text-white flex items-center justify-center"
                  aria-label="Add exclusion"
                >
                  <Plus size={16} />
                </button>
              </div>
              {excludeIngredients.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {excludeIngredients.map((e) => (
                    <span
                      key={e}
                      className="inline-flex items-center gap-1 rounded-full border border-rose/20 bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700"
                    >
                      {e}
                      <button
                        type="button"
                        onClick={() => setExcludeIngredients((prev) => prev.filter((x) => x !== e))}
                        aria-label={`Remove ${e} exclusion`}
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                Hard constraints
              </p>
              {[
                { label: "Fragrance-free only", value: fragranceFreeOnly, set: setFragranceFreeOnly },
                { label: "Vegan only", value: veganOnly, set: setVeganOnly },
                { label: "Cruelty-free only", value: crueltyFreeOnly, set: setCrueltyFreeOnly },
              ].map(({ label, value, set }) => (
                <label
                  key={label}
                  className="flex cursor-pointer items-center justify-between text-sm text-ink select-none"
                >
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => set((v: boolean) => !v)}
                    className="sr-only"
                  />
                  <span>{label}</span>
                  <span
                    aria-hidden="true"
                    className={`flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                      value ? "bg-plum" : "bg-line"
                    }`}
                  >
                    <span
                      className={`ml-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        value ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </span>
                </label>
              ))}
            </div>
          </aside>

          {/* ── Results ── */}
          <main>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate">
                <strong className="text-ink">{ranked.length}</strong> product
                {ranked.length !== 1 ? "s" : ""} match your requirements
                {excluded.length > 0 && (
                  <>, <strong className="text-ink">{excluded.length}</strong> excluded by constraints</>
                )}
              </p>
              {ranked.length > 0 && (
                <Link
                  href="/compare"
                  className="text-sm font-medium text-plum hover:underline"
                >
                  Compare selected →
                </Link>
              )}
            </div>

            {ranked.length === 0 && (
              <div className="rounded-xl border border-line bg-white p-10 text-center">
                <p className="font-display text-2xl font-light text-ink">
                  No products pass all constraints
                </p>
                <p className="mt-3 text-slate">
                  Your current settings exclude every product in the catalogue.
                </p>
                {failureSummary.length > 0 && (
                  <ul className="mt-6 space-y-2 text-left">
                    {failureSummary.map((msg) => (
                      <li
                        key={msg}
                        className="flex items-start gap-2.5 rounded-lg border border-rose/20 bg-rose-50 p-3 text-sm text-ink"
                      >
                        <span className="mt-0.5 flex-shrink-0 text-rose-700">✗</span>
                        {msg}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-6 text-sm text-slate">
                  Relax a constraint in the panel on the left to see matching products.
                </p>
              </div>
            )}

            <div className="space-y-4">
              {ranked.map((result, i) => {
                const p = result.product;
                const expanded = expandedId === p.id;
                const wished = inWishlist(p.id);
                const compared = inCompare(p.id);
                const compareFull = compareIds.length >= compareMax && !compared;

                return (
                  <article
                    key={p.id}
                    className="card overflow-hidden transition-shadow duration-200 hover:shadow-lift"
                  >
                    <div className="flex items-start gap-5 p-5">
                      {/* Rank badge */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-plum text-sm font-bold text-white">
                        {i + 1}
                      </div>

                      {/* Product image */}
                      <div className="relative hidden h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line sm:flex">
                        <Image
                          src={`/products/${p.kind}.jpg`}
                          alt={p.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-rose">
                              {p.brand}
                            </p>
                            <h3 className="font-display text-lg font-normal text-ink">
                              {p.name}
                            </h3>
                            <p className="text-sm text-slate">{p.category} · ${p.price}</p>
                          </div>
                          <div className="flex shrink-0 gap-2">
                            <button
                              type="button"
                              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                              aria-pressed={wished}
                              onClick={() => toggleWishlist(p.id)}
                              className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors ${
                                wished
                                  ? "border-rose bg-rose text-white"
                                  : "border-line text-slate hover:border-rose hover:text-rose"
                              }`}
                            >
                              ♥
                            </button>
                            <button
                              type="button"
                              aria-label={compared ? "Remove from comparison" : "Add to comparison"}
                              aria-pressed={compared}
                              disabled={compareFull}
                              onClick={() => (compared ? removeCompare(p.id) : addCompare(p.id))}
                              className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors ${
                                compared
                                  ? "border-plum bg-plum text-white"
                                  : compareFull
                                  ? "cursor-not-allowed border-line text-slate/40"
                                  : "border-line text-slate hover:border-plum hover:text-plum"
                              }`}
                            >
                              {compared ? <Check size={14} /> : <Plus size={14} />}
                            </button>
                          </div>
                        </div>

                        {/* Score bar */}
                        <div className="mt-3">
                          <p className="mb-1 text-xs text-slate">Match score</p>
                          <ScoreBar score={result.score} />
                        </div>

                        {/* Top reason */}
                        {result.matchReasons[0] && (
                          <p className="mt-2 text-sm text-slate">
                            <span className="text-plum">✓</span>{" "}
                            {result.matchReasons[0]}
                          </p>
                        )}

                        {/* Expand/collapse */}
                        <button
                          type="button"
                          onClick={() => setExpandedId(expanded ? null : p.id)}
                          className="mt-3 flex items-center gap-1 text-sm font-medium text-plum hover:underline"
                          aria-expanded={expanded}
                        >
                          {expanded ? (
                            <>
                              Hide details <ChevronUp size={14} />
                            </>
                          ) : (
                            <>
                              All match reasons <ChevronDown size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded reasons */}
                    {expanded && (
                      <div className="border-t border-line bg-plum-50 p-5">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate">
                          Why this product was recommended
                        </h4>
                        <ul className="mt-3 space-y-2">
                          {result.matchReasons.map((reason) => (
                            <li key={reason} className="flex items-start gap-2 text-sm text-ink">
                              <span className="text-plum">✓</span> {reason}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex gap-3">
                          <Link
                            href={`/products/${p.id}`}
                            className="inline-flex h-10 items-center rounded-full bg-plum px-5 text-sm font-medium text-white transition-colors hover:bg-plum-800"
                          >
                            View product →
                          </Link>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {/* Excluded summary */}
            {excluded.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display text-xl font-normal text-ink">
                  {excluded.length} product{excluded.length !== 1 ? "s" : ""} excluded
                </h3>
                <p className="mt-1 text-sm text-slate">
                  These did not pass your mandatory requirements.
                </p>
                <div className="mt-4 space-y-2">
                  {excluded.map((r) => (
                    <div
                      key={r.product.id}
                      className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink">{r.product.name}</p>
                        <p className="text-xs text-slate">{r.product.brand} · ${r.product.price}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {r.constraintFailures.map((f) => (
                          <span
                            key={f}
                            className="inline-flex items-center gap-1 rounded-full border border-rose/20 bg-rose-50 px-2.5 py-0.5 text-[11px] font-medium text-rose-700"
                          >
                            ✗ {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

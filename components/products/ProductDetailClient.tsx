"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Heart, Plus, Check, ChevronDown, ChevronUp } from "lucide-react";
import type { Product } from "@/lib/products";
import { ALL_PRODUCTS, SKIN_GOALS } from "@/lib/products";
import { useWishlist, useCompareList } from "@/lib/wishlist";
import { ProductCard } from "@/components/products/ProductCard";

import Image from "next/image";

function ProductImageView({ product }: { product: Product }) {
  const imageSrc = `/products/${product.kind}.jpg`;
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-paper lg:h-[460px] shadow-sm border border-line">
      <Image
        src={imageSrc}
        alt={product.name}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { has: inWishlist, toggle } = useWishlist();
  const { has: inCompare, add, remove, ids: compareIds, max } = useCompareList();
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);

  const wished = inWishlist(product.id);
  const compared = inCompare(product.id);
  const compareFull = compareIds.length >= max && !compared;

  const similar = ALL_PRODUCTS.filter(
    (p) => p.kind === product.kind && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="bg-paper pb-24 pt-8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-slate transition-colors hover:text-plum"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to catalogue
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Left column */}
          <div>
            <ProductImageView product={product} />
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wished}
                onClick={() => toggle(product.id)}
                className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border text-[15px] font-medium transition-colors ${
                  wished
                    ? "border-rose bg-rose text-white"
                    : "border-plum/20 text-plum hover:border-plum hover:bg-plum-50"
                }`}
              >
                <Heart size={18} fill={wished ? "currentColor" : "none"} aria-hidden="true" />
                {wished ? "Wishlisted" : "Add to Wishlist"}
              </button>
              <button
                type="button"
                aria-label={
                  compared
                    ? "Remove from comparison"
                    : compareFull
                    ? "Comparison list is full"
                    : "Add to comparison"
                }
                aria-pressed={compared}
                disabled={compareFull}
                onClick={() => (compared ? remove(product.id) : add(product.id))}
                className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border text-[15px] font-medium transition-colors ${
                  compared
                    ? "border-plum bg-plum text-white"
                    : compareFull
                    ? "cursor-not-allowed border-line bg-paper text-slate/40"
                    : "border-plum/20 text-plum hover:border-plum hover:bg-plum-50"
                }`}
              >
                {compared ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                {compared ? "In comparison" : compareFull ? "Compare full" : "Compare"}
              </button>
            </div>
          </div>

          {/* Right column */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-rose">
              {product.brand}
            </p>
            <h1 className="h-display mt-2 text-4xl sm:text-5xl">{product.name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="font-display text-3xl font-light text-plum">
                ${product.price}
              </span>
              <span className="chip">{product.category}</span>
              {product.fragranceFree && (
                <span className="chip bg-plum-50 text-plum">Fragrance-free</span>
              )}
              {product.vegan && <span className="chip bg-plum-50 text-plum">Vegan</span>}
              {product.crueltyFree && (
                <span className="chip bg-plum-50 text-plum">Cruelty-free</span>
              )}
            </div>

            {/* Key ingredients */}
            <div className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate">
                Key Ingredients
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.keyIngredients.map((ing) => (
                  <span key={ing} className="chip">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate">
                Cosmetic Benefits Stated
              </h2>
              <ul className="mt-3 space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px] text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-plum-50 text-plum text-xs font-bold">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Usage guidance */}
            <div className="mt-8 rounded-xl border border-line bg-white p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate">
                Usage Guidance
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">
                {product.usageGuidance}
              </p>
            </div>

            {/* Patch test note */}
            <div className="mt-3 rounded-xl border border-rose/20 bg-rose-50 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                Patch Test Note
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">
                {product.patchTestNote}
              </p>
            </div>

            {/* Full ingredient list */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setIngredientsExpanded((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl border border-line bg-white p-5 text-left transition-colors hover:border-plum/30"
                aria-expanded={ingredientsExpanded}
              >
                <span className="font-medium text-ink">Full ingredient list</span>
                {ingredientsExpanded ? (
                  <ChevronUp size={18} className="text-slate" />
                ) : (
                  <ChevronDown size={18} className="text-slate" />
                )}
              </button>
              {ingredientsExpanded && (
                <div className="rounded-b-xl border border-t-0 border-line bg-white px-5 pb-5">
                  <p className="pt-4 text-sm leading-relaxed text-slate">
                    {product.ingredients.join(", ")}
                  </p>
                  <p className="mt-3 text-xs text-slate/60">
                    Ingredients are listed for informational purposes. Always check the product
                    label for the most current formulation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Goal suitability */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-normal text-ink">
            Why this may fit your skin goals
          </h2>
          <p className="mt-2 text-sm text-slate">
            Based on stated cosmetic benefits — not a clinical assessment.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SKIN_GOALS.map((goal) => {
              const matches = product.forSkinGoals.includes(goal.key);
              return (
                <div
                  key={goal.key}
                  className={`flex items-center gap-3 rounded-xl border p-4 ${
                    matches
                      ? "border-plum/20 bg-plum-50"
                      : "border-line bg-white opacity-50"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      matches ? "bg-plum text-white" : "bg-line text-slate"
                    }`}
                  >
                    {matches ? "✓" : "–"}
                  </span>
                  <span className={`text-sm font-medium ${matches ? "text-ink" : "text-slate"}`}>
                    {goal.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Preference compatibility */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-normal text-ink">
            Preference compatibility
          </h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-line bg-white">
            {[
              {
                label: "Fragrance-free",
                value: product.fragranceFree,
                yes: "This product contains no added fragrance.",
                no: "This product contains fragrance. If you prefer fragrance-free, see alternatives.",
              },
              {
                label: "Vegan",
                value: product.vegan,
                yes: "No animal-derived ingredients in the listed formula.",
                no: "Contains at least one animal-derived ingredient.",
              },
              {
                label: "Cruelty-free",
                value: product.crueltyFree,
                yes: "Not tested on animals (as declared by the brand).",
                no: "Cruelty-free status not confirmed for this sample product.",
              },
            ].map(({ label, value, yes, no }) => (
              <div
                key={label}
                className="flex items-start gap-4 border-b border-line p-5 last:border-0"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    value ? "bg-plum text-white" : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {value ? "✓" : "✗"}
                </span>
                <div>
                  <p className="font-medium text-ink">{label}</p>
                  <p className="mt-0.5 text-sm text-slate">{value ? yes : no}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Similar products */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-normal text-ink">
              Similar products
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-10">
          <p className="badge-demo inline-flex">
            Sample data — all products, brands and claims are illustrative only. No brand has endorsed DermaLens AI.
          </p>
        </div>
      </div>
    </div>
  );
}

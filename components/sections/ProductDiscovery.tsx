"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { ProductArt } from "@/components/art/ProductArt";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PRODUCTS } from "@/lib/data";
import { SITE } from "@/lib/site";

export function ProductDiscovery() {
  const [maxPrice, setMaxPrice] = useState(40);
  const [fragranceFreeOnly, setFragranceFreeOnly] = useState(true);
  const sliderId = useId();
  const toggleId = useId();

  const visible = useMemo(
    () => PRODUCTS.filter((p) => p.price <= maxPrice && (!fragranceFreeOnly || p.fragranceFree)),
    [maxPrice, fragranceFreeOnly],
  );
  const hidden = PRODUCTS.length - visible.length;

  return (
    <Section id="products" tone="white" labelledBy="products-title">
      <SectionHeading
        id="products-title"
        title="Set your limits first. Products that break them never appear."
        intro="Try the controls below. The sample list changes immediately, because preferences are applied before ranking."
      />

      <div className="card mt-10 grid gap-6 p-5 sm:grid-cols-[1.4fr_1fr] sm:items-center sm:p-6">
        <div>
          <label htmlFor={sliderId} className="flex items-baseline justify-between text-sm font-medium text-ink">
            <span>Maximum price per product</span>
            <output htmlFor={sliderId} className="font-display text-2xl font-normal text-plum">
              {SITE.currency}
              {maxPrice}
            </output>
          </label>
          <input
            id={sliderId}
            type="range"
            min={15}
            max={50}
            step={1}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-3 h-2 w-full cursor-pointer accent-plum"
          />
        </div>
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <label htmlFor={toggleId} className="text-sm font-medium text-ink">
            Fragrance-free only
          </label>
          <button
            id={toggleId}
            type="button"
            role="switch"
            aria-checked={fragranceFreeOnly}
            onClick={() => setFragranceFreeOnly((v) => !v)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
              fragranceFreeOnly ? "bg-plum" : "bg-plum-200"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
                fragranceFreeOnly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate" aria-live="polite">
        Showing {visible.length} of {PRODUCTS.length} sample products
        {hidden > 0 ? `. ${hidden} hidden by your limits.` : "."}
      </p>

      {visible.length === 0 ? (
        <div className="card mt-6 p-8 text-center text-slate">
          No sample products fit these limits. Raise the price limit or switch off fragrance-free to see more.
        </div>
      ) : (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.id} className="card card-interactive flex flex-col overflow-hidden">
              <Link href={`/products/${p.id}`} className="relative block h-56 w-full overflow-hidden bg-paper">
                <Image
                  src={`/products/${p.kind}.jpg`}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate">
                      {p.category} by {p.brand}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-normal text-ink">
                      <Link href={`/products/${p.id}`} className="transition-colors hover:text-plum">
                        {p.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="font-display text-xl text-plum">
                    {SITE.currency}
                    {p.price}
                  </p>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Key ingredients and features">
                  {p.features.map((f) => (
                    <li key={f} className="chip">
                      {f}
                    </li>
                  ))}
                  {p.fragranceFree && <li className="chip !border-plum/20 !bg-plum-50 !text-plum">Fragrance-free</li>}
                </ul>
                <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-[15px] leading-relaxed text-slate">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-rose-700" aria-hidden="true" />
                  <span>
                    <span className="font-medium text-ink">Why it fits: </span>
                    {p.rationale}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-slate">
          Products, brands and prices are fictional samples. No brand has endorsed or is affiliated with DermaLens AI.
        </p>
        <ButtonLink href="/products" variant="secondary" className="shrink-0">
          Open full catalogue →
        </ButtonLink>
      </div>
    </Section>
  );
}

"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import { ALL_PRODUCTS, SKIN_GOALS } from "@/lib/products";
import { useCompareList } from "@/lib/wishlist";

export default function CompareClient() {
  const { ids, remove, clear } = useCompareList();
  const products = useMemo(
    () => ids.map((id) => ALL_PRODUCTS.find((p) => p.id === id)).filter(Boolean) as typeof ALL_PRODUCTS,
    [ids]
  );

  if (products.length < 2) {
    return (
      <div className="mx-auto max-w-[1200px] px-5 py-16 text-center sm:px-8">
        <p className="font-display text-3xl font-light text-ink">
          {products.length === 0
            ? "Your comparison list is empty"
            : "Add at least one more product to compare"}
        </p>
        <p className="mt-4 text-slate">
          You can add up to 3 products using the{" "}
          <span className="font-medium text-plum">+</span> button on any product card or detail
          page.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-plum px-6 text-[15px] font-medium text-white transition-colors hover:bg-plum-800"
        >
          Browse the catalogue →
        </Link>
      </div>
    );
  }

  const rows: { label: string; render: (idx: number) => React.ReactNode }[] = [
    {
      label: "Price",
      render: (i) => (
        <span className="font-display text-xl font-light text-plum">
          ${products[i].price}
        </span>
      ),
    },
    {
      label: "Category",
      render: (i) => (
        <span className="chip capitalize">{products[i].category}</span>
      ),
    },
    {
      label: "Fragrance-free",
      render: (i) =>
        products[i].fragranceFree ? (
          <span className="text-plum font-semibold">Yes</span>
        ) : (
          <span className="text-rose-700">No</span>
        ),
    },
    {
      label: "Vegan",
      render: (i) =>
        products[i].vegan ? (
          <span className="text-plum font-semibold">Yes</span>
        ) : (
          <span className="text-rose-700">No</span>
        ),
    },
    {
      label: "Cruelty-free",
      render: (i) =>
        products[i].crueltyFree ? (
          <span className="text-plum font-semibold">Yes</span>
        ) : (
          <span className="text-rose-700">No</span>
        ),
    },
    {
      label: "Key ingredients",
      render: (i) => (
        <div className="flex flex-wrap gap-1.5">
          {products[i].keyIngredients.map((ing) => (
            <span key={ing} className="chip text-[11px]">
              {ing}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Total ingredients",
      render: (i) => (
        <span className="text-sm text-slate">{products[i].ingredients.length} listed</span>
      ),
    },
    {
      label: "Cosmetic benefits",
      render: (i) => (
        <ul className="space-y-1">
          {products[i].features.map((f) => (
            <li key={f} className="flex items-start gap-1.5 text-sm text-ink">
              <span className="text-plum shrink-0">✓</span>
              {f}
            </li>
          ))}
        </ul>
      ),
    },
    ...SKIN_GOALS.map((goal) => ({
      label: goal.label,
      render: (i: number) =>
        products[i].forSkinGoals.includes(goal.key) ? (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-plum">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-plum text-[11px] text-white">✓</span>
            Supported
          </span>
        ) : (
          <span className="text-sm text-slate/50">–</span>
        ),
    })),
  ];

  return (
    <div className="bg-paper pb-24 pt-8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate">
            Comparing {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-2 text-sm font-medium text-rose hover:underline"
          >
            <Trash2 size={15} />
            Clear all
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto rounded-2xl border border-line bg-white sm:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line">
                <th className="w-[180px] p-5 text-left text-xs font-semibold uppercase tracking-wider text-slate">
                  &nbsp;
                </th>
                {products.map((p, i) => (
                  <th key={p.id} className="p-5 text-left">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-rose">
                          {p.brand}
                        </p>
                        <p className="mt-0.5 font-display text-lg font-normal text-ink">
                          {p.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        aria-label={`Remove ${p.name} from comparison`}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-slate hover:border-rose hover:text-rose"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    <div className="relative mt-3 h-28 w-full overflow-hidden rounded-xl border border-line">
                      <Image
                        src={`/products/${p.kind}.jpg`}
                        alt={p.name}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                    <Link
                      href={`/products/${p.id}`}
                      className="mt-2 block text-center text-sm font-medium text-plum hover:underline"
                    >
                      View details →
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0 hover:bg-paper/60">
                  <td className="p-5 align-top">
                    <span className="text-sm font-medium text-slate">{row.label}</span>
                  </td>
                  {products.map((p, i) => (
                    <td key={p.id} className="p-5 align-top">
                      {row.render(i)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked view */}
        <div className="space-y-6 sm:hidden">
          {products.map((p, idx) => (
            <div key={p.id} className="card overflow-hidden">
              <div className="relative h-44 w-full overflow-hidden border-b border-line">
                <Image
                  src={`/products/${p.kind}.jpg`}
                  alt={p.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-rose">{p.brand}</p>
                    <h3 className="font-display text-xl font-normal text-ink">{p.name}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(p.id)}
                    aria-label={`Remove ${p.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-slate"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {rows.slice(0, 6).map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 border-b border-line pb-3 last:border-0">
                      <span className="text-sm font-medium text-slate">{row.label}</span>
                      <div className="text-right">{row.render(idx)}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/products/${p.id}`}
                  className="mt-4 block text-center text-sm font-medium text-plum hover:underline"
                >
                  View full details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="badge-demo inline-flex">
            Sample data — all products and claims are illustrative only.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, GitCompareArrows } from "lucide-react";
import { useCompareList } from "@/lib/wishlist";
import { ALL_PRODUCTS } from "@/lib/products";

export default function CompareBar() {
  const pathname = usePathname();
  const { ids, remove, clear } = useCompareList();

  if (pathname === "/kiosk" || ids.length === 0) return null;

  const products = ids
    .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof ALL_PRODUCTS;

  return (
    <div
      role="region"
      aria-label="Product comparison list"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-white shadow-panel"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-3 px-5 py-4 sm:px-8">
        <span className="flex items-center gap-2 text-sm font-medium text-plum">
          <GitCompareArrows size={16} aria-hidden="true" />
          Comparing ({ids.length}/3)
        </span>

        <div className="flex flex-1 flex-wrap gap-2">
          {products.map((p) => (
            <span
              key={p.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-plum/20 bg-plum-50 px-3 py-1 text-sm font-medium text-plum"
            >
              {p.name}
              <button
                type="button"
                onClick={() => remove(p.id)}
                aria-label={`Remove ${p.name} from comparison`}
                className="hover:text-rose"
              >
                <X size={13} />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={clear}
            className="text-sm font-medium text-slate hover:text-rose"
          >
            Clear
          </button>
          <Link
            href="/compare"
            className="inline-flex h-10 items-center rounded-full bg-plum px-5 text-sm font-medium text-white transition-colors hover:bg-plum-800"
          >
            Compare now →
          </Link>
        </div>
      </div>
    </div>
  );
}

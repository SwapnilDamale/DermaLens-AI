"use client";

import Link from "next/link";
import { Heart, Plus, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { useWishlist, useCompareList } from "@/lib/wishlist";

import Image from "next/image";

function ProductImageDisplay({ product }: { product: Product }) {
  const imageSrc = `/products/${product.kind}.jpg`;
  return (
    <div className="relative h-52 w-full overflow-hidden bg-paper">
      <Image
        src={imageSrc}
        alt={product.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      <span className="absolute bottom-3 left-3 text-xs font-medium text-ink bg-white/90 backdrop-blur-sm shadow-sm rounded-full px-2.5 py-0.5">
        {product.category}
      </span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { has: inWishlist, toggle } = useWishlist();
  const { has: inCompare, add, remove, ids: compareIds, max } = useCompareList();
  const wished = inWishlist(product.id);
  const compared = inCompare(product.id);
  const compareFull = compareIds.length >= max && !compared;

  return (
    <article className="card card-interactive group flex flex-col overflow-hidden">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}`} className="block">
          <ProductImageDisplay product={product} />
        </Link>
        <button
          type="button"
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          onClick={() => toggle(product.id)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200 ${
            wished
              ? "border-rose bg-rose text-white"
              : "border-white/60 bg-white/80 text-slate hover:border-rose hover:text-rose"
          }`}
        >
          <Heart size={16} fill={wished ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-rose">{product.brand}</p>
          <h3 className="mt-1 font-display text-lg font-normal leading-snug text-ink">
            <Link href={`/products/${product.id}`} className="transition-colors hover:text-plum">
              {product.name}
            </Link>
          </h3>
        </div>

        <p className="font-display text-2xl font-light text-plum">
          ${product.price}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {product.keyIngredients.slice(0, 3).map((ing) => (
            <span key={ing} className="chip text-[11px]">
              {ing}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {product.fragranceFree && (
            <span className="inline-flex items-center gap-1 rounded-full bg-plum-50 px-2.5 py-0.5 text-[11px] font-medium text-plum">
              Fragrance-free
            </span>
          )}
          {product.vegan && (
            <span className="inline-flex items-center gap-1 rounded-full bg-plum-50 px-2.5 py-0.5 text-[11px] font-medium text-plum">
              Vegan
            </span>
          )}
          {product.crueltyFree && (
            <span className="inline-flex items-center gap-1 rounded-full bg-plum-50 px-2.5 py-0.5 text-[11px] font-medium text-plum">
              Cruelty-free
            </span>
          )}
        </div>

        <div className="mt-auto flex gap-2 pt-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 rounded-full border border-plum/20 bg-transparent py-2 text-center text-sm font-medium text-plum transition-colors hover:border-plum hover:bg-plum-50"
          >
            View details
          </Link>
          <button
            type="button"
            aria-label={
              compared
                ? `Remove ${product.name} from comparison`
                : compareFull
                ? "Comparison list is full (max 3)"
                : `Add ${product.name} to comparison`
            }
            aria-pressed={compared}
            disabled={compareFull}
            onClick={() => (compared ? remove(product.id) : add(product.id))}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
              compared
                ? "border-plum bg-plum text-white"
                : compareFull
                ? "cursor-not-allowed border-line bg-paper text-slate/40"
                : "border-plum/20 text-plum hover:border-plum hover:bg-plum-50"
            }`}
          >
            {compared ? (
              <Check size={16} aria-hidden="true" />
            ) : (
              <Plus size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

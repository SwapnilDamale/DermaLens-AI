"use client";

import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { ALL_PRODUCTS, PRODUCT_BRANDS, PRODUCT_KINDS, type ProductKind } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";

type BudgetRange = "any" | "under20" | "20-35" | "35-50" | "over50";

function budgetLabel(b: BudgetRange): string {
  const map: Record<BudgetRange, string> = {
    any: "Any price",
    under20: "Under $20",
    "20-35": "$20 – $35",
    "35-50": "$35 – $50",
    over50: "Over $50",
  };
  return map[b];
}

function inBudget(price: number, range: BudgetRange): boolean {
  if (range === "any") return true;
  if (range === "under20") return price < 20;
  if (range === "20-35") return price >= 20 && price <= 35;
  if (range === "35-50") return price > 35 && price <= 50;
  if (range === "over50") return price > 50;
  return true;
}

type SortKey = "relevance" | "price-asc" | "price-desc";

export default function CatalogueClient() {
  const [search, setSearch] = useState("");
  const [selectedKind, setSelectedKind] = useState<ProductKind | "all">("all");
  const [budget, setBudget] = useState<BudgetRange>("any");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [fragranceFreeOnly, setFragranceFreeOnly] = useState(false);
  const [veganOnly, setVeganOnly] = useState(false);
  const [crueltyFreeOnly, setCrueltyFreeOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const toggleBrand = (brand: string) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );

  const hasActiveFilters =
    selectedKind !== "all" ||
    budget !== "any" ||
    selectedBrands.length > 0 ||
    fragranceFreeOnly ||
    veganOnly ||
    crueltyFreeOnly ||
    search.trim() !== "";

  const clearAll = () => {
    setSearch("");
    setSelectedKind("all");
    setBudget("any");
    setSelectedBrands([]);
    setFragranceFreeOnly(false);
    setVeganOnly(false);
    setCrueltyFreeOnly(false);
    setSort("relevance");
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let list = ALL_PRODUCTS.filter((p) => {
      if (selectedKind !== "all" && p.kind !== selectedKind) return false;
      if (!inBudget(p.price, budget)) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (fragranceFreeOnly && !p.fragranceFree) return false;
      if (veganOnly && !p.vegan) return false;
      if (crueltyFreeOnly && !p.crueltyFree) return false;
      if (q) {
        const haystack = [p.name, p.brand, ...p.ingredients, ...p.keyIngredients, p.category]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [search, selectedKind, budget, selectedBrands, fragranceFreeOnly, veganOnly, crueltyFreeOnly, sort]);

  return (
    <div className="bg-paper pb-24 pt-8">
      {/* Search + sort bar */}
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search by name or ingredient…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-[15px] text-ink placeholder-slate/60 focus:border-plum focus:outline-none"
              aria-label="Search products"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              aria-expanded={showFilters}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-5 text-[15px] font-medium text-plum transition-colors hover:border-plum hover:bg-plum-50"
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              Filters
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose text-[11px] font-bold text-white">
                  !
                </span>
              )}
            </button>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-12 appearance-none rounded-full border border-line bg-white pl-4 pr-9 text-[15px] text-ink focus:border-plum focus:outline-none"
                aria-label="Sort products"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Expanded filter panel */}
        {showFilters && (
          <div className="mt-4 rounded-xl border border-line bg-white p-6 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Category */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {(["all", ...PRODUCT_KINDS] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setSelectedKind(k)}
                      className={`rounded-full border px-3 py-1 text-sm font-medium capitalize transition-colors ${
                        selectedKind === k
                          ? "border-plum bg-plum text-white"
                          : "border-line text-slate hover:border-plum hover:text-plum"
                      }`}
                    >
                      {k === "all" ? "All" : k}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate">
                  Budget
                </p>
                <div className="flex flex-col gap-2">
                  {(["any", "under20", "20-35", "35-50", "over50"] as BudgetRange[]).map((b) => (
                    <label key={b} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
                      <input
                        type="radio"
                        name="budget"
                        value={b}
                        checked={budget === b}
                        onChange={() => setBudget(b)}
                        className="accent-plum"
                      />
                      {budgetLabel(b)}
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate">
                  Brand
                </p>
                <div className="flex flex-col gap-2">
                  {PRODUCT_BRANDS.map((brand) => (
                    <label key={brand} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="accent-plum"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate">
                  Preferences
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Fragrance-free only", value: fragranceFreeOnly, set: setFragranceFreeOnly },
                    { label: "Vegan only", value: veganOnly, set: setVeganOnly },
                    { label: "Cruelty-free only", value: crueltyFreeOnly, set: setCrueltyFreeOnly },
                  ].map(({ label, value, set }) => (
                    <label key={label} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink select-none">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => set((v: boolean) => !v)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                          value ? "bg-plum" : "bg-line"
                        }`}
                      >
                        <span
                          className={`ml-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                            value ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </span>
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {search && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/20 bg-plum-50 px-3 py-1 text-xs font-medium text-plum">
                "{search}"
                <button type="button" onClick={() => setSearch("")} aria-label="Remove search filter">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedKind !== "all" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/20 bg-plum-50 px-3 py-1 text-xs font-medium text-plum capitalize">
                {selectedKind}
                <button type="button" onClick={() => setSelectedKind("all")} aria-label="Remove category filter">
                  <X size={12} />
                </button>
              </span>
            )}
            {budget !== "any" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/20 bg-plum-50 px-3 py-1 text-xs font-medium text-plum">
                {budgetLabel(budget)}
                <button type="button" onClick={() => setBudget("any")} aria-label="Remove budget filter">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedBrands.map((brand) => (
              <span key={brand} className="inline-flex items-center gap-1.5 rounded-full border border-plum/20 bg-plum-50 px-3 py-1 text-xs font-medium text-plum">
                {brand}
                <button type="button" onClick={() => toggleBrand(brand)} aria-label={`Remove ${brand} filter`}>
                  <X size={12} />
                </button>
              </span>
            ))}
            {fragranceFreeOnly && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/20 bg-plum-50 px-3 py-1 text-xs font-medium text-plum">
                Fragrance-free
                <button type="button" onClick={() => setFragranceFreeOnly(false)} aria-label="Remove fragrance-free filter">
                  <X size={12} />
                </button>
              </span>
            )}
            {veganOnly && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/20 bg-plum-50 px-3 py-1 text-xs font-medium text-plum">
                Vegan
                <button type="button" onClick={() => setVeganOnly(false)} aria-label="Remove vegan filter">
                  <X size={12} />
                </button>
              </span>
            )}
            {crueltyFreeOnly && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/20 bg-plum-50 px-3 py-1 text-xs font-medium text-plum">
                Cruelty-free
                <button type="button" onClick={() => setCrueltyFreeOnly(false)} aria-label="Remove cruelty-free filter">
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-medium text-rose hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results count */}
        <p className="mt-6 text-sm text-slate">
          {filtered.length === 0
            ? "No products match your filters."
            : `${filtered.length} product${filtered.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {/* Product grid */}
      <div className="mx-auto mt-6 max-w-[1200px] px-5 sm:px-8">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-line bg-white p-12 text-center">
            <p className="font-display text-2xl font-light text-ink">No products found</p>
            <p className="mt-3 text-slate">
              Your current filters have no matches. Try broadening your search or clearing a filter.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 inline-flex h-11 items-center rounded-full bg-plum px-6 text-[15px] font-medium text-white transition-colors hover:bg-plum-800"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-[1200px] px-5 sm:px-8">
        <p className="badge-demo inline-flex">
          Sample data only — products and brands are fictional. No brand has endorsed DermaLens AI.
        </p>
      </div>
    </div>
  );
}

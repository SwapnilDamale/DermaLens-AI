/**
 * DermaLens AI – client-side recommendation engine.
 * This is a frontend demo. No real AI model is used.
 */
import type { Product, GoalKey } from "./products";

export type RecommendationFilters = {
  goals: GoalKey[];
  maxBudget: number; // 0 = no limit
  brands: string[]; // empty = any
  excludeIngredients: string[]; // lowercase keywords
  fragranceFreeOnly: boolean;
  veganOnly: boolean;
  crueltyFreeOnly: boolean;
};

export type RankedProduct = {
  product: Product;
  score: number; // 0–100
  matchReasons: string[];
  constraintFailures: string[];
};

function ingredientText(p: Product): string {
  return [...p.ingredients, ...p.keyIngredients].join(" ").toLowerCase();
}

export function rankProducts(
  products: Product[],
  filters: RecommendationFilters
): { ranked: RankedProduct[]; excluded: RankedProduct[] } {
  const ranked: RankedProduct[] = [];
  const excluded: RankedProduct[] = [];

  for (const product of products) {
    const failures: string[] = [];

    // --- Hard constraints ---
    if (filters.maxBudget > 0 && product.price > filters.maxBudget) {
      failures.push(
        `Price $${product.price} exceeds your budget of $${filters.maxBudget}`
      );
    }
    if (filters.fragranceFreeOnly && !product.fragranceFree) {
      failures.push("Contains fragrance (you selected fragrance-free only)");
    }
    if (filters.veganOnly && !product.vegan) {
      failures.push("Not certified vegan (you selected vegan only)");
    }
    if (filters.crueltyFreeOnly && !product.crueltyFree) {
      failures.push("Not certified cruelty-free (you selected cruelty-free only)");
    }
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      failures.push(
        `Brand "${product.brand}" is not in your preferred brand list`
      );
    }
    for (const excl of filters.excludeIngredients) {
      const term = excl.toLowerCase().trim();
      if (term && ingredientText(product).includes(term)) {
        failures.push(`Contains "${excl}" which you asked to avoid`);
      }
    }

    if (failures.length > 0) {
      excluded.push({
        product,
        score: 0,
        matchReasons: [],
        constraintFailures: failures,
      });
      continue;
    }

    // --- Soft scoring ---
    const reasons: string[] = [];
    let score = 0;

    const POINTS_PER_GOAL = filters.goals.length > 0 ? Math.floor(80 / filters.goals.length) : 0;
    for (const goal of filters.goals) {
      if (product.forSkinGoals.includes(goal)) {
        score += POINTS_PER_GOAL;
        const goalLabel =
          goal === "visible-dryness"
            ? "visible dryness"
            : goal === "visible-shine"
            ? "visible shine"
            : goal === "texture-unevenness"
            ? "visible texture unevenness"
            : goal === "visible-redness"
            ? "visible redness"
            : goal === "tone-variation"
            ? "visible tone variation"
            : goal === "barrier-support"
            ? "skin barrier support"
            : "sun protection";
        reasons.push(`Supports goal: ${goalLabel}`);
      }
    }

    // Bonus: budget headroom
    if (filters.maxBudget > 0) {
      const headroom = filters.maxBudget - product.price;
      if (headroom >= 10) {
        score += 10;
        reasons.push(`$${headroom} under your per-product budget`);
      } else {
        score += 5;
        reasons.push("Within budget");
      }
    } else {
      score += 10;
      reasons.push("No budget restriction applied");
    }

    // Bonus: fragrance-free when preferred
    if (filters.fragranceFreeOnly && product.fragranceFree) {
      reasons.push("Fragrance-free — matches your preference");
    } else if (!filters.fragranceFreeOnly && product.fragranceFree) {
      score += 5;
      reasons.push("Fragrance-free formula");
    }

    // Bonus: vegan when preferred
    if (product.vegan) {
      if (filters.veganOnly) {
        reasons.push("Vegan-certified — matches your preference");
      } else {
        score += 3;
      }
    }

    // Bonus: cruelty-free
    if (product.crueltyFree) {
      score += 2;
    }

    // If no goals matched at all but product passed constraints
    if (reasons.length === 0 || (filters.goals.length > 0 && score < POINTS_PER_GOAL)) {
      reasons.push("Passes all your mandatory requirements");
    }

    // Exclude ingredients note
    if (filters.excludeIngredients.length === 0) {
      reasons.push("No ingredient exclusions applied");
    } else {
      reasons.push(`None of your excluded ingredients found`);
    }

    ranked.push({
      product,
      score: Math.min(100, Math.max(0, score)),
      matchReasons: reasons,
      constraintFailures: [],
    });
  }

  ranked.sort((a, b) => b.score - a.score);

  return { ranked, excluded };
}

/** Summarise which constraints are blocking all products */
export function summariseConstraintFailures(
  excluded: RankedProduct[]
): string[] {
  const counts: Record<string, number> = {};
  for (const r of excluded) {
    for (const f of r.constraintFailures) {
      const key = f.split("(")[0].trim();
      counts[key] = (counts[key] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([msg]) => msg);
}

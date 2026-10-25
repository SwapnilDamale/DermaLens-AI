/**
 * DermaLens AI – Phase 3 assessment types and data.
 * All results shown to users are clearly labelled as simulated demo data.
 */
import type { GoalKey } from "./products";

export type AssessmentStep =
  | "intro"
  | "goals"
  | "characteristics"
  | "budget"
  | "brands"
  | "ingredients"
  | "fragrance"
  | "existing"
  | "image"
  | "review"
  | "results";

export type SelfReportedCharacteristic =
  | "oily"
  | "dry"
  | "combination"
  | "sensitive"
  | "acne-prone"
  | "redness-prone"
  | "normal";

export type AssessmentAnswers = {
  goals: GoalKey[];
  characteristics: SelfReportedCharacteristic[];
  maxBudget: number; // 0 = no limit
  preferredBrands: string[];
  excludeIngredients: string[];
  fragranceFreeOnly: boolean;
  veganOnly: boolean;
  crueltyFreeOnly: boolean;
  existingProducts: string; // free-text
  routinePreference: "minimal" | "full" | "no-preference";
  imageCaptured: boolean;
};

export const DEFAULT_ANSWERS: AssessmentAnswers = {
  goals: [],
  characteristics: [],
  maxBudget: 0,
  preferredBrands: [],
  excludeIngredients: [],
  fragranceFreeOnly: false,
  veganOnly: false,
  crueltyFreeOnly: false,
  existingProducts: "",
  routinePreference: "no-preference",
  imageCaptured: false,
};

export const CHARACTERISTICS: {
  key: SelfReportedCharacteristic;
  label: string;
  description: string;
}[] = [
  {
    key: "oily",
    label: "Oily",
    description: "Skin feels or looks shiny, especially mid-day",
  },
  {
    key: "dry",
    label: "Dry",
    description: "Skin feels tight, rough or flaky",
  },
  {
    key: "combination",
    label: "Combination",
    description: "Oily T-zone with drier cheeks or jaw",
  },
  {
    key: "sensitive",
    label: "Sensitive-feeling",
    description: "Skin reacts easily to new products or environmental triggers",
  },
  {
    key: "acne-prone",
    label: "Blemish-prone",
    description: "Frequently experiences visible blemishes or breakouts",
  },
  {
    key: "redness-prone",
    label: "Redness-prone",
    description: "Often looks red or irritated",
  },
  {
    key: "normal",
    label: "Balanced",
    description: "Generally comfortable, minimal sensitivity",
  },
];

// Simulated skin profile data shown on the results page.
// These values are clearly labelled as illustrative demo data.
export type SimulatedFeature = {
  label: string;
  area: string;
  level: string;
  value: number;
  confidence: "High" | "Medium" | "Low";
  description: string;
};

export const SIMULATED_FEATURES: SimulatedFeature[] = [
  {
    label: "Visible shine",
    area: "Forehead and nose",
    level: "Moderate",
    value: 62,
    confidence: "High",
    description:
      "The T-zone shows moderate reflectance compared to the surrounding areas, which may indicate surface sebum.",
  },
  {
    label: "Visible dryness",
    area: "Cheeks",
    level: "Mild",
    value: 34,
    confidence: "Medium",
    description:
      "The cheek area appears slightly less smooth than the centre of the face, which can be consistent with drier surface texture.",
  },
  {
    label: "Visible redness",
    area: "Cheeks and nose",
    level: "Low",
    value: 18,
    confidence: "Medium",
    description:
      "Some variation in skin tone across the cheeks and nose area. This is common and may reflect normal circulation.",
  },
  {
    label: "Texture unevenness",
    area: "Forehead",
    level: "Mild",
    value: 28,
    confidence: "High",
    description:
      "The forehead area shows slightly uneven surface texture compared to the rest of the face.",
  },
  {
    label: "Visible tone variation",
    area: "Overall",
    level: "Low",
    value: 22,
    confidence: "Low",
    description:
      "Very slight variation in visible skin tone across the face. Confidence is low due to image conditions.",
  },
  {
    label: "Visible pores",
    area: "Nose and T-zone",
    level: "Mild",
    value: 31,
    confidence: "Medium",
    description:
      "Slightly enlarged-appearing pore texture around the nose, which is common in this area.",
  },
];

export const SIMULATED_QUALITY = [
  { label: "Lighting evenness", result: "Good", ok: true },
  { label: "Face position and angle", result: "Good", ok: true },
  { label: "Image sharpness", result: "Fair", ok: false },
  { label: "Strong shadows", result: "None detected", ok: true },
  { label: "Background interference", result: "Low", ok: true },
];

export const STEPS: { key: AssessmentStep; title: string; description: string }[] = [
  { key: "intro", title: "Introduction", description: "What to expect" },
  { key: "goals", title: "Your goals", description: "What you want to address" },
  { key: "characteristics", title: "Skin feel", description: "How your skin feels day-to-day" },
  { key: "budget", title: "Budget", description: "Per-product price limit" },
  { key: "brands", title: "Brand preferences", description: "Any brands to prefer or avoid" },
  { key: "ingredients", title: "Ingredients", description: "Anything you want to exclude" },
  { key: "fragrance", title: "Preferences", description: "Fragrance and other preferences" },
  { key: "existing", title: "Existing routine", description: "Products you already use" },
  { key: "image", title: "Optional image", description: "Visual context (optional)" },
  { key: "review", title: "Review", description: "Check your answers" },
  { key: "results", title: "Your profile", description: "Simulated skin profile" },
];

import {
  Camera,
  CalendarCheck,
  Eye,
  ListChecks,
  PackageSearch,
  ScanFace,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Trust                                                               */
/* ------------------------------------------------------------------ */

export type TrustItem = { title: string; body: string; icon: LucideIcon };

export const TRUST_ITEMS: TrustItem[] = [
  {
    title: "Transparent recommendations",
    body: "Every product on your list comes with the reasons behind it, written in plain language you can check against your own goals.",
    icon: ListChecks,
  },
  {
    title: "Preference-first filtering",
    body: "Budget, ingredients to avoid, fragrance and brand preferences are applied before anything is ranked, not after.",
    icon: SlidersHorizontal,
  },
  {
    title: "Non-diagnostic skin insights",
    body: "DermaLens AI describes visible characteristics. It does not diagnose conditions or replace a dermatologist or pharmacist.",
    icon: Eye,
  },
  {
    title: "Suitability explained clearly",
    body: "You see what matched, what only partly matched, and what is worth knowing before you buy, including patch-test guidance.",
    icon: ShieldCheck,
  },
];

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export type Step = { title: string; body: string; icon: LucideIcon };

export const HOW_STEPS: Step[] = [
  {
    title: "Capture or assess",
    body: "Take a guided photo, or answer a short questionnaire if you would rather not use the camera.",
    icon: Camera,
  },
  {
    title: "Understand visible characteristics",
    body: "See a plain-language summary of what is visible, with a note on how reliable the capture was.",
    icon: ScanFace,
  },
  {
    title: "Set goals and constraints",
    body: "Choose what you want to improve, then set your budget, fragrance and ingredient limits.",
    icon: SlidersHorizontal,
  },
  {
    title: "Discover compatible products",
    body: "Browse products that already respect your limits, each with a clear explanation of why it fits.",
    icon: PackageSearch,
  },
  {
    title: "Build a routine",
    body: "Arrange your picks into morning and evening steps, and track how your skin looks over time.",
    icon: CalendarCheck,
  },
];

/* ------------------------------------------------------------------ */
/* Skin insights (illustrative sample only)                            */
/* ------------------------------------------------------------------ */

export type Confidence = "High" | "Medium" | "Low";

export const INSIGHT_FEATURES: {
  label: string;
  area: string;
  level: string;
  value: number;
  confidence: Confidence;
}[] = [
  { label: "Visible shine", area: "Forehead and nose", level: "Moderate", value: 62, confidence: "High" },
  { label: "Visible dryness", area: "Cheeks", level: "Mild", value: 34, confidence: "Medium" },
  { label: "Visible redness", area: "Cheeks and nose", level: "Low", value: 18, confidence: "Medium" },
  { label: "Texture unevenness", area: "Forehead", level: "Mild", value: 28, confidence: "High" },
  { label: "Tone variation", area: "Overall", level: "Low", value: 22, confidence: "Low" },
];

export const CAPTURE_QUALITY: { label: string; result: string; ok: boolean }[] = [
  { label: "Lighting evenness", result: "Good", ok: true },
  { label: "Face position and angle", result: "Good", ok: true },
  { label: "Image sharpness", result: "Fair", ok: false },
  { label: "Strong shadows", result: "None", ok: true },
];

/* ------------------------------------------------------------------ */
/* Products (fictional sample catalogue)                               */
/* ------------------------------------------------------------------ */

export type ProductKind = "serum" | "cleanser" | "moisturiser" | "sunscreen" | "toner";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  kind: ProductKind;
  price: number;
  fragranceFree: boolean;
  features: string[];
  rationale: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "barrier-calm-serum",
    name: "Barrier Calm Serum",
    brand: "Linden Row",
    category: "Serum",
    kind: "serum",
    price: 34,
    fragranceFree: true,
    features: ["Ceramides", "Niacinamide 4%", "Panthenol"],
    rationale: "Supports visibly dry, tight-feeling areas and stays within a $40 limit.",
  },
  {
    id: "clarity-niacinamide",
    name: "Clarity Niacinamide 10%",
    brand: "Northfold",
    category: "Serum",
    kind: "serum",
    price: 22,
    fragranceFree: true,
    features: ["Niacinamide 10%", "Zinc PCA", "Lightweight gel"],
    rationale: "Aimed at visible shine and uneven texture across the T-zone.",
  },
  {
    id: "soft-foam-cleanser",
    name: "Soft Foam Cleanser",
    brand: "Aster & Vale",
    category: "Cleanser",
    kind: "cleanser",
    price: 18,
    fragranceFree: true,
    features: ["Amino-acid surfactants", "Glycerin", "pH-balanced"],
    rationale: "Removes oil and sunscreen without leaving cheeks feeling stripped.",
  },
  {
    id: "cushion-gel-moisturiser",
    name: "Cushion Gel Moisturiser",
    brand: "Verde Atelier",
    category: "Moisturiser",
    kind: "moisturiser",
    price: 38,
    fragranceFree: true,
    features: ["Hyaluronic acid", "Squalane", "Non-greasy finish"],
    rationale: "Adds water-light hydration where cheeks look dry, without extra shine.",
  },
  {
    id: "daily-mineral-spf50",
    name: "Daily Mineral SPF 50",
    brand: "Northfold",
    category: "Sunscreen",
    kind: "sunscreen",
    price: 28,
    fragranceFree: false,
    features: ["Zinc oxide", "Broad spectrum", "Sheer finish"],
    rationale: "A mineral daytime filter. Lightly scented, so it is hidden when you choose fragrance-free.",
  },
  {
    id: "gentle-lactic-toner",
    name: "Gentle Lactic Toner",
    brand: "Verde Atelier",
    category: "Exfoliating toner",
    kind: "toner",
    price: 46,
    fragranceFree: false,
    features: ["Lactic acid 5%", "Aloe", "Twice-weekly use"],
    rationale: "Targets surface texture. Above a $40 limit, so it only appears when your budget allows.",
  },
];

/* ------------------------------------------------------------------ */
/* Routine                                                             */
/* ------------------------------------------------------------------ */

export type RoutineStep = { role: string; productId: string; why: string; kind: ProductKind };

export const ROUTINE: Record<"morning" | "evening", { summary: string; steps: RoutineStep[] }> = {
  morning: {
    summary: "Light, quick and built around daytime protection.",
    steps: [
      {
        role: "Cleanse",
        productId: "soft-foam-cleanser",
        why: "Lifts overnight oil gently so the next layers can do their job.",
        kind: "cleanser",
      },
      {
        role: "Treat",
        productId: "clarity-niacinamide",
        why: "Addresses visible shine across the forehead and nose.",
        kind: "serum",
      },
      {
        role: "Moisturise",
        productId: "cushion-gel-moisturiser",
        why: "Keeps cheeks comfortable without adding a greasy finish.",
        kind: "moisturiser",
      },
      {
        role: "Protect",
        productId: "daily-mineral-spf50",
        why: "Daily sun protection is the step that supports every other goal.",
        kind: "sunscreen",
      },
    ],
  },
  evening: {
    summary: "Slower, focused on comfort and overnight barrier support.",
    steps: [
      {
        role: "Cleanse",
        productId: "soft-foam-cleanser",
        why: "Removes sunscreen and the day's oil. Use once, not twice.",
        kind: "cleanser",
      },
      {
        role: "Treat",
        productId: "barrier-calm-serum",
        why: "Targets visibly dry areas while you sleep.",
        kind: "serum",
      },
      {
        role: "Moisturise",
        productId: "cushion-gel-moisturiser",
        why: "Seals in the serum with a light, breathable layer.",
        kind: "moisturiser",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Explainable recommendation                                          */
/* ------------------------------------------------------------------ */

export const STATED_PREFERENCES: { label: string; value: string }[] = [
  { label: "Goals", value: "Support visibly dry cheeks. Reduce visible shine." },
  { label: "Budget", value: "Up to $40 per product" },
  { label: "Avoid", value: "Added fragrance, essential oils" },
  { label: "Brands", value: "No preference" },
];

export const FILTER_FUNNEL: { label: string; count: number }[] = [
  { label: "Sample catalogue", count: 120 },
  { label: "Within budget", count: 74 },
  { label: "Fragrance-free", count: 51 },
  { label: "Ranked by goal fit", count: 8 },
];

export const MATCH_ROWS: {
  title: string;
  detail: string;
  status: "match" | "note";
}[] = [
  {
    title: "Goal: visibly dry cheeks",
    detail: "Ceramides and panthenol are included to support the skin barrier in areas that look dry.",
    status: "match",
  },
  {
    title: "Budget: $34 of $40",
    detail: "Priced $6 under your per-product limit.",
    status: "match",
  },
  {
    title: "Ingredients: nothing on your avoid list",
    detail: "No added fragrance and no essential oils in the listed ingredients.",
    status: "match",
  },
  {
    title: "Brand preference: not restricted",
    detail: "You chose no preference, so brand did not affect ranking.",
    status: "match",
  },
  {
    title: "Worth knowing",
    detail: "Contains niacinamide, which a small number of people find tingly. Patch test on the jawline first.",
    status: "note",
  },
];

/* ------------------------------------------------------------------ */
/* Progress (illustrative sample only)                                 */
/* ------------------------------------------------------------------ */

export const CAPTURES: {
  label: string;
  date: string;
  shine: number | null;
  comparable: boolean;
  note: string;
}[] = [
  { label: "Baseline", date: "Week 0", shine: 62, comparable: true, note: "Daylight, 40 cm, no filters" },
  { label: "Check-in", date: "Week 4", shine: 51, comparable: true, note: "Matches baseline conditions" },
  {
    label: "Check-in",
    date: "Week 8",
    shine: null,
    comparable: false,
    note: "Warm indoor light, so not compared",
  },
];

/** 4 weeks x 7 days. 2 = morning and evening, 1 = one routine, 0 = skipped. */
export const ADHERENCE: number[][] = [
  [2, 2, 1, 2, 2, 0, 2],
  [2, 1, 2, 2, 2, 2, 1],
  [2, 2, 2, 0, 1, 2, 2],
  [2, 2, 2, 2, 1, 2, 2],
];

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is DermaLens AI a medical or diagnostic tool?",
    a: "No. DermaLens AI describes visible characteristics such as shine, dryness or redness and helps you find products. It does not diagnose skin conditions. If you have a persistent, painful, changing or bleeding skin concern, speak to a doctor or dermatologist.",
  },
  {
    q: "Is this website running a live AI analysis?",
    a: "No. This is a Phase 1 design demo. Every profile, score and recommendation on this page is illustrative sample data, and no image is captured or analysed.",
  },
  {
    q: "How are products recommended?",
    a: "Your budget, ingredient, fragrance and brand preferences are applied first, so incompatible products never appear. The remaining products are then matched to your goals, and each match is explained.",
  },
  {
    q: "Do I have to use my camera?",
    a: "The planned experience offers both a guided capture and a questionnaire route. You will always be told what is captured and why before anything happens.",
  },
  {
    q: "Why does progress tracking need similar photos?",
    a: "Lighting, distance and angle change how skin looks. Comparisons are only shown when two captures were taken in comparable conditions, so you are not misled by a change in the room.",
  },
  {
    q: "Can I use DermaLens AI in a store?",
    a: "That is the Skin Station concept: an in-store kiosk that runs the same assessment and recommendation flow against a retailer's own range. Retailers can find out more on the retailer overview page.",
  },
  {
    q: "What happens to my data?",
    a: "This demo has no accounts, no backend and no tracking of your input. Nothing you click here is sent anywhere. Future phases will explain data handling before any capture is requested.",
  },
  {
    q: "Is it safe for sensitive or reactive skin?",
    a: "Recommendations can exclude ingredients you know bother you, but no tool can guarantee a product will suit you. Patch test new products and introduce them one at a time.",
  },
];

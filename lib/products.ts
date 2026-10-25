/**
 * DermaLens AI – Phase 2 product catalogue data.
 * All products and brands are fictional samples for demonstration purposes.
 * No brand has endorsed DermaLens AI.
 */

export type ProductKind = "serum" | "cleanser" | "moisturiser" | "sunscreen" | "toner";

export type GoalKey =
  | "visible-dryness"
  | "visible-shine"
  | "texture-unevenness"
  | "visible-redness"
  | "tone-variation"
  | "barrier-support"
  | "sun-protection";

export type Product = {
  id: string;
  name: string;
  brand: string;
  kind: ProductKind;
  category: string;
  price: number;
  fragranceFree: boolean;
  vegan: boolean;
  crueltyFree: boolean;
  ingredients: string[];
  keyIngredients: string[];
  features: string[];
  forSkinGoals: GoalKey[];
  rationale: string;
  imageHue: string;
  usageGuidance: string;
  patchTestNote: string;
};

export const SKIN_GOALS: { key: GoalKey; label: string }[] = [
  { key: "visible-dryness", label: "Address visible dryness" },
  { key: "visible-shine", label: "Reduce visible shine" },
  { key: "texture-unevenness", label: "Smooth visible texture" },
  { key: "visible-redness", label: "Calm visible redness" },
  { key: "tone-variation", label: "Even visible tone" },
  { key: "barrier-support", label: "Support skin barrier" },
  { key: "sun-protection", label: "Daily sun protection" },
];

export const PRODUCT_KINDS: ProductKind[] = [
  "serum",
  "cleanser",
  "moisturiser",
  "sunscreen",
  "toner",
];

export const PRODUCT_BRANDS = [
  "Linden Row",
  "Northfold",
  "Aster & Vale",
  "Verde Atelier",
  "Pura Botanics",
  "Solari Lab",
  "Oat & Order",
  "Cove Derma",
] as const;

export const ALL_PRODUCTS: Product[] = [
  /* ── SERUMS ── */
  {
    id: "barrier-calm-serum",
    name: "Barrier Calm Serum",
    brand: "Linden Row",
    kind: "serum",
    category: "Serum",
    price: 34,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Glycerin",
      "Ceramide NP",
      "Ceramide AP",
      "Ceramide EOP",
      "Niacinamide",
      "Panthenol",
      "Sodium Hyaluronate",
      "Cholesterol",
      "Phytosphingosine",
      "Carbomer",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Ceramides", "Niacinamide 4%", "Panthenol"],
    features: [
      "Supports visible dryness and tightness",
      "Lightweight serum texture",
      "Fragrance-free formula",
      "Suitable for sensitive-feeling skin",
    ],
    forSkinGoals: ["visible-dryness", "barrier-support"],
    rationale:
      "Ceramides and panthenol support the appearance of the skin barrier where areas look dry or tight.",
    imageHue: "bg-plum-50",
    usageGuidance:
      "Apply 3–4 drops to cleansed skin, morning or evening. Allow to absorb before the next step.",
    patchTestNote:
      "Contains niacinamide, which a small number of people find tingly. Patch test on the jawline first.",
  },
  {
    id: "clarity-niacinamide",
    name: "Clarity Niacinamide 10%",
    brand: "Northfold",
    kind: "serum",
    category: "Serum",
    price: 22,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Niacinamide",
      "Zinc PCA",
      "Pentylene Glycol",
      "Sodium PCA",
      "Xanthan Gum",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Niacinamide 10%", "Zinc PCA", "Lightweight gel"],
    features: [
      "Targets the look of visible shine across the T-zone",
      "Supports an even-looking complexion",
      "Non-comedogenic gel formula",
    ],
    forSkinGoals: ["visible-shine", "texture-unevenness", "tone-variation"],
    rationale:
      "A high-concentration niacinamide serum aimed at visible shine and uneven texture.",
    imageHue: "bg-rose-50",
    usageGuidance:
      "Use morning and evening on cleansed skin. Apply before heavier creams.",
    patchTestNote:
      "Start with once daily and increase frequency gradually. High-strength niacinamide may cause temporary flushing in some individuals.",
  },
  {
    id: "azelaic-glow-serum",
    name: "Azelaic Glow Serum 10%",
    brand: "Cove Derma",
    kind: "serum",
    category: "Serum",
    price: 38,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Azelaic Acid",
      "Propylene Glycol",
      "Cetearyl Alcohol",
      "Polysorbate 60",
      "Dimethyl Isosorbide",
      "Carbomer",
      "Sodium Hydroxide",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Azelaic Acid 10%", "Silky gel-cream texture"],
    features: [
      "Supports visibly even tone appearance",
      "Addresses visible redness",
      "Suitable for use AM or PM",
    ],
    forSkinGoals: ["visible-redness", "tone-variation", "texture-unevenness"],
    rationale:
      "Azelaic acid is commonly used to support the appearance of an even, calm complexion.",
    imageHue: "bg-blush",
    usageGuidance:
      "Apply a pea-sized amount to cleansed skin morning or evening. Use SPF in the morning.",
    patchTestNote:
      "May cause mild initial warmth or stinging. Begin with every other evening, then increase.",
  },
  {
    id: "peptide-repair-serum",
    name: "Peptide Repair Serum",
    brand: "Pura Botanics",
    kind: "serum",
    category: "Serum",
    price: 52,
    fragranceFree: true,
    vegan: false,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Glycerin",
      "Palmitoyl Tripeptide-1",
      "Palmitoyl Tetrapeptide-7",
      "Sodium Hyaluronate",
      "Butylene Glycol",
      "Panthenol",
      "Niacinamide",
      "Allantoin",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Palmitoyl Tripeptide-1", "Sodium Hyaluronate", "Allantoin"],
    features: [
      "Supports visible skin comfort",
      "Plumping serum texture",
      "Fragrance-free",
    ],
    forSkinGoals: ["barrier-support", "visible-dryness"],
    rationale:
      "Peptide-rich formula designed to support the visible appearance of skin texture and comfort.",
    imageHue: "bg-plum-100",
    usageGuidance: "Apply 2–3 drops morning and evening before moisturiser.",
    patchTestNote:
      "Contains multiple peptide complexes. Introduce gradually if combining with other actives.",
  },
  {
    id: "vitamin-c-brightening-serum",
    name: "Radiance Vitamin C 15%",
    brand: "Solari Lab",
    kind: "serum",
    category: "Serum",
    price: 44,
    fragranceFree: false,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "3-O-Ethyl Ascorbic Acid",
      "Propanediol",
      "Sodium Hyaluronate",
      "Ferulic Acid",
      "Tocopherol",
      "Citrus Aurantium Bergamia Peel Oil (Bergapten-free)",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Vitamin C 15%", "Ferulic Acid", "Vitamin E"],
    features: [
      "Antioxidant-rich morning serum",
      "Supports visible luminosity",
      "Lightly scented",
    ],
    forSkinGoals: ["tone-variation", "visible-redness"],
    rationale:
      "A stable vitamin C with ferulic acid for a brightened, visibly even-toned complexion.",
    imageHue: "bg-rose-100",
    usageGuidance:
      "Apply 4–5 drops to cleansed skin in the morning only. Follow with SPF.",
    patchTestNote:
      "Contains bergapten-free citrus oil — lightly scented. Skip if you prefer strictly fragrance-free.",
  },

  /* ── CLEANSERS ── */
  {
    id: "soft-foam-cleanser",
    name: "Soft Foam Cleanser",
    brand: "Aster & Vale",
    kind: "cleanser",
    category: "Cleanser",
    price: 18,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Cocamidopropyl Betaine",
      "Sodium Cocoyl Isethionate",
      "Glycerin",
      "Panthenol",
      "Sodium PCA",
      "Citric Acid",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Amino-acid surfactants", "Glycerin", "pH-balanced"],
    features: [
      "Removes oil and sunscreen without stripping",
      "Maintains skin's natural pH",
      "Fragrance-free, gentle lather",
    ],
    forSkinGoals: ["visible-dryness", "visible-redness", "barrier-support"],
    rationale:
      "A pH-balanced amino-acid cleanser that removes debris without disrupting the skin barrier.",
    imageHue: "bg-paper",
    usageGuidance:
      "Use morning and evening. Massage onto damp skin for 30 seconds, rinse thoroughly.",
    patchTestNote: "Well-tolerated by most skin types. Safe for daily use.",
  },
  {
    id: "salicylic-clarifying-wash",
    name: "Clarifying Salicylic Wash",
    brand: "Northfold",
    kind: "cleanser",
    category: "Cleanser",
    price: 24,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Salicylic Acid",
      "Cocamidopropyl Betaine",
      "Glycerin",
      "Zinc PCA",
      "Sodium Chloride",
      "Citric Acid",
      "Phenoxyethanol",
    ],
    keyIngredients: ["Salicylic Acid 1%", "Zinc PCA", "Gentle surfactant base"],
    features: [
      "Helps visible shine and congestion",
      "Suitable for oily-feeling areas",
      "Fragrance-free",
    ],
    forSkinGoals: ["visible-shine", "texture-unevenness"],
    rationale:
      "A low-level BHA cleanser for targeting visible shine and surface texture.",
    imageHue: "bg-plum-50",
    usageGuidance:
      "Use once daily in the evening. Avoid eye area. Follow with a gentle moisturiser.",
    patchTestNote:
      "Contains salicylic acid. Avoid if aspirin-sensitive. Introduce gradually if new to BHA.",
  },
  {
    id: "oat-calming-cleanser",
    name: "Oat Comfort Cleanser",
    brand: "Oat & Order",
    kind: "cleanser",
    category: "Cleanser",
    price: 20,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Avena Sativa Kernel Extract",
      "Sodium Cocoyl Glutamate",
      "Glycerin",
      "Allantoin",
      "Panthenol",
      "Beta-Glucan",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Oat Extract", "Beta-Glucan", "Allantoin"],
    features: [
      "Soothing, non-foaming cleanse",
      "Suited for reactive or sensitive-feeling skin",
      "Fragrance-free",
    ],
    forSkinGoals: ["visible-redness", "visible-dryness", "barrier-support"],
    rationale:
      "Oat extract and beta-glucan support a calm-looking complexion after cleansing.",
    imageHue: "bg-blush",
    usageGuidance:
      "Massage onto dry or damp skin, rinse with lukewarm water. Suitable twice daily.",
    patchTestNote:
      "Contains oat. Patch test if you have a known oat or gluten sensitivity.",
  },
  {
    id: "micellar-oil-balm",
    name: "Micellar Oil Cleansing Balm",
    brand: "Verde Atelier",
    kind: "cleanser",
    category: "Cleanser",
    price: 32,
    fragranceFree: false,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Caprylic/Capric Triglyceride",
      "Squalane",
      "Helianthus Annuus Seed Oil",
      "Polysorbate 80",
      "Tocopherol",
      "Rosa Damascena Flower Water",
      "Phenoxyethanol",
    ],
    keyIngredients: ["Squalane", "Sunflower Seed Oil", "Vitamin E"],
    features: [
      "Dissolves sunscreen and long-wear makeup",
      "Balm texture, rinses clear",
      "Lightly scented with rose water",
    ],
    forSkinGoals: ["visible-dryness", "barrier-support"],
    rationale:
      "A first-cleanse balm for PM double-cleansing. Contains rose water — not fragrance-free.",
    imageHue: "bg-rose-50",
    usageGuidance:
      "Apply to dry skin, massage for 60 seconds, emulsify with water and rinse. First step only.",
    patchTestNote:
      "Contains rosa damascena. Patch test if sensitive to rose-derived ingredients.",
  },

  /* ── MOISTURISERS ── */
  {
    id: "cushion-gel-moisturiser",
    name: "Cushion Gel Moisturiser",
    brand: "Verde Atelier",
    kind: "moisturiser",
    category: "Moisturiser",
    price: 38,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Sodium Hyaluronate",
      "Squalane",
      "Glycerin",
      "Niacinamide",
      "Panthenol",
      "Dimethicone",
      "Carbomer",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Hyaluronic Acid", "Squalane", "Non-greasy finish"],
    features: [
      "Water-light hydration",
      "Balances dryness without adding shine",
      "Fragrance-free gel-cream texture",
    ],
    forSkinGoals: ["visible-dryness", "visible-shine", "barrier-support"],
    rationale:
      "Adds water-light hydration where areas look dry without increasing visible shine.",
    imageHue: "bg-plum-50",
    usageGuidance:
      "Apply a pea-sized amount morning and evening after serum, before SPF (morning).",
    patchTestNote:
      "Contains dimethicone — suitable for most skin types. Not recommended if you prefer silicone-free.",
  },
  {
    id: "rich-barrier-cream",
    name: "Rich Barrier Cream",
    brand: "Linden Row",
    kind: "moisturiser",
    category: "Moisturiser",
    price: 46,
    fragranceFree: true,
    vegan: false,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Glycerin",
      "Cetearyl Alcohol",
      "Ceramide NP",
      "Ceramide AP",
      "Cholesterol",
      "Sodium Hyaluronate",
      "Shea Butter",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Ceramides", "Shea Butter", "Cholesterol"],
    features: [
      "Rich cream texture for drier feeling skin",
      "Supports visible skin comfort overnight",
      "Fragrance-free",
    ],
    forSkinGoals: ["visible-dryness", "barrier-support"],
    rationale:
      "A ceramide-rich cream for areas that look noticeably dry, especially effective as an evening moisturiser.",
    imageHue: "bg-blush",
    usageGuidance: "Apply generously to face and neck in the evening. Can layer over serums.",
    patchTestNote: "Contains shea butter (not vegan). Patch test if nut-sensitive.",
  },
  {
    id: "lightweight-daily-lotion",
    name: "Everyday Balance Lotion",
    brand: "Oat & Order",
    kind: "moisturiser",
    category: "Moisturiser",
    price: 28,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Glycerin",
      "Niacinamide",
      "Isohexadecane",
      "Cetearyl Alcohol",
      "Dimethicone",
      "Tocopherol",
      "Panthenol",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Niacinamide 5%", "Vitamin E", "Panthenol"],
    features: [
      "Fast-absorbing lotion",
      "Balanced finish for combination-feeling skin",
      "Fragrance-free",
    ],
    forSkinGoals: ["visible-shine", "tone-variation", "visible-dryness"],
    rationale:
      "A lightweight, niacinamide-boosted moisturiser that hydrates without adding visible shine.",
    imageHue: "bg-paper",
    usageGuidance:
      "Use morning and evening. Apply to slightly damp skin for best absorption.",
    patchTestNote: "Contains niacinamide. Generally well-tolerated.",
  },
  {
    id: "redness-calm-cream",
    name: "Calm & Restore Cream",
    brand: "Cove Derma",
    kind: "moisturiser",
    category: "Moisturiser",
    price: 42,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Glycerin",
      "Centella Asiatica Extract",
      "Madecassoside",
      "Asiaticoside",
      "Ceramide NP",
      "Allantoin",
      "Beta-Glucan",
      "Panthenol",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Centella Asiatica", "Madecassoside", "Beta-Glucan"],
    features: [
      "Calming cream for reactive-looking skin",
      "Supports visibly reduced redness",
      "Fragrance-free",
    ],
    forSkinGoals: ["visible-redness", "barrier-support", "visible-dryness"],
    rationale:
      "Centella asiatica and madecassoside are often used for a visibly calm, less-red complexion.",
    imageHue: "bg-plum-100",
    usageGuidance:
      "Apply morning and evening. Can be used as a spot treatment on areas that look red.",
    patchTestNote:
      "Centella extracts are generally well-tolerated but patch test if sensitive to herbal ingredients.",
  },

  /* ── SUNSCREENS ── */
  {
    id: "daily-mineral-spf50",
    name: "Daily Mineral SPF 50",
    brand: "Northfold",
    kind: "sunscreen",
    category: "Sunscreen",
    price: 28,
    fragranceFree: false,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Zinc Oxide 22%",
      "Aqua",
      "Glycerin",
      "Isononyl Isononanoate",
      "Dimethicone",
      "Phenyl Trimethicone",
      "Parfum",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Zinc Oxide 22%", "Broad spectrum SPF 50", "Sheer finish"],
    features: [
      "Mineral daytime filter",
      "Sheer on most skin tones",
      "Lightly scented",
    ],
    forSkinGoals: ["sun-protection"],
    rationale:
      "A mineral SPF for daily UV protection. Lightly scented — excluded from fragrance-free results.",
    imageHue: "bg-rose-50",
    usageGuidance:
      "Apply as the final morning step. Reapply every 2 hours if outdoors.",
    patchTestNote:
      "Lightly scented with parfum. Choose the fragrance-free alternative if you are sensitive.",
  },
  {
    id: "invisible-chemical-spf50",
    name: "Invisible Shield SPF 50+",
    brand: "Solari Lab",
    kind: "sunscreen",
    category: "Sunscreen",
    price: 32,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Ethylhexyl Methoxycinnamate",
      "Uvasorb HEB",
      "Tinosorb S",
      "Glycerin",
      "Niacinamide",
      "Panthenol",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Tinosorb S", "Niacinamide", "Invisible finish"],
    features: [
      "Chemical broad-spectrum filter",
      "Invisible finish on all skin tones",
      "Fragrance-free",
    ],
    forSkinGoals: ["sun-protection", "visible-shine"],
    rationale:
      "A lightweight chemical SPF with niacinamide for a shine-free finish — fragrance-free.",
    imageHue: "bg-plum-50",
    usageGuidance:
      "Apply generously as the final morning step. Use 1/4 teaspoon for the face.",
    patchTestNote:
      "Contains chemical filters. If photosensitive or patch testing, try on the inner arm first.",
  },
  {
    id: "tinted-mineral-spf30",
    name: "Tinted Mineral SPF 30",
    brand: "Pura Botanics",
    kind: "sunscreen",
    category: "Sunscreen",
    price: 36,
    fragranceFree: false,
    vegan: false,
    crueltyFree: true,
    ingredients: [
      "Zinc Oxide 15%",
      "Titanium Dioxide 5%",
      "Iron Oxides",
      "Aqua",
      "Glycerin",
      "Squalane",
      "Rosa Canina Fruit Oil",
      "Phenoxyethanol",
      "Parfum",
    ],
    keyIngredients: ["Zinc Oxide", "Titanium Dioxide", "Iron Oxides (light tint)"],
    features: [
      "Mineral SPF 30 with light tint",
      "Helps neutralise visible redness",
      "Suitable as a lightweight primer base",
    ],
    forSkinGoals: ["sun-protection", "visible-redness", "tone-variation"],
    rationale:
      "A tinted mineral sunscreen — iron oxides can help neutralise visible redness. Contains fragrance.",
    imageHue: "bg-rose-100",
    usageGuidance:
      "Shake gently before use. Apply as the final morning step. One shade — adjust as needed.",
    patchTestNote:
      "Contains iron oxides and parfum. Not fragrance-free or vegan.",
  },

  /* ── TONERS ── */
  {
    id: "gentle-lactic-toner",
    name: "Gentle Lactic Toner",
    brand: "Verde Atelier",
    kind: "toner",
    category: "Exfoliating Toner",
    price: 46,
    fragranceFree: false,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Lactic Acid",
      "Aloe Barbadensis Leaf Extract",
      "Sodium Lactate",
      "Glycerin",
      "Sodium Hydroxide",
      "Rosa Damascena Flower Water",
      "Phenoxyethanol",
    ],
    keyIngredients: ["Lactic Acid 5%", "Aloe Vera", "Twice-weekly use"],
    features: [
      "Gentle AHA exfoliant",
      "Targets visible surface texture",
      "Rose-scented formula",
    ],
    forSkinGoals: ["texture-unevenness", "tone-variation"],
    rationale:
      "Lactic acid addresses surface texture. Lightly scented — excluded from fragrance-free results.",
    imageHue: "bg-rose-50",
    usageGuidance:
      "Apply with a cotton pad after cleansing, twice weekly in the evening. Do not rinse.",
    patchTestNote:
      "Contains AHA. Use SPF the following morning. Start once weekly. Avoid with other exfoliating actives.",
  },
  {
    id: "hydrating-toner-essence",
    name: "Hydra Balance Essence",
    brand: "Oat & Order",
    kind: "toner",
    category: "Hydrating Toner",
    price: 26,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Propanediol",
      "Glycerin",
      "Niacinamide",
      "Panthenol",
      "Sodium PCA",
      "Avena Sativa Kernel Extract",
      "Sodium Hyaluronate",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Niacinamide", "Sodium Hyaluronate", "Oat Extract"],
    features: [
      "Watery essence consistency",
      "Preps skin for serums",
      "Fragrance-free",
    ],
    forSkinGoals: ["visible-dryness", "visible-shine", "barrier-support"],
    rationale:
      "A hydrating prep toner that adds a base layer of moisture without fragrance.",
    imageHue: "bg-blush",
    usageGuidance:
      "Apply to cleansed skin with hands or a cotton pad morning and evening before serums.",
    patchTestNote: "Contains oat extract. Patch test if oat-sensitive.",
  },
  {
    id: "pha-refining-toner",
    name: "PHA Refining Toner",
    brand: "Cove Derma",
    kind: "toner",
    category: "Exfoliating Toner",
    price: 34,
    fragranceFree: true,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Gluconolactone",
      "Lactobionic Acid",
      "Glycerin",
      "Niacinamide",
      "Aloe Barbadensis Leaf Extract",
      "Sodium Hyaluronate",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],
    keyIngredients: ["Gluconolactone (PHA)", "Lactobionic Acid", "Niacinamide"],
    features: [
      "Gentle polyhydroxy acid exfoliant",
      "Hydrating while refining",
      "Fragrance-free, suitable for sensitive-feeling skin",
    ],
    forSkinGoals: ["texture-unevenness", "tone-variation", "visible-dryness"],
    rationale:
      "PHAs exfoliate gently while retaining moisture — suitable for sensitive-feeling skin.",
    imageHue: "bg-plum-50",
    usageGuidance:
      "Apply daily after cleansing. Suitable for morning or evening use.",
    patchTestNote:
      "Contains PHA exfoliants — milder than AHA but patch test if reactive. Use SPF in the morning.",
  },
  {
    id: "witch-hazel-clarifying-toner",
    name: "Clarifying Botanical Toner",
    brand: "Pura Botanics",
    kind: "toner",
    category: "Clarifying Toner",
    price: 22,
    fragranceFree: false,
    vegan: true,
    crueltyFree: true,
    ingredients: [
      "Aqua",
      "Hamamelis Virginiana Distillate",
      "Niacinamide",
      "Zinc PCA",
      "Glycerin",
      "Aloe Barbadensis Leaf Extract",
      "Salicylic Acid",
      "Lavandula Angustifolia Oil",
      "Phenoxyethanol",
    ],
    keyIngredients: ["Witch Hazel", "Zinc PCA", "Lavender Oil (fragrant)"],
    features: [
      "Targets visible shine and congestion",
      "Herbal botanical formula",
      "Lightly scented with lavender",
    ],
    forSkinGoals: ["visible-shine", "texture-unevenness"],
    rationale:
      "A clarifying toner with witch hazel and zinc for oily-feeling zones. Contains lavender oil — not fragrance-free.",
    imageHue: "bg-plum-100",
    usageGuidance:
      "Apply with a cotton pad after cleansing, evenings only. Not for daily use.",
    patchTestNote:
      "Contains lavender essential oil. Not fragrance-free. Avoid if sensitive to essential oils.",
  },
];

# DermaLens AI — Full Platform (Phases 1–4)

> See your skin. Understand your needs. Find what fits.

DermaLens AI is an AI-powered, non-diagnostic visual skin-assessment and explainable skincare recommendation platform for consumers and retail Skin Stations.

This is a **strictly frontend-only** modern Next.js web application built with App Router, TypeScript, and Tailwind CSS. All profiles, scores, products, and prices are **illustrative sample data**. There is no backend server, no database, no authentication service, no payments, and no external AI API calls. Facial images are processed locally in the browser and never uploaded.

---

## Key Features Across Phases

### Phase 1: Brand & Marketing Foundation
- Editorial design system using the official **Plum** (`#3D285E`), **Rose** (`#D65370`), and soft **Off-white** (`#FCFAFC`) brand palette.
- Official DermaLens AI brand logo integration from `public/brand/logo.png`.
- Full homepage: Hero with sample skin profile composition, Trust pillars, How It Works, Skin Insights preview, Product Discovery preview with live budget/fragrance filtering, Morning & Evening Routine tabs, Explainable recommendations, Retail Skin Station preview, Progress tracking with adherence matrix, comprehensive FAQs, and responsive navigation.

### Phase 2: Product Catalogue & Explainable Recommendations
- **Product Catalogue (`/products`):** Interactive search by name or ingredients, 5 category filters (serum, cleanser, moisturiser, sunscreen, toner), budget filters, brand filters, fragrance-free / vegan / cruelty-free toggles, sort by price and relevance, active filter chips, clear-all, and empty states.
- **Product Detail Pages (`/products/[id]`):** Rich product profiles with full INCI ingredient list (expandable), key actives, stated cosmetic benefits, conservative usage guidance, jawline patch-test advice, skin goal suitability matrix, preference compatibility checks, similar products, and wishlist + comparison controls.
- **Explainable Recommendations (`/recommendations`):** Constraint-first recommendation demo. Mandatory hard constraints (budget caps, ingredient exclusions, fragrance-free, vegan, cruelty-free) are applied **first** to exclude ineligible products. Remaining products are scored and ranked against stated skin goals with transparent, plain-language match reasons. If no products match, the exact blocking constraints are explained.
- **Product Comparison (`/compare`):** Side-by-side comparison matrix for up to three products (price, category, key ingredients, fragrance, certifications, cosmetic benefits, and goal suitability) with mobile-responsive stacked cards.
- **Compare Bar:** Floating dock that appears whenever products are added to the comparison list.

### Phase 3: Skin Assessment & Interactive Results
- **Guided Assessment Journey (`/assessment`):** Multi-step questionnaire with progress indicator, keyboard accessible controls, and back/forward navigation:
  1. Introduction explaining the non-diagnostic scope and privacy guarantees.
  2. Multi-select skin goals (dryness, shine, texture, redness, tone, barrier, SPF).
  3. Self-reported skin feel (oily, dry, combination, sensitive, blemish-prone, redness-prone, balanced).
  4. Per-product budget selection.
  5. Preferred brand multi-select.
  6. Ingredient exclusion list with pre-populated common irritants and custom tags.
  7. Fragrance, vegan, and cruelty-free constraints + routine preference.
  8. Freeform existing routine input (stored client-side).
  9. **Optional image capture interface:** Drag-and-drop or file upload for JPEG/PNG/WebP, local preview, camera guidance (front, lighting, distance), simulated quality check with retry and remove options. No images are sent to any server.
  10. Review screen with one-click edit links for any step.
  11. **Illustrated skin profile:** Simulated skin attributes (shine, dryness, redness, texture, tone, pores) with confidence and quality scores, prominent non-diagnostic medical notices, and handoff to filtered recommendations.

### Phase 4: Dashboard, Routines, Progress Tracking & Retail Skin Station
- **Consumer Dashboard (`/dashboard`):** Overview of skin profile snapshot, top recommended products, quick-action routine completion, weekly adherence metrics, and capture history.
- **AM/PM Routines (`/routines`):** Morning and evening routine manager with interactive step checkboxes, progress percentage bar, step removal and restoration, and safe client-side localStorage persistence with a one-click reset action.
- **Progress Tracking (`/progress`):** Visual 4-week routine adherence matrix, capture history with condition comparability indicator (lighting/angle validation), visible shine trend chart across comparable captures, and educational context on why standardized capture conditions matter.
- **Retail Skin Station Kiosk (`/kiosk`):** Dedicated, full-screen, touch-friendly in-store kiosk experience:
  1. Welcome screen with prominent privacy notice.
  2. Large touch controls for selecting skin goals and budget.
  3. Simulated scan animation with circular progress indicator.
  4. Clear sample skin-profile results labelled as demo data.
  5. In-store product recommendations filtered by store inventory constraints.
  6. Session reset to welcome screen for the next shopper.
- **Retailer Information (`/retailers`):** Overview of the Skin Station retail concept, hardware features, staff briefing, and frontend pilot enquiry form with clear non-diagnostic disclosures.

---

## Technology Stack

| Concern | Choice (pinned in `package.json`) |
| --- | --- |
| Framework | Next.js 15.5.28 (App Router, Static Site Generation) |
| UI Library | React 19.1.10 |
| Language | TypeScript 5.7.2 (strict mode) |
| Styling | Tailwind CSS 3.4.17 + PostCSS + Autoprefixer |
| Icons | Lucide React 0.468.0 |
| Fonts | Fraunces (display serif) & Instrument Sans (body) via `next/font/google` |

---

## Local Setup & Development

### Requirements
- Node.js 18.18+ (Node 20 or 22 recommended)
- npm 9+

### Commands
```bash
# Install dependencies
npm install

# Start local development server (runs on http://localhost:3000)
npm run dev

# Run production build
npm run build

# Start production server
npm run start

# Run TypeScript type check
npm run typecheck
```

---

## Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, click **Add New → Project** and select the repository.
3. Framework Preset: **Next.js** (automatically detected).
4. Build command: `npm run build` (default).
5. Output directory: `.next` (default).
6. Environment variables: **None required** (the project is 100% frontend and self-contained).
7. Click **Deploy**.

---

## Ethical & Non-Diagnostic Notice

DermaLens AI describes visible skin characteristics and explains product suitability based on cosmetic formulation characteristics. It is **not** a medical device, diagnostic tool, or clinical assessment service. It does not diagnose, treat, cure, or prevent any dermatological disease or skin condition. Users with persistent, painful, inflamed, bleeding, or rapidly changing skin lesions are advised to consult a board-certified dermatologist or medical professional. All profiles, scores, and product endorsements shown across this platform are illustrative sample data created for demonstration purposes.

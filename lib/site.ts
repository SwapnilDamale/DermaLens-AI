export const SITE = {
  name: "DermaLens AI",
  tagline: "See your skin. Understand your needs. Find what fits.",
  description:
    "DermaLens AI is a non-diagnostic visual skin-assessment and explainable skincare recommendation platform. Set your budget, ingredient and fragrance limits first, then see exactly why each product fits.",
  currency: "$",
  contactEmail: "hello@dermalens.example",
} as const;

export const NAV_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Products", href: "/products" },
  { label: "Recommendations", href: "/recommendations" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/about" },
  { label: "For Retailers", href: "/retailers" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Skin assessment", href: "/assessment" },
    { label: "Product catalogue", href: "/products" },
    { label: "Recommendations demo", href: "/recommendations" },
    { label: "Compare products", href: "/compare" },
    { label: "AM / PM routines", href: "/routines" },
    { label: "Progress tracking", href: "/progress" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  retailers: [
    { label: "Skin Station concept", href: "/retailers" },
    { label: "Kiosk demo", href: "/kiosk" },
    { label: "Pilot enquiries", href: "/retailers#enquire" },
    { label: "Contact", href: "/contact" },
  ],
  trust: [
    { label: "About the team", href: "/about" },
    { label: "Safety and non-diagnostic notice", href: "/safety" },
    { label: "Privacy", href: "/privacy" },
    { label: "FAQs", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

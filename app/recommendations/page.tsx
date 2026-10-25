import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import RecommendationClient from "@/components/products/RecommendationClient";

export const metadata: Metadata = {
  title: "Recommendations demo",
  description:
    "A client-side demonstration of constraint-first skincare product recommendations. No AI model or server is used.",
};

export default function RecommendationsPage() {
  return (
    <>
      <section className="border-b border-line bg-blush py-16 sm:py-20">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wider text-rose">
            Recommendation Demo
          </p>
          <h1 className="h-display mt-4 max-w-3xl text-5xl sm:text-6xl">
            Find products that fit your rules
          </h1>
          <p className="lede mt-6">
            Set your goals, budget and ingredient preferences. Hard constraints are applied
            first — only products that pass every requirement are shown. Then they are ranked
            by how well they match your goals. Each recommendation is explained in plain language.
          </p>
        </Container>
      </section>

      <RecommendationClient />
    </>
  );
}

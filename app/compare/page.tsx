import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import CompareClient from "@/components/products/CompareClient";

export const metadata: Metadata = {
  title: "Compare products",
  description: "Compare up to three skincare products side by side.",
};

export default function ComparePage() {
  return (
    <>
      <section className="border-b border-line bg-blush py-16 sm:py-20">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wider text-rose">
            Product Comparison
          </p>
          <h1 className="h-display mt-4 max-w-2xl text-5xl sm:text-6xl">
            Compare up to three products
          </h1>
          <p className="lede mt-6">
            Add products to your comparison list from the catalogue or detail pages,
            then review them side by side here.
          </p>
        </Container>
      </section>

      <CompareClient />
    </>
  );
}

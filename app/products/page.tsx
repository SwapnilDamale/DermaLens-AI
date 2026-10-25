import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import CatalogueClient from "@/components/products/CatalogueClient";

export const metadata: Metadata = {
  title: "Product catalogue",
  description:
    "Browse skincare products filtered by budget, fragrance, ingredients and your skin goals. All products are illustrative samples.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-line bg-blush py-16 sm:py-20">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wider text-rose">
            Product Discovery
          </p>
          <h1 className="h-display mt-4 max-w-3xl text-5xl sm:text-6xl">
            Find what fits your skin
          </h1>
          <p className="lede mt-6">
            Filter by budget, fragrance preference, ingredients to avoid and your skin goals.
            Every product shows exactly what matches and what to keep in mind.
          </p>
        </Container>
      </section>

      <CatalogueClient />
    </>
  );
}

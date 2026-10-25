import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/lib/products";
import ProductDetailClient from "@/components/products/ProductDetailClient";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === id);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — ${product.brand}`,
    description: product.rationale,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}

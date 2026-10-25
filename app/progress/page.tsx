import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import ProgressClient from "@/components/progress/ProgressClient";

export const metadata: Metadata = {
  title: "Progress tracking",
  description: "Track your skincare routine adherence and skin profile over time.",
};

export default function ProgressPage() {
  return (
    <>
      <section className="border-b border-line bg-blush py-12 sm:py-16">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wider text-rose">Progress Tracking</p>
          <h1 className="h-display mt-3 max-w-2xl text-4xl sm:text-5xl">
            How your skin is doing
          </h1>
          <p className="lede mt-4">
            Track routine adherence over time. Skin comparisons only appear when captures were taken in comparable conditions.
          </p>
        </Container>
      </section>
      <ProgressClient />
    </>
  );
}

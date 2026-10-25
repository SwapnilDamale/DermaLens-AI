import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Your dashboard",
  description: "Your DermaLens AI skin dashboard — routines, progress and recommendations.",
};

export default function DashboardPage() {
  return (
    <>
      <section className="border-b border-line bg-blush py-12 sm:py-16">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wider text-rose">Dashboard</p>
          <h1 className="h-display mt-3 max-w-2xl text-4xl sm:text-5xl">
            Your skin, your routine
          </h1>
          <p className="lede mt-4">
            Track your AM/PM routine, review your skin profile and discover compatible products — all in one place.
          </p>
        </Container>
      </section>
      <DashboardClient />
    </>
  );
}

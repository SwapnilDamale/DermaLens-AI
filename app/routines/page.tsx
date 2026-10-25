import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import RoutineClient from "@/components/routines/RoutineClient";

export const metadata: Metadata = {
  title: "Your routines",
  description: "Your personalised morning and evening skincare routines.",
};

export default function RoutinesPage() {
  return (
    <>
      <section className="border-b border-line bg-blush py-12 sm:py-16">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wider text-rose">AM / PM Routines</p>
          <h1 className="h-display mt-3 max-w-2xl text-4xl sm:text-5xl">
            Morning and evening routines
          </h1>
          <p className="lede mt-4">
            Check off each step as you go. Remove steps you skip, and restore them any time. Progress resets each day.
          </p>
        </Container>
      </section>
      <RoutineClient />
    </>
  );
}

import type { Metadata } from "next";
import AssessmentClient from "@/components/assessment/AssessmentClient";

export const metadata: Metadata = {
  title: "Skin assessment",
  description:
    "A non-diagnostic visual skin assessment and preference questionnaire. Tells DermaLens AI your goals, budget and ingredient preferences to surface compatible products.",
};

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="border-b border-line bg-blush py-10 sm:py-14">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-rose">
            Phase 3 — Skin Assessment
          </p>
          <h1 className="h-display mt-4 text-4xl sm:text-5xl">
            Start your assessment
          </h1>
          <p className="lede mt-4">
            Answer a short questionnaire about your goals and preferences. An optional photo step
            is included — it is never required and nothing is sent to any server.
          </p>
        </div>
      </div>
      <AssessmentClient />
    </div>
  );
}

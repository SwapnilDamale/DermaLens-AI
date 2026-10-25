import type { Metadata } from "next";
import { PageBlock, PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = { title: "Safety and non-diagnostic notice" };

export default function Page() {
  return (
    <PageShell
      title="Safety and non-diagnostic notice"
      intro="DermaLens AI helps you understand visible skin characteristics and find suitable products. It is not a medical service."
      primary={{ label: "Read the FAQs", href: "/#faq" }}
      secondary={{ label: "Back to home", href: "/" }}
    >
      <PageBlock title="Non-diagnostic by design">
        <p>
          We describe what is visible, such as shine, dryness or redness. We do not diagnose conditions, detect
          disease or recommend medical treatment.
        </p>
      </PageBlock>
      <PageBlock title="When to see a professional">
        <p>
          Speak to a doctor or dermatologist about any mole or spot that changes, bleeds or looks unusual, any
          persistent or painful skin problem, or a reaction that does not settle.
        </p>
      </PageBlock>
      <PageBlock title="Using products safely">
        <p>
          No recommendation can guarantee a product will suit you. Patch test new products, introduce them one at a
          time, and stop if irritation occurs. Check the ingredient list yourself if you have known allergies.
        </p>
      </PageBlock>
    </PageShell>
  );
}

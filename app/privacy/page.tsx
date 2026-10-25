import type { Metadata } from "next";
import { PageBlock, PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = { title: "Privacy" };

export default function Page() {
  return (
    <PageShell
      title="Privacy"
      intro="A short statement for the Phase 1 demo. A full privacy policy will be written before any real data is collected."
      status="Demo-phase notice, not a legal policy"
      primary={{ label: "Safety notice", href: "/safety" }}
      secondary={{ label: "Back to home", href: "/" }}
    >
      <PageBlock title="What this demo does with your data">
        <p>
          Nothing. The site has no backend, no accounts, no analytics and no image capture. Choices you make in the
          interactive previews, such as the price limit, stay in your browser tab and are not sent anywhere.
        </p>
      </PageBlock>
      <PageBlock title="What will change">
        <p>
          When assessment features arrive, DermaLens AI will explain what is captured, why, how long it is kept and
          how to delete it, before asking for a photo or any personal detail.
        </p>
      </PageBlock>
    </PageShell>
  );
}

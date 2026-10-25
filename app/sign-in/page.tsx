import type { Metadata } from "next";
import { PageBlock, PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = { title: "Sign in" };

export default function Page() {
  return (
    <PageShell
      title="Sign in"
      intro="Accounts are not part of this phase. There is nothing to sign in to yet, and this demo stores no personal data."
      status="Coming in a later phase"
      primary={{ label: "Explore the homepage", href: "/" }}
      secondary={{ label: "Start Skin Assessment", href: "/assessment" }}
    >
      <PageBlock title="Why there is no form here">
        <p>
          This site is a frontend-only demo. It has no backend, no database and no authentication provider, so
          collecting an email address or password would be misleading.
        </p>
      </PageBlock>
    </PageShell>
  );
}

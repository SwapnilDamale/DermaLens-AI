import type { Metadata } from "next";
import { PageBlock, PageShell } from "@/components/layout/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return (
    <PageShell
      title="Contact"
      intro="Retailer pilots and general enquiries."
      status="Placeholder contact details"
      primary={{ label: "Back to home", href: "/" }}
    >
      <PageBlock title="Email">
        <p>{SITE.contactEmail}</p>
        <p>
          This address is a placeholder on a reserved example domain. Replace it in <code>lib/site.ts</code> before
          launch. No contact form is included because this demo has no backend.
        </p>
      </PageBlock>
    </PageShell>
  );
}

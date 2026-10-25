"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS, SITE } from "@/lib/site";

function Column({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-display text-lg font-normal text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-[15px] text-plum-200 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/kiosk") return null;
  return (
    <footer className="bg-plum-900 text-plum-200">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="DermaLens AI home">
              <Logo tone="light" />
            </Link>
            <p className="mt-6 font-display text-xl font-light leading-snug text-white">{SITE.tagline}</p>
            <p className="mt-4 text-[15px] leading-relaxed">
              A non-diagnostic visual skin assessment and explainable skincare recommendation platform for consumers
              and retailers.
            </p>
          </div>
          <Column title="Product" links={FOOTER_LINKS.product} />
          <Column title="Retailers" links={FOOTER_LINKS.retailers} />
          <Column title="Trust and support" links={FOOTER_LINKS.trust} />
        </div>

        <div className="mt-16 border-t border-white/15 pt-8 text-sm leading-relaxed">
          <p className="max-w-3xl">
            DermaLens AI provides non-diagnostic information about visible skin characteristics and product
            suitability. It is not medical advice. Speak to a qualified professional about any skin concern. This
            site is a Phase 1 design demo: all profiles, scores and products shown are illustrative samples.
          </p>
          <p className="mt-4">&copy; {new Date().getFullYear()} DermaLens AI. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

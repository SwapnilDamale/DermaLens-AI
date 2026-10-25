import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type Cta = { label: string; href: string };

/** Shared layout for secondary pages, including "coming in a later phase" pages. */
export function PageShell({
  title,
  intro,
  status,
  children,
  primary,
  secondary,
}: {
  title: string;
  intro: string;
  status?: string;
  children?: ReactNode;
  primary?: Cta;
  secondary?: Cta;
}) {
  return (
    <>
      <section className="border-b border-line bg-blush py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-slate">
            <Link href="/" className="hover:text-plum">
              Home
            </Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <h1 className="h-display mt-8 max-w-3xl text-5xl sm:text-6xl">{title}</h1>
          <p className="lede mt-6">{intro}</p>
          {status ? <p className="badge-demo mt-6">{status}</p> : null}
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl space-y-10 text-[17px] leading-relaxed text-slate">{children}</div>
          {(primary || secondary) && (
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              {primary && (
                <ButtonLink href={primary.href}>
                  {primary.label} <ArrowRight size={18} aria-hidden="true" />
                </ButtonLink>
              )}
              {secondary && (
                <ButtonLink href={secondary.href} variant="secondary">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export function PageBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-normal text-ink">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

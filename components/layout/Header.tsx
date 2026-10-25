"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  if (pathname === "/kiosk") return null;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-paper/95 backdrop-blur" : "border-transparent bg-paper"
      }`}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="DermaLens AI home" onClick={close} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] text-slate transition-colors hover:text-plum"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/sign-in" className="px-3 text-[15px] font-medium text-plum hover:text-rose-700">
            Sign in
          </Link>
          <ButtonLink href="/assessment" className="!h-11">
            Get Started
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-plum hover:bg-plum-50 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-paper lg:hidden">
          <Container className="pb-8 pt-4">
            <nav aria-label="Mobile">
              <ul className="divide-y divide-line">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={close}
                      className="flex min-h-[3.25rem] items-center font-display text-2xl font-light text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ButtonLink href="/sign-in" variant="secondary">
                Sign in
              </ButtonLink>
              <ButtonLink href="/assessment">Get Started</ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

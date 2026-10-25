import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "outline-light";

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-plum text-white hover:bg-plum-800",
  secondary: "border border-plum/25 bg-transparent text-plum hover:border-plum hover:bg-plum-50",
  light: "bg-white text-plum hover:bg-rose-50",
  "outline-light": "border border-white/35 text-white hover:bg-white/10",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

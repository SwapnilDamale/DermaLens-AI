import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "paper" | "white" | "blush" | "plum";

const tones: Record<Tone, string> = {
  paper: "bg-paper",
  white: "bg-white",
  blush: "bg-blush",
  plum: "bg-plum-900 text-white",
};

export function Section({
  id,
  tone = "paper",
  children,
  className = "",
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-20 sm:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  title,
  intro,
  dark = false,
  className = "",
}: {
  id: string;
  title: string;
  intro?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2 id={id} className={`h-section ${dark ? "!text-white" : ""}`}>
        {title}
      </h2>
      {intro ? <p className={`lede mt-5 ${dark ? "!text-plum-200" : ""}`}>{intro}</p> : null}
    </div>
  );
}

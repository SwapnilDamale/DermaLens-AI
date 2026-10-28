import Image from "next/image";
import { ArrowRight, Award, Code2, Cpu, ShieldCheck, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";

const PILLARS = [
  {
    icon: Code2,
    title: "Algorithmic Integrity",
    description: "Constraint-first pipeline ensuring personal health boundaries, budget caps, and ingredient exclusions are applied before ranking.",
  },
  {
    icon: Cpu,
    title: "Computer Vision & Quality Audits",
    description: "Multi-point capture condition checks (lighting, angle, sharpness) preventing false progress comparisons.",
  },
  {
    icon: ShieldCheck,
    title: "Ethical & Non-Diagnostic",
    description: "Clear demarcation between cosmetic observation and medical diagnosis, keeping users safely informed.",
  },
  {
    icon: Sparkles,
    title: "Omnichannel Experience",
    description: "Bridging individual consumer routines with tactile in-store retail Skin Station kiosk hardware.",
  },
];

export function Team() {
  return (
    <Section id="team" tone="blush" labelledBy="team-title">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-rose">
            Creators & Engineers
          </p>
          <h2 id="team-title" className="h-section mt-3">
            The team behind DermaLens AI.
          </h2>
          <p className="lede mt-5">
            Engineered at Sardar Patel Institute of Technology (SPIT) for EIPR. Built by a passionate team of researchers and developers combining computer vision, constraint-first recommendation systems, and human-first beauty technology.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-line bg-white/70 p-5 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-plum-50 text-plum">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="mt-3 font-display text-lg font-normal text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/about">
              Read Our Story & Architecture <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/retailers" variant="secondary">
              Skin Station Concept
            </ButtonLink>
          </div>
        </div>

        {/* Team Photo Card */}
        <div className="relative mx-auto w-full max-w-[480px] lg:max-w-none">
          <div className="card shadow-panel overflow-hidden p-3 bg-white">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-paper">
              <Image
                src="/team/team.jpg"
                alt="The DermaLens AI creator and engineering team"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-white mb-2">
                  <Award size={13} aria-hidden="true" /> SPIT Mumbai · EIPR Project
                </div>
                <p className="font-display text-xl font-normal leading-snug">
                  DermaLens AI Founding Team
                </p>
                <p className="text-xs text-white/80 mt-0.5">
                  Research, Software Architecture & Product Design
                </p>
              </div>
            </div>
          </div>

          {/* Floating accent badge */}
          <div className="card absolute -bottom-5 -left-4 hidden sm:flex items-center gap-3 bg-white px-4 py-3 shadow-lift">
            <span className="flex h-3 w-3 rounded-full bg-rose animate-pulse" />
            <p className="text-xs font-medium text-ink">
              Proudly crafted by students at SPIT
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

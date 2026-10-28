import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Code2,
  Cpu,
  Github,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About Us & The Team",
  description:
    "Learn about DermaLens AI, built by researchers and engineers at Sardar Patel Institute of Technology (SPIT) for EIPR.",
};

const TEAM_PILLARS = [
  {
    icon: Code2,
    title: "Constraint-First Logic",
    text: "Personal budget caps, known allergens, and fragrance exclusions are treated as mandatory mathematical boundaries that eliminate incompatible products before any soft score ranking is applied.",
  },
  {
    icon: Cpu,
    title: "Lighting & Capture Rigor",
    text: "Skin cannot be objectively evaluated across mismatched camera angles, lux levels, or motion blurs. Our system includes a strict capture quality gate to protect comparisons from distortion.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Non-Diagnostic",
    text: "We intentionally avoid clinical terminology or medical diagnosis. DermaLens AI focuses exclusively on observable cosmetic characteristics and ingredient compatibility.",
  },
  {
    icon: HeartHandshake,
    title: "Privacy by Principle",
    text: "Facial imagery remains strictly on-device in local memory. No images or biometric datasets are uploaded, stored, or processed by external third-party servers.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-paper pb-24">
      {/* Header Banner */}
      <section className="border-b border-line bg-blush py-16 sm:py-24">
        <Container>
          <div className="inline-flex items-center gap-2 rounded-full border border-plum/20 bg-white/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-rose">
            <GraduationCap size={15} aria-hidden="true" /> SPIT Mumbai · EIPR Project
          </div>
          <h1 className="h-display mt-5 max-w-3xl text-4xl sm:text-6xl">
            See your skin. Understand your needs. Find what fits.
          </h1>
          <p className="lede mt-6 text-slate">
            DermaLens AI was conceived and developed by students at Sardar Patel Institute of Technology (SPIT) as an ethical, explainable beauty-tech platform designed to bring transparency to personalized skincare.
          </p>
        </Container>
      </section>

      {/* Main Team Showcase */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Team Portrait */}
            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
              <div className="card shadow-panel overflow-hidden p-3.5 bg-white">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-paper">
                  <Image
                    src="/team/team.jpg"
                    alt="DermaLens AI Founding Team at Sardar Patel Institute of Technology"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-white mb-2">
                      <Sparkles size={13} aria-hidden="true" /> Engineering & Product Team
                    </span>
                    <h2 className="font-display text-2xl font-normal leading-snug">
                      DermaLens AI Creators
                    </h2>
                    <p className="text-xs text-white/85 mt-1 leading-relaxed">
                      Sardar Patel Institute of Technology (SPIT), Mumbai
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate px-2">
                <span>📍 SPIT Campus, Andheri West, Mumbai</span>
                <span className="font-medium text-plum">Semester 3 · EIPR</span>
              </div>
            </div>

            {/* Narrative & Mission */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rose">
                Our Story & Vision
              </p>
              <h2 className="font-display mt-2 text-3xl font-light text-ink sm:text-4xl">
                Redefining skincare technology with mathematical honesty.
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate">
                <p>
                  Traditional skincare discovery often pushes shoppers into one of two extremes: confusing marketing claims that over-promise results, or clinical black-box apps that attempt to diagnose medical conditions without human dermatologists.
                </p>
                <p>
                  We built <strong className="text-ink font-medium">DermaLens AI</strong> to prove a better way: an explainable, constraint-first recommendation architecture that respects user budgets, personal fragrance preferences, and ingredient sensitivities <em className="italic">before</em> suggesting formulations.
                </p>
                <p>
                  Whether experienced through our web application or the retail in-store Skin Station kiosk, our software makes every recommendation auditable and clear.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 pt-4 border-t border-line">
                <Link
                  href="https://github.com/SwapnilDamale/DermaLens-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-plum/20 bg-white px-5 text-sm font-medium text-plum transition-colors hover:border-plum hover:bg-plum-50 shadow-sm"
                >
                  <Github size={16} aria-hidden="true" />
                  GitHub Repository
                </Link>
                <ButtonLink href="/assessment">
                  Take the Assessment <ArrowRight size={16} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Engineering Pillars */}
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose">
              Technical Principles
            </p>
            <h2 className="font-display mt-2 text-3xl font-light text-ink sm:text-4xl">
              How DermaLens AI was engineered.
            </h2>
            <p className="lede mt-4 text-slate">
              Four core principles guided every design and implementation choice in our system.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_PILLARS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-plum-50 text-plum">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-normal text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Retail & Academic Impact */}
      <section className="border-t border-line py-16 sm:py-20 bg-paper">
        <Container>
          <div className="rounded-2xl border border-line bg-gradient-to-br from-plum-900 via-plum-800 to-plum-900 p-8 sm:p-12 text-white">
            <div className="max-w-2xl">
              <span className="badge-demo !bg-white/20 !text-white text-xs">
                Academic & Retail Collaboration
              </span>
              <h2 className="font-display mt-4 text-3xl font-light text-white sm:text-4xl">
                Ready for consumers and retail aisles.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-plum-100">
                DermaLens AI includes both an individual consumer application for personal routine tracking and a specialized touch-optimized kiosk interface designed for in-store retail deployments.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/kiosk" variant="light">
                  Launch Skin Station Kiosk Demo <ArrowRight size={16} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/retailers" variant="outline-light">
                  Retailer Concept Details
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

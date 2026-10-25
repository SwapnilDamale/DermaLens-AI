"use client";

import { useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { ProductArt } from "@/components/art/ProductArt";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PRODUCTS, ROUTINE } from "@/lib/data";

type Period = "morning" | "evening";

const TABS: { id: Period; label: string; icon: typeof Sun }[] = [
  { id: "morning", label: "Morning", icon: Sun },
  { id: "evening", label: "Evening", icon: Moon },
];

export function Routine() {
  const [period, setPeriod] = useState<Period>("morning");
  const uid = useId();
  const routine = ROUTINE[period];

  return (
    <Section id="routine" tone="paper" labelledBy="routine-title">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            id="routine-title"
            title="A routine with a job for every step."
            intro="Products are arranged by role, so you know what each layer is for and can skip what you do not need."
          />
          <div role="tablist" aria-label="Routine time of day" className="mt-8 inline-flex rounded-full border border-line bg-white p-1">
            {TABS.map(({ id, label, icon: Icon }) => {
              const active = period === id;
              return (
                <button
                  key={id}
                  id={`${uid}-tab-${id}`}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`${uid}-panel`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setPeriod(id)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                      setPeriod(id === "morning" ? "evening" : "morning");
                    }
                  }}
                  className={`inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${
                    active ? "bg-plum text-white" : "text-slate hover:text-plum"
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </button>
              );
            })}
          </div>
          <div className="mt-8">
            <ButtonLink href="/routines" variant="secondary">
              Open interactive routine tracker →
            </ButtonLink>
          </div>
        </div>

        <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${period}`}>
          <ol className="space-y-4">
            {routine.steps.map((s, i) => {
              const product = PRODUCTS.find((p) => p.id === s.productId);
              return (
                <li key={`${period}-${s.role}`} className="card card-interactive flex items-center gap-5 p-4 sm:p-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line">
                    <Image
                      src={`/products/${s.kind}.jpg`}
                      alt={product?.name ?? s.role}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-rose-700">
                      Step {i + 1}: {s.role}
                    </p>
                    <p className="mt-0.5 font-display text-lg font-normal text-ink">
                      {product ? (
                        <Link href={`/products/${product.id}`} className="transition-colors hover:text-plum">
                          {product.name}
                        </Link>
                      ) : (
                        s.role
                      )}
                    </p>
                    <p className="mt-1 text-[15px] leading-snug text-slate">{s.why}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}

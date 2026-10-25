import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const POINTS = [
  "Runs the same assessment and recommendation flow in store",
  "Recommends only from the retailer's own range and stock",
  "Applies shopper limits first: budget, fragrance, ingredients",
  "Hands the routine to the shopper's phone to take away",
];

function KioskMockup() {
  return (
    <figure className="mx-auto w-full max-w-[340px]" aria-label="Concept mockup of a Skin Station kiosk screen">
      <div className="rounded-[1.75rem] bg-plum-800 p-3 shadow-panel ring-1 ring-white/10">
        <div className="overflow-hidden rounded-[1.25rem] bg-paper text-ink">
          <div className="flex items-center justify-between border-b border-line px-5 py-3 text-xs text-slate">
            <span className="font-display text-sm text-plum">DermaLens AI</span>
            <span>Step 3 of 5</span>
          </div>
          <div className="px-5 pb-6 pt-5">
            <p className="font-display text-2xl font-light leading-tight">Set your limits</p>
            <p className="mt-1 text-sm text-slate">We will only show products that respect these.</p>
            <div className="mt-5 space-y-3">
              <div className="rounded-lg border border-line bg-white px-4 py-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Budget per product</span>
                  <span className="font-medium">$40</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-plum-100">
                  <div className="h-full w-[62%] rounded-full bg-plum" />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-line bg-white px-4 py-3 text-sm">
                <span className="text-slate">Fragrance-free</span>
                <span className="rounded-full bg-plum px-2.5 py-0.5 text-xs font-medium text-white">On</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-line bg-white px-4 py-3 text-sm">
                <span className="text-slate">Avoid essential oils</span>
                <span className="rounded-full bg-plum px-2.5 py-0.5 text-xs font-medium text-white">On</span>
              </div>
            </div>
            <div className="mt-5 flex h-11 items-center justify-center rounded-full bg-plum text-sm font-medium text-white">
              Show compatible products
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="mx-auto h-10 w-10 bg-plum-800" />
      <div aria-hidden="true" className="mx-auto h-3 w-40 rounded-full bg-plum-800" />
      <figcaption className="mt-4 text-center text-sm text-plum-200">Concept mockup, not a shipping product</figcaption>
    </figure>
  );
}

export function SkinStation() {
  return (
    <Section id="skin-station" tone="plum" labelledBy="station-title">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div>
          <h2 id="station-title" className="h-section !text-white">
            The Skin Station brings the same honest advice into the aisle.
          </h2>
          <p className="lede mt-5 !text-plum-200">
            A retail kiosk that lets shoppers assess, set their limits and see compatible products from your range,
            with the reasoning on screen. No pressure to buy what does not fit.
          </p>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] text-plum-100">
                <Check size={18} className="mt-0.5 shrink-0 text-rose-200" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/kiosk" variant="light">
              Try live kiosk demo <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/retailers" variant="outline-light">
              Explore for retailers
            </ButtonLink>
          </div>
        </div>
        <KioskMockup />
      </div>
    </Section>
  );
}

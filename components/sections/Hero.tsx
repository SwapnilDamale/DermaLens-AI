import type { CSSProperties } from "react";
import { ArrowRight, Check, Info } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaceMap } from "@/components/art/FaceMap";
import { ProductArt } from "@/components/art/ProductArt";

const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-paper pb-20 pt-12 sm:pb-28 sm:pt-20">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <h1
            id="hero-title"
            className="h-display hero-rise text-[2.75rem] sm:text-6xl lg:text-[4.25rem]"
            style={delay(0.05)}
          >
            Find skincare that fits your skin, your budget and your limits.
          </h1>
          <p className="lede hero-rise mt-7" style={delay(0.2)}>
            DermaLens AI turns a visual skin assessment into product recommendations you can check. Set your budget,
            ingredient and fragrance limits first, then see exactly why each product made the list.
          </p>
          <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row" style={delay(0.35)}>
            <ButtonLink href="/assessment">
              Start Skin Assessment <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/products" variant="secondary">
              Explore Products
            </ButtonLink>
          </div>
          <ul className="hero-rise mt-10 space-y-3 text-[15px] text-slate" style={delay(0.5)}>
            {[
              "Non-diagnostic: describes what is visible, never a condition",
              "Your limits are applied before anything is ranked",
              "Every recommendation comes with its reasons",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-rose-700" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Sample skin-profile composition */}
        <div className="hero-rise relative mx-auto w-full max-w-[520px] lg:max-w-none" style={delay(0.3)}>
          <div className="card shadow-panel p-5 sm:p-7 sm:pb-16">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-xl font-normal text-ink">Sample skin profile</p>
              <span className="badge-demo">
                <Info size={13} aria-hidden="true" /> Illustrative
              </span>
            </div>
            <FaceMap className="mx-auto mt-4 w-full max-w-[400px]" />
            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line text-sm">
              {[
                ["Visible shine", "Moderate"],
                ["Visible dryness", "Mild"],
              ].map(([k, v]) => (
                <div key={k} className="bg-white px-4 py-3">
                  <dt className="text-slate">{k}</dt>
                  <dd className="mt-0.5 font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="card shadow-lift mt-4 flex items-center gap-4 p-4 sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0 sm:w-[17.5rem]">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-blush">
              <ProductArt kind="serum" className="h-14 w-14" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">Barrier Calm Serum</p>
              <p className="mt-0.5 text-xs leading-snug text-slate">Fits your $40 limit and your fragrance-free rule.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

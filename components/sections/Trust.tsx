import { Section } from "@/components/ui/Section";
import { TRUST_ITEMS } from "@/lib/data";

export function Trust() {
  return (
    <Section tone="white" labelledBy="trust-title">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2 id="trust-title" className="h-section">
            Recommendations you can check, not just accept.
          </h2>
          <p className="lede mt-5">
            Most skincare tools show you a list and ask for trust. DermaLens AI shows its working, so you stay in
            control of what ends up on your shelf.
          </p>
        </div>
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {TRUST_ITEMS.map(({ title, body, icon: Icon }) => (
            <div key={title} className="border-t border-line pt-6">
              <Icon size={22} className="text-rose-700" aria-hidden="true" />
              <dt className="mt-4 font-display text-xl font-normal text-ink">{title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-slate">{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

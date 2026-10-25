import type { Metadata } from "next";
import Link from "next/link";
import { Monitor, ShieldCheck, BarChart3, Zap, Store, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Retailer information — Skin Station",
  description: "Bring the DermaLens AI Skin Station experience to your store. Learn about the in-store kiosk concept.",
};

const FEATURES = [
  {
    Icon: Monitor,
    title: "Touch-friendly kiosk interface",
    body: "A large-screen, touch-optimised experience designed for browsing shoppers. No staff involvement required for the initial recommendation step.",
  },
  {
    Icon: ShieldCheck,
    title: "Privacy-first by design",
    body: "No facial images are stored. Visual assessment is on-device only. Customers see a clear privacy notice before any interaction begins.",
  },
  {
    Icon: BarChart3,
    title: "Real-time shelf filtering",
    body: "Recommendations are drawn directly from your store's live catalogue. Unavailable and out-of-range products are automatically excluded.",
  },
  {
    Icon: Zap,
    title: "Constraint-first recommendations",
    body: "Budget, fragrance, ingredient and brand preferences are applied as hard limits. Products that violate any constraint never appear.",
  },
  {
    Icon: Store,
    title: "Brand-neutral by default",
    body: "Skin Station does not favour brands. It ranks products solely on goal fit, so shoppers trust the recommendations.",
  },
  {
    Icon: ArrowRight,
    title: "Seamless consumer handoff",
    body: "Customers can scan a QR code to continue their profile on the DermaLens AI consumer app and pick up where they left off.",
  },
];

const HOW = [
  { step: "1", title: "Enquire", body: "Submit a pilot enquiry using the form below. We will respond within 5 business days." },
  { step: "2", title: "Pilot setup", body: "We configure the Skin Station for your catalogue, brand palette and store layout." },
  { step: "3", title: "Staff briefing", body: "A short briefing ensures your team can answer customer questions accurately." },
  { step: "4", title: "Go live", body: "The kiosk is installed and monitored. Aggregate (non-personal) usage statistics are available." },
];

export default function RetailersPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-plum-900 py-20 sm:py-28">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wider text-rose">For Retailers</p>
          <h1 className="h-display mt-4 max-w-3xl text-5xl text-white sm:text-6xl">
            Bring the Skin Station to your store
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-plum-200">
            DermaLens AI Skin Station is an in-store kiosk that gives every customer a
            personalised, constraint-first skincare recommendation from your own catalogue — in under three minutes.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/kiosk" variant="light">
              See the live kiosk demo <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="#enquire" variant="outline-light">
              Enquire about a pilot
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Features */}
      <Section tone="white" id="features" labelledBy="features-title">
        <SectionHeading
          id="features-title"
          title="Everything the Skin Station includes"
          intro="A complete in-store skincare intelligence experience, built around your customers' real constraints."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-line bg-paper p-6">
              <Icon className="text-plum" size={24} aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl font-normal text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section tone="blush" id="how" labelledBy="how-title">
        <SectionHeading
          id="how-title"
          title="How a pilot works"
          intro="From enquiry to go-live in as few as four steps."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW.map(({ step, title, body }) => (
            <div key={step} className="rounded-xl border border-line bg-white p-6">
              <span className="font-display text-4xl font-light text-plum/20">{step}</span>
              <h3 className="mt-3 font-display text-xl font-normal text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Non-diagnostic notice */}
      <Section tone="paper">
        <div className="max-w-3xl rounded-xl border border-rose/20 bg-rose-50 p-8">
          <h2 className="font-display text-2xl font-normal text-ink">Non-diagnostic notice</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate">
            DermaLens AI Skin Station describes visible skin characteristics only. It does not
            diagnose, treat or prevent any skin condition. Retailers must ensure that signage
            at the kiosk clearly communicates this to shoppers. DermaLens AI takes no
            responsibility for purchasing decisions made based on kiosk recommendations.
          </p>
        </div>
      </Section>

      {/* Enquiry CTA */}
      <section id="enquire" className="border-t border-line bg-plum-900 py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-rose">Pilot enquiries</p>
            <h2 className="mt-4 font-display text-4xl font-light text-white sm:text-5xl">
              Interested in a Skin Station pilot?
            </h2>
            <p className="mt-4 text-lg text-plum-200">
              Fill in your details below. This form is a frontend placeholder only — in this demo
              no data is transmitted or stored. We have included it to show how the enquiry flow
              would look to your team.
            </p>

            <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-8 space-y-5">
              <p className="badge-demo text-[11px] inline-flex">Frontend demo — form submission is not functional</p>
              {[
                { id: "company", label: "Company / Store name", type: "text", placeholder: "Your company name" },
                { id: "email", label: "Contact email", type: "email", placeholder: "you@company.com" },
                { id: "stores", label: "Number of locations", type: "number", placeholder: "e.g. 3" },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-sm font-medium text-plum-200 mb-1">{f.label}</label>
                  <input
                    id={f.id}
                    type={f.type}
                    placeholder={f.placeholder}
                    disabled
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none cursor-not-allowed"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-plum-200 mb-1">Tell us about your store</label>
                <textarea
                  id="message"
                  rows={4}
                  disabled
                  placeholder="Briefly describe your product range and what you hope the Skin Station will help with…"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none cursor-not-allowed"
                />
              </div>
              <button
                type="button"
                disabled
                className="inline-flex h-12 items-center rounded-full bg-rose/60 px-8 text-[15px] font-medium text-white cursor-not-allowed"
              >
                Submit enquiry (demo — not functional)
              </button>
            </div>

            <p className="mt-6 text-sm text-plum-200">
              For real enquiries during the pilot programme, contact us at{" "}
              <a href="mailto:retail@dermalens.example" className="underline hover:text-white">
                retail@dermalens.example
              </a>{" "}
              (placeholder address).
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

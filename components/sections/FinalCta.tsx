import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-paper py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="cta-title" className="h-display text-4xl sm:text-5xl lg:text-6xl">
            {SITE.tagline}
          </h2>
          <p className="lede mx-auto mt-6">
            Start with a short assessment, or browse what the recommendation experience will look like first.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/assessment">
              Start Skin Assessment <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/retailers" variant="secondary">
              For retailers
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

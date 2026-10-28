import { Explainable } from "@/components/sections/Explainable";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProductDiscovery } from "@/components/sections/ProductDiscovery";
import { Progress } from "@/components/sections/Progress";
import { Routine } from "@/components/sections/Routine";
import { SkinInsights } from "@/components/sections/SkinInsights";
import { SkinStation } from "@/components/sections/SkinStation";
import { Team } from "@/components/sections/Team";
import { Trust } from "@/components/sections/Trust";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Trust />
      <HowItWorks />
      <SkinInsights />
      <ProductDiscovery />
      <Routine />
      <Explainable />
      <SkinStation />
      <Progress />
      <Team />
      <Faq />
      <FinalCta />
    </>
  );
}

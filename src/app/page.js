import React from "react";
import { GlassNavbar } from "@/components/layout/glass-navbar";
import { Hero } from "@/components/landing/hero";
import { PipelineSection } from "@/components/landing/pipeline-section";
import { ProductPreviewSection } from "@/components/landing/product-preview-section";
import { FeaturesGridSection } from "@/components/landing/features-grid-section";
import { PricingStrip } from "@/components/landing/pricing-strip";
import { FinalCTA } from "@/components/landing/final-cta";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function Page() {
  return (
    <BackgroundLines>
      <GlassNavbar />
      <main className="mt-4 w-full">
        <Hero />
        <PipelineSection />
        <ProductPreviewSection />
        <FeaturesGridSection />
        <PricingStrip />
        <FinalCTA />
      </main>
    </BackgroundLines>
  );
}

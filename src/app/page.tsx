import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/landing/Hero"
import { SocialProof } from "@/components/landing/SocialProof"
import { Problem } from "@/components/landing/Problem"
import { Solution } from "@/components/landing/Solution"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { BuilderStory } from "@/components/landing/BuilderStory"
import { Features } from "@/components/landing/Features"
import { Pricing } from "@/components/landing/Pricing"
import { FAQ } from "@/components/landing/FAQ"
import { About } from "@/components/landing/About"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Social Proof / Trust Section */}
      <SocialProof />

      {/* 3. Problem Section */}
      <Problem />

      {/* 4. Solution Section */}
      <Solution />

      {/* 5. How It Works Section */}
      <HowItWorks />

      {/* 6. Builder Story / Authentic Section */}
      <BuilderStory />

      {/* 7. Features Section */}
      <Features />

      {/* 8. Pricing Section */}
      <Pricing />

      {/* 9. About Section */}
      <About />

      {/* 10. FAQ Section */}
      <FAQ />

      {/* 10. Footer Section */}
      <Footer />
    </main>
  )
}

import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TrustSection } from "@/components/trust-section"
import { ResultSection } from "@/components/result-section"
import { VisionSection } from "@/components/vision-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <TrustSection />
      <ResultSection />
      <VisionSection />
      <CtaSection />
      <Footer />
    </main>
  )
}

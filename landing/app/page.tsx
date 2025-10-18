import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ComparisonSection } from "@/components/comparison-section"
import { TimelineSection } from "@/components/timeline-section"
import { WaitlistSection } from "@/components/waitlist-section"
import { Footer } from "@/components/footer"
import { NarrativeSection } from "@/components/narrative-section"

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <ComparisonSection />
        <NarrativeSection />
        <TimelineSection />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  )
}

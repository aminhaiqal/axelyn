"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function CtaSection() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div
          ref={ref}
          className={`text-center space-y-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Automate Responsibly with Axelyn
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Experience trustworthy AI communication that protects your brand and your customers.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 transition-all hover:scale-110 group"
          >
            Get Early Access
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}

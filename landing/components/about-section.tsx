"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function AboutSection() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div
          ref={ref}
          className={`text-center space-y-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Built for Businesses That Value Accuracy and Trust
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Axelyn is an AI-enabled WhatsApp assistant that replies instantly to customer messages — like a real team
              member. It uses advanced language understanding to handle common questions, manage inquiries, and learn
              from every interaction.
            </p>
            <p className="text-foreground font-medium">
              But we know what most business owners worry about: "What if the AI says something wrong?"
            </p>
            <p>
              That's why Axelyn is built with{" "}
              <span className="text-foreground font-semibold">controlled automation</span> — you define the information
              Axelyn can use, and it never goes beyond your approved data. Every response is verified against your
              business context before being sent, minimizing errors and protecting your reputation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

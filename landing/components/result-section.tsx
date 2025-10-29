"use client"

import { Shield, Zap, Users } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useEffect, useState } from "react"

export function ResultSection() {
  const { ref, isVisible } = useIntersectionObserver()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isVisible && count < 100) {
      const timer = setTimeout(() => {
        setCount((prev) => Math.min(prev + 5, 100))
      }, 30)
      return () => clearTimeout(timer)
    }
  }, [isVisible, count])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div
          ref={ref}
          className={`text-center space-y-6 mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Instant Replies, Never Reckless.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            With Axelyn, you get 24/7 WhatsApp engagement that feels personal and professional — without the fear of
            misinformation. Every message reflects your brand, powered by intelligent, reliable infrastructure.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div
            className={`text-center space-y-3 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110 hover:rotate-6">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-foreground">24/7</div>
            <div className="text-muted-foreground">Always Available</div>
          </div>
          <div
            className={`text-center space-y-3 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110 hover:rotate-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-foreground">{count}%</div>
            <div className="text-muted-foreground">Verified Responses</div>
          </div>
          <div
            className={`text-center space-y-3 transition-all duration-700 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110 hover:rotate-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-foreground">∞</div>
            <div className="text-muted-foreground">Conversations Handled</div>
          </div>
        </div>
      </div>
    </section>
  )
}

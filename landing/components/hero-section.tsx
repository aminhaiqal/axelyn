"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Now in Beta
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Axelyn — Intelligent WhatsApp Auto-Reply Assistant
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Smart, human-like responses. Always accurate. Always under your control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 transition-all hover:scale-105"
              >
                Join the Beta
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 bg-transparent transition-all hover:scale-105"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-4">
                <div
                  className={`flex items-start gap-3 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-muted rounded-2xl rounded-tl-none p-4">
                      <p className="text-sm text-foreground">Hi! What are your business hours?</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`flex items-start gap-3 flex-row-reverse transition-all duration-700 delay-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-primary rounded-2xl rounded-tr-none p-4">
                      <p className="text-sm text-primary-foreground">
                        We're open Monday to Friday, 9 AM to 6 PM EST. How can I help you today?
                      </p>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-xs text-muted-foreground">Verified response</span>
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

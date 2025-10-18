"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Sparkles } from "lucide-react"
import { useTypewriter } from "@/hooks/use-typewriter"

const benefits = {
  everyone: [
    "Early access to Axon platform",
    "Priority support during beta",
    "Exclusive updates and insights",
    "Community access",
  ],
  firstTwentyFive: [
    "Free for 6 months (worth $500)",
    "Direct line to founders",
    "Influence product roadmap",
    "Lifetime discount",
  ],
}

export function WaitlistSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [startTyping, setStartTyping] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  // hook now triggers typing only when "startTyping" is true
  const { displayed, done } = useTypewriter("Join the Waitlist", 80, startTyping)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true)
          observer.disconnect() // fire once
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setEmail("")
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <section ref={sectionRef} id="waitlist" className="py-32 sm:py-40 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {displayed}
            <span
              className={`transition-opacity duration-500 ${
                done ? "opacity-0" : "animate-pulse text-primary"
              }`}
            >
              |
            </span>
          </h2>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            Be among the first to experience AI automation that actually learns
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md">
          <form onSubmit={handleSubmit} className="mb-16">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-11"
              />
              <Button type="submit" size="lg" className="h-11 sm:w-auto">
                {isSubmitted ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Joined!
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </Button>
            </div>
          </form>

          {/* Benefits */}
          <div className="space-y-8">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Everyone Gets
                </h3>
              </div>
              <ul className="space-y-2">
                {benefits.everyone.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-primary/50 bg-primary/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  First 25 Get
                </h3>
              </div>
              <ul className="space-y-2">
                {benefits.firstTwentyFive.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
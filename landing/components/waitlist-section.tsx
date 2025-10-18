"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Sparkles, Send } from "lucide-react"
import { useTypewriter } from "@/hooks/use-typewriter"
import { motion, AnimatePresence } from "framer-motion"

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
  const [seatsLeft, setSeatsLeft] = useState(25) // starts at 25
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { displayed, done } = useTypewriter("Join the Waitlist", 80, startTyping)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (seatsLeft > 0) setSeatsLeft((prev) => Math.max(prev - 1, 0))
    setIsSubmitted(true)
    setTimeout(() => {
      setEmail("")
      setIsSubmitted(false)
    }, 3000)
  }

  // Simple seat fill percentage for bar visualization
  const fillPercent = ((25 - seatsLeft) / 25) * 100

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="relative overflow-hidden py-32 sm:py-40 scroll-mt-24"
    >
      {/* Decorative backdrop */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-grid-white/[0.02]" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center relative">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/30 via-purple-400/30 to-transparent blur-3xl opacity-60" />
          <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {displayed}
            <span
              className={`transition-opacity duration-500 ${
                done ? "opacity-0" : "animate-pulse text-primary"
              }`}
            >
              |
            </span>
          </h2>
          <p className="text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
            Be among the first to experience{" "}
            <span className="font-medium text-foreground">
              AI automation that learns and adapts
            </span>{" "}
            — built for modern workflows.
          </p>
        </div>

        {/* Email form */}
        <div className="mx-auto mt-16 max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="relative mb-24 rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-sm transition hover:border-primary/50"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 bg-background/50 border-border text-base"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-6 sm:w-auto flex items-center gap-2 text-base"
                disabled={seatsLeft <= 0}
              >
                {isSubmitted ? (
                  <>
                    <Check className="h-4 w-4" />
                    Joined!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {seatsLeft <= 0 ? "Full" : "Join Waitlist"}
                  </>
                )}
              </Button>
            </div>

            {/* Seats indicator */}
            <div className="mt-5 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={seatsLeft}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-medium text-muted-foreground"
                >
                  {seatsLeft > 0 ? (
                    <>
                      <span className="text-primary font-semibold">{seatsLeft}</span> seats left — secure yours
                      now
                    </>
                  ) : (
                    <span className="text-red-500 font-semibold">Waitlist full</span>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="mt-2 h-2 w-full rounded-full bg-muted/30 overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${fillPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Benefits cards */}
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2">
          {/* Everyone */}
          <div className="rounded-2xl border border-border/70 bg-muted/30 p-8 backdrop-blur-md shadow-sm hover:border-primary/40 transition-all">
            <div className="mb-5 flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Everyone Gets</h3>
            </div>
            <ul className="space-y-3">
              {benefits.everyone.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-base text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* First 25 */}
          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background p-8 backdrop-blur-md shadow-md hover:shadow-lg transition-all">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">First 25 Get</h3>
            </div>
            <ul className="space-y-3">
              {benefits.firstTwentyFive.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-base text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

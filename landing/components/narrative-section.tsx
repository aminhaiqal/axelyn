"use client"

import { motion } from "framer-motion"

const lines = [
  <>Repetitive work shouldn’t <span className="text-primary">steal your focus</span>.</>,
  <>Automation shouldn’t take <span className="text-primary">weeks to set up</span>.</>,
  <>Data shouldn’t live in <span className="text-primary">silos</span>.</>,
  <></>,
  <>There’s a <span className="text-primary">new way</span> to build intelligent workflows.</>,
  <>Adaptive. Fast. <span className="text-primary">Human-centered.</span></>,
  <>Work smarter — not harder — with your <span className="text-primary">AI-native agent</span>.</>,
]

export function NarrativeSection() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-background px-6 py-20 sm:py-28 lg:px-32">
      {/* subtle accent glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-4xl">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.25, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`text-left text-pretty text-xl leading-tight sm:text-2xl lg:text-3xl ${
              i >= 4 ? "font-semibold text-foreground" : "text-muted-foreground"
            } ${i === lines.length - 1 ? "mt-4 text-primary" : ""}`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  )
}

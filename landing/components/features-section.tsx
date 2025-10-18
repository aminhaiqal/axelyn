"use client"

import { Brain, MessageSquare, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Brain,
    title: "Learning Feedback Loop",
    description:
      "Give feedback on results and watch it refine decisions over time. Every interaction makes your automation smarter.",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Setup",
    description: "Describe what you want in plain English. Build workflows without touching a single line of code.",
  },
  {
    icon: TrendingUp,
    title: "Adaptive Performance",
    description:
      "Track growth with analytics that show how your agent evolves and improves — not just runs tasks.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-gradient-to-b from-background to-muted/20 py-20 sm:py-28">
      {/* Decorative gradient or particles */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.05),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Automation That <span className="text-primary">Learns & Adapts</span>
          </h2>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            Traditional automation breaks when conditions change. Ours evolves.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-border bg-background/60 p-6 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:bg-primary/20">
                <feature.icon className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>

              {/* subtle gradient hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-br from-primary/10 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
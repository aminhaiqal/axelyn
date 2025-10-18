"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { CheckCircle2, Clock, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const timeline = [
  {
    status: "completed",
    title: "Core Learning Engine",
    description: "AI model that learns from feedback and improves automation decisions",
    items: ["Feedback collection system", "Model training pipeline", "Performance tracking"],
  },
  {
    status: "in-progress",
    title: "Natural Language Interface",
    description: "Describe automations in plain English and let AI handle the setup",
    items: ["NLP processing", "Automation generation", "Testing framework"],
  },
  {
    status: "upcoming",
    title: "Advanced Integrations",
    description: "Connect with your favorite tools and platforms seamlessly",
    items: ["API marketplace", "Custom connectors", "Workflow templates"],
  },
]

export function TimelineSection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const controls = useAnimation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          controls.start("visible")
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [controls])

  return (
    <section className="border-y border-border bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8" ref={ref}>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Development Roadmap
          </h2>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            Track our progress as we build the future of intelligent automation
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl before:absolute before:top-0 before:bottom-0 before:left-[1.15rem] before:w-[2px] before:bg-border">
          {timeline.map((phase, i) => {
            const isLast = i === timeline.length - 1
            const icon =
              phase.status === "completed" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : phase.status === "in-progress" ? (
                <Clock className="h-5 w-5 text-yellow-500" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )

            return (
              <motion.div
                key={phase.title}
                className={cn(
                  "relative pl-12 pb-12 last:pb-0",
                  !isLast && "before:absolute before:left-[1.4rem] before:top-7 before:h-full before:w-[2px] before:bg-border"
                )}
                initial={{ opacity: 0, y: 40 }}
                animate={visible ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.15, duration: 0.5 },
                  },
                }}
              >
                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border shadow-sm">
                  {icon}
                </div>

                <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-5 transition hover:bg-card/100 hover:shadow-md">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{phase.title}</h3>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                        phase.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : phase.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-muted text-muted-foreground"
                      )}
                    >
                      {phase.status === "completed"
                        ? "Merged"
                        : phase.status === "in-progress"
                          ? "In Progress"
                          : "Planned"}
                    </span>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {phase.description}
                  </p>

                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

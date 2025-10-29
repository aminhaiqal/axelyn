"use client"

import { Card } from "@/components/ui/card"
import { Database, Target, UserCheck, TrendingUp } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const features = [
  {
    icon: Database,
    title: "Controlled Knowledge Base",
    description: "You set the facts — business hours, pricing, policies — and Axelyn only responds from verified data.",
  },
  {
    icon: Target,
    title: "Built-in Accuracy Evaluation",
    description:
      "Every response is scored for clarity, tone, and factual precision. You can monitor and improve performance over time.",
  },
  {
    icon: UserCheck,
    title: "Safe Escalation System",
    description: "If Axelyn isn't confident, it doesn't guess. It automatically hands the conversation to a human.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Learning",
    description:
      "Axelyn adapts safely from user feedback and updates, without risking misinformation or brand inconsistency.",
  },
]

export function TrustSection() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`text-center space-y-4 mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Why Businesses Trust Axelyn</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-8 hover:shadow-lg transition-all duration-700 border-border bg-card hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

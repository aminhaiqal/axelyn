"use client"

import { Card } from "@/components/ui/card"
import { MessageSquare, Workflow, Building2 } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const products = [
  {
    icon: MessageSquare,
    name: "Axelyn Assist",
    description: "Messaging Automation",
    status: "Available Now",
  },
  {
    icon: Workflow,
    name: "Axelyn Flow",
    description: "Workflow Automation",
    status: "Coming Soon",
  },
  {
    icon: Building2,
    name: "Axelyn Core",
    description: "Business AI Infrastructure",
    status: "Coming Soon",
  },
]

export function VisionSection() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section id="vision" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`text-center space-y-6 mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
            More Than an Auto-Reply — The Foundation of Intelligent Business Infrastructure
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Axelyn begins with communication automation, then expands into a full business automation ecosystem —
            managing workflows, scheduling, and customer interactions across multiple channels.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              className={`p-8 text-center space-y-4 hover:shadow-lg transition-all duration-700 border-border bg-card hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110 hover:rotate-6">
                <product.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{product.name}</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              <div className="pt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    product.status === "Available Now" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

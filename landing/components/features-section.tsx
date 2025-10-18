import { Brain, MessageSquare, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Learning Feedback Loop",
    description:
      "Give feedback on results and watch Axon improve its decision-making over time. Every interaction makes it smarter.",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Setup",
    description: "Describe what you want in plain English. No complex configurations or technical knowledge required.",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description:
      "Track improvement over time with detailed analytics. See exactly how your AI is learning and adapting.",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Automation That Gets Smarter
          </h2>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            Traditional automation breaks when conditions change. Axon adapts and learns.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="group">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

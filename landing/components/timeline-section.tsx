import { CheckCircle2, Circle, Clock } from "lucide-react"

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
  return (
    <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Development Roadmap
          </h2>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            Track our progress as we build the future of intelligent automation
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
          {timeline.map((phase) => (
            <div key={phase.title} className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                {phase.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : phase.status === "in-progress" ? (
                  <Clock className="h-5 w-5 text-accent" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {phase.status === "completed"
                    ? "Completed"
                    : phase.status === "in-progress"
                      ? "In Progress"
                      : "Coming Next"}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{phase.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{phase.description}</p>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

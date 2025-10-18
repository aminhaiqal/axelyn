import { Check, X } from "lucide-react"

const comparisons = [
  {
    feature: "Adapts to Changes",
    traditional: false,
    axon: true,
  },
  {
    feature: "Learns from Feedback",
    traditional: false,
    axon: true,
  },
  {
    feature: "Natural Language Setup",
    traditional: false,
    axon: true,
  },
  {
    feature: "Improves Over Time",
    traditional: false,
    axon: true,
  },
  {
    feature: "Complex Rule Configuration",
    traditional: true,
    axon: false,
  },
]

export function ComparisonSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose Axon?
          </h2>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            See how Axon compares to traditional automation tools
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="grid grid-cols-3 gap-4 border-b border-border bg-muted/30 p-4">
              <div className="col-span-1" />
              <div className="text-center text-sm font-medium text-muted-foreground">Traditional</div>
              <div className="text-center text-sm font-medium text-foreground">Axon</div>
            </div>
            <div>
              {comparisons.map((comparison, index) => (
                <div
                  key={comparison.feature}
                  className={`grid grid-cols-3 gap-4 p-4 ${
                    index !== comparisons.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-center text-sm font-medium text-foreground">{comparison.feature}</div>
                  <div className="flex items-center justify-center">
                    {comparison.traditional ? (
                      <Check className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    {comparison.axon ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/30" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

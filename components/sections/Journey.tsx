import { journey } from "@/data/journey";

const plateColors = ["bg-paper-deep", "bg-lime", "bg-paper-deep", "bg-blue text-paper", "bg-paper-deep", "bg-signal"];

export default function Journey() {
  return (
    <section id="journey" className="scroll-mt-16 py-24 sm:py-32" aria-labelledby="journey-title">
      <div className="shell">
        <p className="annot mb-6 text-muted">03 / The plot thickens</p>
        <h2 id="journey-title" className="text-huge" data-reveal="lines">
          <span className="line">
            <span>Character</span>
          </span>
          <span className="line">
            <span>development.</span>
          </span>
        </h2>
        <p className="punchline mt-4 text-muted" data-reveal="joke">
          Not quite a superhero origin story, but close enough.
        </p>

        <ol className="relative mt-20">
          <span className="absolute top-0 bottom-0 left-[0.6rem] w-0.5 bg-ink/10 lg:left-[calc(25%-1px)]" aria-hidden="true">
            <span data-progress className="block h-full w-full origin-top bg-ink" />
          </span>

          {journey.map((step, index) => (
            <li key={step.title} className="relative grid gap-6 pb-20 pl-10 last:pb-0 lg:grid-cols-12 lg:pl-0">
              <span
                className="absolute top-3 left-0 h-5 w-5 rounded-full border-2 border-ink bg-paper lg:left-[calc(25%-0.6rem)]"
                aria-hidden="true"
              />

              <div className="lg:col-span-3">
                <p className="sticky top-24 font-display leading-none">
                  <span className="annot block text-muted">Chapter</span>
                  <span className="text-7xl sm:text-8xl">{String(index + 1).padStart(2, "0")}</span>
                </p>
              </div>

              <div className={`lg:col-span-8 lg:pl-12 ${index % 2 ? "lg:col-start-5" : "lg:col-start-4"}`}>
                <div
                  className={`${plateColors[index]} border-2 border-ink p-6 shadow-[6px_6px_0_var(--color-ink)] sm:p-8 ${
                    index % 2 ? "lg:rotate-[0.6deg]" : "lg:-rotate-[0.6deg]"
                  }`}
                  data-reveal="fade"
                >
                  <p className="annot opacity-70">{step.subtitle}</p>
                  <h3 className="mt-2 text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.9]">{step.title}</h3>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed">{step.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Focus">
                    {step.tags.map((tag) => (
                      <li key={tag} className="tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="punchline mt-5 pl-2" data-reveal="joke">
                  “{step.joke}”
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

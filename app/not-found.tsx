import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — This page has left the building | Krutarth Chauhan",
};

const explanations = [
  { ruledOut: false, text: "You typed it wrong. Happens to the best of us." },
  { ruledOut: false, text: "I moved it and told absolutely no one." },
  { ruledOut: true, text: "The intern deleted it. (There is no intern.)" },
  { ruledOut: true, text: "It's a feature. (It is not a feature.)" },
];

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center pt-28 pb-20" aria-labelledby="not-found-title">
      <div className="shell grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="annot text-muted">Error 404 · Page not found · Krutarth has been notified (he hasn&apos;t)</p>

          <p className="mt-4 flex items-center font-display text-[clamp(7rem,30vw,22rem)] leading-[0.8]" aria-hidden="true">
            4
            <span className="relative mx-[0.04em] inline-block h-[0.7em] w-[0.5em]">
              <span className="absolute inset-0 rounded-[50%] border-[0.11em] border-ink/15" />
              <span className="absolute inset-0 animate-spin rounded-[50%] border-[0.11em] border-transparent border-t-signal [animation-duration:1.6s] motion-reduce:animate-none" />
            </span>
            4
          </p>
          <p className="annot mt-4 ml-[14%] -rotate-2 text-muted">↑ Still loading the page that doesn&apos;t exist.</p>

          <h1 id="not-found-title" className="mt-10 text-big">
            This page has left <span className="font-serif text-signal normal-case italic">the building.</span>
          </h1>
          <p className="punchline mt-4 max-w-xl text-muted">
            Either the link is broken, or you were exploring. Both are valid life choices.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="btn btn-primary">
              Take me home <span aria-hidden="true">→</span>
            </Link>
            <Link href="/#contact" className="btn btn-ghost bg-lime">
              Hire him anyway <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <div className="border-2 border-ink bg-paper-deep p-6 shadow-[6px_6px_0_var(--color-ink)] lg:rotate-1">
            <p className="annot mb-4 text-muted">Possible explanations</p>
            <ul className="space-y-3">
              {explanations.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <span aria-hidden="true" className="font-mono">
                    {item.ruledOut ? "☒" : "☐"}
                  </span>
                  <span className={item.ruledOut ? "text-muted line-through decoration-signal decoration-2" : ""}>
                    {item.text}
                    {item.ruledOut && <span className="sr-only"> (ruled out)</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <pre className="overflow-x-auto border-2 border-ink bg-night p-5 font-mono text-[0.75rem] leading-relaxed text-paper lg:-rotate-1">
            <span className="text-signal">✖ PageNotFoundError: this URL is a lie</span>
            {"\n"}    at yourCuriosity (internet.ts:404:1)
            {"\n"}    at Portfolio.render (definitely-not-a-typo.tsx:13:37)
            {"\n"}    at async Krutarth.panic (brain.js:0:0)
            {"\n"}
            {"\n"}
            <span className="text-lime">✔ Suggested fix: click &quot;Take me home&quot;.</span>
          </pre>
        </div>
      </div>
    </section>
  );
}

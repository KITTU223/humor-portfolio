import HeroPortrait from "@/components/hero/HeroPortrait";
import HireButton from "@/components/hero/HireButton";
import Magnetic from "@/components/ui/Magnetic";
import styles from "@/components/hero/Hero.module.css";

const roles = ["Full Stack Developer", "Creative Developer", "Product Builder", "Founder of Krutonic", "Based in Gujarat, India"];

function Line({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <span className="line">
      <span className={styles.rise} style={{ "--i": i } as React.CSSProperties}>
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 lg:pt-28" aria-labelledby="hero-title">
      <div className="shell grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-12 lg:col-start-1 lg:row-start-1">
          <p className="annot mb-5 flex items-center gap-3 text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            Portfolio of Krutarth Chauhan · Est. questionable
          </p>

          <h1 id="hero-title" className={styles.headline}>
            <Line i={0}>I make</Line>
            <Line i={1}>websites.</Line>
            <Line i={2}>And other</Line>
            <Line i={3}>
              <span className={styles.questionable}>Questionable</span>
            </Line>
            <Line i={4}>decisions.</Line>
          </h1>

          <p className={`${styles.annotation} mt-3 flex items-start gap-2 pl-[30%] font-serif text-xl text-blue italic sm:text-2xl`}>
            <svg width="54" height="40" viewBox="0 0 54 40" fill="none" aria-hidden="true" className="-mt-6 shrink-0">
              <path d="M50 36C34 34 14 26 6 6m0 0 1 11M6 6l10 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span data-boast="Exclusively genius decisions, actually.">Mostly good decisions, to be fair.</span>
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-start lg:pt-10">
          <HeroPortrait />
        </div>

        <div className="grid gap-8 lg:col-span-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed sm:text-xl">
              Hey, I&apos;m Krutarth. Full Stack Developer, creative problem solver, and founder of Krutonic. I turn
              complicated ideas into digital products that actually work.
            </p>
            <p className="annot mt-4 flex items-center gap-3 text-muted">
              <span className="grid h-7 w-7 place-items-center border border-dashed border-ink" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              </span>
              Yes, I also know how to center a div.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-4 pb-10 lg:col-span-6 lg:justify-end">
            <Magnetic>
              <a href="#work" className="btn btn-primary">
                See my work <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <HireButton />
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-hidden border-y-2 border-ink bg-ink py-3 text-paper">
        <p className="sr-only">{roles.join(", ")}</p>
        <div className={styles.marquee} aria-hidden="true">
          {[0, 1].map((copy) => (
            <p key={copy} className="flex shrink-0 items-center font-display text-2xl tracking-wide uppercase sm:text-3xl">
              {roles.map((role) => (
                <span key={role} className="flex items-center">
                  <span className="px-6">{role}</span>
                  <span className="text-lime">✳</span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

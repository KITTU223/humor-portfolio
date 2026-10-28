import ImpossibleButton from "@/components/playground/ImpossibleButton";
import BugTerminal from "@/components/playground/BugTerminal";
import UselessAI from "@/components/playground/UselessAI";
import EscapingButton from "@/components/playground/EscapingButton";
import Arcade from "@/components/playground/Arcade";
import LurkingBug from "@/components/playground/LurkingBug";

type ExperimentProps = { number: string; title: string; note: string; className?: string; children: React.ReactNode };

function Experiment({ number, title, note, className = "", children }: ExperimentProps) {
  return (
    <article className={`flex min-w-0 flex-col border-2 border-ink bg-paper p-5 sm:p-7 ${className}`} data-reveal="fade">
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-4">
        <h3 className="text-3xl sm:text-4xl">{title}</h3>
        <p className="annot text-muted">
          EXP_{number} · {note}
        </p>
      </header>
      <div className="flex-1">{children}</div>
    </article>
  );
}

export default function Playground() {
  return (
    <section
      id="nonsense"
      className="relative scroll-mt-16 overflow-hidden border-t-2 border-ink bg-[radial-gradient(var(--color-ink)_1px,transparent_1px)] bg-[length:22px_22px] py-24 sm:py-32"
      aria-labelledby="nonsense-title"
    >
      <LurkingBug />
      <div className="shell">
        <div className="max-w-fit bg-paper pr-4">
          <p className="annot mb-6 text-muted">05 / Absolutely necessary nonsense</p>
          <h2 id="nonsense-title" className="text-huge" data-reveal="lines">
            <span className="line">
              <span>Welcome to</span>
            </span>
            <span className="line">
              <span>
                the <span className="bg-[linear-gradient(transparent_45%,var(--color-signal)_45%,var(--color-signal)_88%,transparent_88%)] px-2">nonsense.</span>
              </span>
            </span>
          </h2>
          <p className="punchline mt-4 text-muted" data-reveal="joke">
            Everything here was built instead of getting eight hours of sleep.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-12">
          <Experiment number="01" title="The impossible button" note="Stable-ish" className="lg:col-span-5">
            <ImpossibleButton />
          </Experiment>
          <Experiment number="02" title="The bug generator" note="Works as intended" className="lg:col-span-7">
            <BugTerminal />
          </Experiment>
          <Experiment number="03" title="Ask my extremely unqualified AI" note="Zero GPUs" className="lg:col-span-7">
            <UselessAI />
          </Experiment>
          <Experiment number="04" title="A fair choice" note="Ethically questionable" className="lg:col-span-5">
            <EscapingButton />
          </Experiment>
          <Experiment number="05" title="Mini arcade" note="10 seconds of QA" className="lg:col-span-12">
            <Arcade />
          </Experiment>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import PersonalityCards from "@/components/about/PersonalityCards";

const specs = [
  ["Name", "Krutarth Chauhan"],
  ["Based", "Gujarat, India"],
  ["Role", "Full Stack Developer"],
  ["Also", "Founder, Krutonic"],
  ["Education", "BCA → MCA, Parul University"],
  ["Known issue", "Says “quick fix” unironically"],
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-16 py-24 sm:py-32"
      aria-labelledby="about-title"
    >
      <div className="shell">
        <p className="annot mb-6 text-muted">
          01 / The human behind the semicolons
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="about-title" className="text-huge" data-reveal="lines">
            <span className="line">
              <span>So, who&apos;s</span>
            </span>
            <span className="line">
              <span>
                this <span className="bg-[linear-gradient(transparent_45%,var(--color-lime)_45%,var(--color-lime)_88%,transparent_88%)] px-2">guy?</span>
              </span>
            </span>
          </h2>
          <p
            className="punchline max-w-xs text-muted md:mb-4 md:text-right"
            data-reveal="joke"
          >
            An excellent question. My parents ask it too.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div
            className="space-y-6 text-lg leading-relaxed sm:text-xl lg:col-span-7"
            data-reveal="fade"
          >
            <p className="text-2xl leading-snug sm:text-3xl">
              I&apos;m Krutarth Chauhan, a full stack developer from Gujarat,
              India. I enjoy building products that solve real problems,
              experimenting with new technology, and occasionally spending three
              hours fixing something that turned out to be a typo.
            </p>
            <p className="text-muted">
              Most of my work sits where product and engineering meet: web apps
              in Next.js and React, mobile apps in React Native and Expo, and
              the backends, payments and dashboards that keep them running.
              I&apos;ve shipped a production system for a UK laundry business —
              website, iOS and Android apps, admin platform — and I founded{" "}
              <strong className="font-semibold text-ink">Krutonic</strong>, a
              software studio building web apps, mobile apps, SaaS and custom
              software for businesses.
            </p>
            <p className="text-muted">
              I care about the boring things that make software good — clear
              scope, sensible architecture, fast pages — and then I spend the
              leftover time on things like this website.
            </p>
          </div>

          <aside
            className="relative self-start border-2 border-ink bg-paper-deep p-5 shadow-[8px_8px_0_var(--color-ink)] lg:col-span-5 lg:rotate-1"
            aria-label="Spec sheet"
            data-reveal="fade"
          >
            <span className="tape absolute -top-3 left-6">
              Spec sheet · v26
            </span>
            <div className="flex items-center gap-4 border-b-2 border-ink pb-4">
              <Image
                src="/images/photo-suit-avatar.webp"
                alt=""
                width={240}
                height={240}
                sizes="80px"
                className="h-20 w-20 rounded-full border-2 border-ink object-cover"
              />
              <div>
                <p className="font-display text-2xl uppercase">
                  Krutarth Chauhan
                </p>
                <p className="annot text-muted">
                  Human. Verified by a CAPTCHA, eventually.
                </p>
              </div>
            </div>
            <dl className="divide-y divide-ink/15 font-mono text-sm">
              {specs.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-muted uppercase">{label}</dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="mt-24 sm:mt-32">
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-big">Things that live rent-free in my head</h3>
            <p className="annot text-muted">
              Hover for a trick · tap any card 3× for a surprise
            </p>
          </div>
          <PersonalityCards />
        </div>
      </div>
    </section>
  );
}

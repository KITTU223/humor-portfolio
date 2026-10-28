import Image from "next/image";
import { nakuCaseStudy } from "@/data/projects";
import styles from "./Projects.module.css";

const steps = [
  ["Challenge", nakuCaseStudy.challenge],
  ["Approach", nakuCaseStudy.approach],
  ["Solution", nakuCaseStudy.solution],
  ["Result", nakuCaseStudy.result],
] as const;

const numbers = [
  { value: 3, label: "Surfaces: website, apps, admin" },
  { value: 2, label: "App stores" },
  { value: 1, label: "Shared backend" },
];

export default function NakuCaseStudy() {
  const [mobile, admin] = nakuCaseStudy.screens;
  const { architecture } = nakuCaseStudy;

  return (
    <div className="mt-20 rounded-sm bg-paper p-5 text-ink sm:p-10 lg:p-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="annot">Case study · NAKU Laundry</p>
        <p className="tape rotate-2 bg-signal" data-reveal="joke">
          Yes, this one is real.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className={`${styles.screens} lg:col-span-7`}>
          <figure className={styles.admin} data-reveal="mask">
            <Image src={admin.src} alt={admin.alt} width={admin.width} height={admin.height} sizes="(min-width: 1024px) 45vw, 90vw" />
          </figure>
          <figure className={styles.phone} data-reveal="mask">
            <Image src={mobile.src} alt={mobile.alt} width={mobile.width} height={mobile.height} sizes="(min-width: 1024px) 14vw, 36vw" />
          </figure>
        </div>

        <dl className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {steps.map(([title, text]) => (
            <div key={title} className="border-t-2 border-ink pt-3" data-reveal="fade">
              <dt className="annot text-muted">{title}</dt>
              <dd className="mt-2 leading-relaxed">{text}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <ul className="grid grid-cols-3 gap-4 lg:col-span-5">
          {numbers.map((item) => (
            <li key={item.label}>
              <span className="block font-display text-6xl sm:text-7xl" data-count={item.value}>
                {item.value}
              </span>
              <span className="annot text-muted">{item.label}</span>
            </li>
          ))}
        </ul>

        <div className="lg:col-span-7">
          <p className="annot mb-3 text-muted">Architecture</p>
          <div className="font-mono text-sm">
            <ul className="grid gap-2 sm:grid-cols-3">
              {architecture.clients.map((part) => (
                <li key={part.layer} className="border-2 border-ink bg-paper-deep px-3 py-2">
                  <span className="block text-xs text-muted uppercase">{part.layer}</span>
                  {part.tech}
                </li>
              ))}
            </ul>
            <p className="text-center text-lg leading-8 sm:grid sm:grid-cols-3" aria-hidden="true">
              <span>↓</span>
              <span className="hidden sm:inline">↓</span>
              <span className="hidden sm:inline">↓</span>
            </p>
            <p className="border-2 border-ink bg-ink px-3 py-2 text-paper">
              <span className="block text-xs text-paper/60 uppercase">{architecture.backend.layer}</span>
              {architecture.backend.tech}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

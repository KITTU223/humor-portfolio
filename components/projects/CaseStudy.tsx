import Image from "next/image";
import type { CaseStudy as CaseStudyData } from "@/data/projects";
import styles from "./Projects.module.css";

type Props = { name: string; study: CaseStudyData };

export default function CaseStudy({ name, study }: Props) {
  const { screen, phone } = study;
  const steps = [
    ["Challenge", study.challenge],
    ["Approach", study.approach],
    ["Solution", study.solution],
    ["Result", study.result],
  ] as const;

  return (
    <div className="mt-20 rounded-sm bg-paper p-5 text-ink sm:p-10 lg:p-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="annot">Case study · {name}</p>
        <p className="tape rotate-2 bg-signal" data-reveal="joke">
          {study.tape}
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className={`${styles.screens} lg:col-span-7`} data-phone={Boolean(phone)}>
          <figure className={styles.admin} data-reveal="mask">
            <Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="(min-width: 1024px) 45vw, 90vw" />
          </figure>
          {phone && (
            <figure className={styles.phone} data-reveal="mask">
              <Image src={phone.src} alt={phone.alt} width={phone.width} height={phone.height} sizes="(min-width: 1024px) 14vw, 36vw" />
            </figure>
          )}
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
    </div>
  );
}

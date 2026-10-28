import { site } from "@/data/site";
import styles from "./Footer.module.css";

const links = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
  { label: "Krutonic", href: site.links.krutonic },
  { label: "Résumé", href: site.links.resume },
];

export default function Footer() {
  return (
    <footer className="bg-night pt-16 pb-8 text-paper">
      <div className="shell">
        <div className={styles.wordmark} aria-hidden="true">
          <p className={styles.letters}>
            {"KRUTART".split("").map((letter, i) => (
              <span key={i} className={styles.letter}>
                {letter}
              </span>
            ))}
            <span className={styles.fallen}>H</span>
            <sup className={styles.tm}>™</sup>
          </p>

          <p className={`${styles.tape} tape`}>Letter H has left the building. Hover to negotiate.</p>
          <p className={styles.footnote}>
            <span className="text-lime">*</span> ™ pending. Lawyers are expensive.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8 border-t border-paper/15 pt-8 md:flex-row md:items-start md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="annot underline-offset-4 hover:text-lime hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="group annot text-paper/60 md:text-right" tabIndex={0}>
            <p>© 2026 Krutarth Chauhan · {site.location}</p>
            <p className="mt-2 font-serif text-base normal-case italic text-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
              Made with skill, caffeine, and an unreasonable number of tabs.
            </p>
          </div>
        </div>

        <p className="annot mt-10 text-paper/40">
          Psst — this site has secrets. Try ↑ ↑ ↓ ↓ ← → ← → B A, typing “boxbox”, or hovering a nav link for far too long.
        </p>
      </div>
    </footer>
  );
}

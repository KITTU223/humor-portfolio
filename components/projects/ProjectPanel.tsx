import Image from "next/image";
import Magnetic from "@/components/ui/Magnetic";
import type { Project, ProjectStatus } from "@/data/projects";
import styles from "./Projects.module.css";

const statusStyle: Record<ProjectStatus, string> = {
  Active: "bg-lime text-ink",
  Live: "bg-lime text-ink",
  Experiment: "bg-blue text-paper",
  Archived: "bg-paper/15 text-paper",
};

type Props = { project: Project; index: number; children?: React.ReactNode };

export default function ProjectPanel({ project, index, children }: Props) {
  const number = String(index + 1).padStart(2, "0");
  const flipped = index % 2 === 1;

  return (
    <article
      className="border-t border-paper/15 py-16 sm:py-24"
      aria-labelledby={`project-${project.slug}`}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className={`lg:col-span-6 ${flipped ? "lg:order-2" : ""}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="font-display text-6xl leading-none text-paper/20 sm:text-7xl"
              data-count={index + 1}
            >
              {number}
            </span>
            <span
              className={`tag border-transparent ${statusStyle[project.status]}`}
            >
              {project.status === "Live" && (
                <span className={styles.pulse} aria-hidden="true" />
              )}
              {project.status}
            </span>
            <span className="annot text-paper/60">
              {project.role ? `${project.role} · ` : ""}
              {project.category}
            </span>
          </div>

          <h3
            id={`project-${project.slug}`}
            className="mt-6 text-[clamp(2.75rem,8vw,7rem)] leading-[0.88]"
            data-reveal="lines"
          >
            <span className="line">
              <span>{project.name}</span>
            </span>
          </h3>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80">
            {project.description}
          </p>
          <p className="punchline mt-4 max-w-xl text-lime" data-reveal="joke">
            {project.joke}
          </p>

          <ul
            className="mt-8 flex flex-wrap gap-2 text-paper/70"
            aria-label="Technology"
          >
            {project.stack.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {project.links.map((link, i) => (
              <Magnetic key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${i === 0 ? "border-lime bg-lime text-ink hover:bg-paper" : "border-paper text-paper hover:bg-paper hover:text-ink"}`}
                >
                  {link.label} <span aria-hidden="true">↗</span>
                  <span className="sr-only">
                    (opens {project.name} in a new tab)
                  </span>
                </a>
              </Magnetic>
            ))}
            {project.linkNote && (
              <p className="annot text-paper/50">{project.linkNote}</p>
            )}
          </div>
        </div>

        <figure
          className={`${styles.media} lg:col-span-6 ${flipped ? "lg:order-1" : ""}`}
          data-reveal="mask"
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className={styles.image}
          />
          <figcaption className="annot absolute bottom-3 left-3 bg-night/80 px-2 py-1 text-paper/70">
            Fig. {number} — {project.name}
          </figcaption>
        </figure>
      </div>

      {children}
    </article>
  );
}

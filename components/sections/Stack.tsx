"use client";

import { useState } from "react";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";

const allSkills = skillGroups.flatMap((group) => group.skills.map((skill) => ({ ...skill, category: group.category })));

function shippedIn(skill: string) {
  return projects.filter((project) => project.stack.some((tech) => tech.toLowerCase() === skill.toLowerCase()));
}

export default function Stack() {
  const [activeName, setActiveName] = useState(allSkills[0].name);
  const activeIndex = allSkills.findIndex((skill) => skill.name === activeName);
  const active = allSkills[activeIndex];
  const evidence = shippedIn(active.name);

  return (
    <section id="stack" className="scroll-mt-16 border-t-2 border-ink bg-paper-deep py-24 sm:py-32" aria-labelledby="stack-title">
      <div className="shell">
        <p className="annot mb-6 text-muted">04 / Weapons of mass construction</p>
        <h2 id="stack-title" className="text-huge" data-reveal="lines">
          <span className="line">
            <span>Things I</span>
          </span>
          <span className="line">
            <span>argue with daily.</span>
          </span>
        </h2>
        <p className="punchline mt-4 text-muted" data-reveal="joke">
          Also known as my tech stack.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div
            className="sticky top-20 z-10 self-start border-2 border-ink bg-night p-5 text-paper shadow-[6px_6px_0_var(--color-blue)] sm:p-7 lg:order-2 lg:col-span-5 lg:top-28"
            aria-live="polite"
          >
            <p className="annot flex justify-between text-paper/50">
              <span>~/stack/{active.category.toLowerCase().replace(/\W+/g, "-")}</span>
              <span>{activeIndex + 1}/{allSkills.length}</span>
            </p>
            <p className="mt-3 font-display text-4xl text-lime uppercase sm:mt-6 sm:text-6xl">{active.name}</p>
            <p className="mt-2 min-h-[3.5em] font-serif text-xl leading-snug italic sm:mt-4 sm:text-2xl">
              {active.caption}
            </p>
            <p className="annot mt-4 hidden border-t border-paper/15 pt-4 text-paper/60 sm:block">
              {evidence.length > 0
                ? `Shipped in: ${evidence.map((project) => project.name).join(", ")}`
                : "Part of the everyday toolkit."}
            </p>
          </div>

          <div className="lg:col-span-7">
            {skillGroups.map((group) => (
              <div key={group.category} className="grid gap-3 border-t-2 border-ink py-5 sm:grid-cols-[10rem_1fr]" data-reveal="fade">
                <h3 className="annot font-sans text-muted">
                  {group.category} <span className="text-ink/40">({group.skills.length})</span>
                </h3>
                <ul className="flex flex-wrap gap-x-1 gap-y-1">
                  {group.skills.map((skill) => {
                    const selected = activeName === skill.name;
                    return (
                      <li key={skill.name}>
                        <button
                          type="button"
                          aria-pressed={selected}
                          onPointerEnter={() => setActiveName(skill.name)}
                          onFocus={() => setActiveName(skill.name)}
                          onClick={() => setActiveName(skill.name)}
                          className={`min-h-11 px-2 font-display text-[clamp(1.6rem,3.6vw,2.6rem)] leading-tight uppercase transition-colors ${
                            selected ? "bg-lime text-ink" : "hover:text-blue"
                          }`}
                        >
                          {skill.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

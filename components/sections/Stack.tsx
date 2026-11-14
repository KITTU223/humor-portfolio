"use client";

import { useRef, useState } from "react";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import StackTerminal from "@/components/stack/StackTerminal";
import { useSkillHighlight } from "@/components/stack/useSkillHighlight";

const allSkills = skillGroups.flatMap((group) => group.skills.map((skill) => ({ ...skill, category: group.category })));

function shippedIn(skill: string) {
  return projects.filter((project) => project.stack.some((tech) => tech.toLowerCase() === skill.toLowerCase()));
}

export default function Stack() {
  const [activeName, setActiveName] = useState(allSkills[0].name);
  const listRef = useRef<HTMLDivElement>(null);
  useSkillHighlight(listRef, activeName);

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
          <StackTerminal
            name={active.name}
            path={`~/stack/${active.category.toLowerCase().replace(/\W+/g, "-")}`}
            caption={active.caption}
            position={`${activeIndex + 1}/${allSkills.length}`}
            evidence={
              evidence.length > 0
                ? `Shipped in: ${evidence.map((project) => project.name).join(", ")}`
                : "Part of the everyday toolkit."
            }
          />

          <div ref={listRef} className="lg:col-span-7">
            {skillGroups.map((group) => (
              <div key={group.category} className="grid gap-3 border-t-2 border-ink py-5 sm:grid-cols-[10rem_1fr]" data-reveal="fade">
                <h3 className="annot font-sans text-muted">
                  {group.category} <span className="text-ink/40">({group.skills.length})</span>
                </h3>
                <div className="relative" data-skill-group>
                  {/* Positioned by useSkillHighlight. Reduced motion uses a plain background instead. */}
                  <span
                    className="pointer-events-none absolute top-0 left-0 bg-lime opacity-0 motion-reduce:hidden"
                    data-highlight
                    aria-hidden="true"
                  />
                  <ul className="flex flex-wrap gap-x-1 gap-y-1">
                    {group.skills.map((skill) => {
                      const selected = activeName === skill.name;
                      return (
                        <li key={skill.name}>
                          <button
                            type="button"
                            aria-pressed={selected}
                            data-skill={skill.name}
                            onPointerEnter={() => setActiveName(skill.name)}
                            onFocus={() => setActiveName(skill.name)}
                            onClick={() => setActiveName(skill.name)}
                            className={`relative min-h-11 px-2 font-display text-[clamp(1.6rem,3.6vw,2.6rem)] leading-tight uppercase transition-colors ${
                              selected ? "text-ink motion-reduce:bg-lime" : "hover:text-blue"
                            }`}
                          >
                            {skill.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

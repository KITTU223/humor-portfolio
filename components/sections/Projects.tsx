import ProjectPanel from "@/components/projects/ProjectPanel";
import NakuCaseStudy from "@/components/projects/NakuCaseStudy";
import CaseStudy from "@/components/projects/CaseStudy";
import { caseStudies, projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="work" className="scroll-mt-16 bg-night py-24 text-paper sm:py-32" aria-labelledby="work-title">
      <div className="shell">
        <p className="annot mb-6 text-paper/50">02 / Proof I actually do work</p>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="work-title" className="text-huge" data-reveal="lines">
            <span className="line">
              <span>Some things</span>
            </span>
            <span className="line">
              <span>
                I <span className="font-serif text-lime normal-case italic">actually</span> built.
              </span>
            </span>
          </h2>
          <p className="punchline max-w-sm text-paper/70 lg:mb-4 lg:text-right" data-reveal="joke">
            Believe it or not, the jokes are not my full-time job.
          </p>
        </div>

        <div className="mt-16">
          {projects.map((project, index) => (
            <ProjectPanel key={project.slug} project={project} index={index}>
              {project.slug === "naku-laundry" && <NakuCaseStudy />}
              {caseStudies[project.slug] && <CaseStudy name={project.name} study={caseStudies[project.slug]} />}
            </ProjectPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

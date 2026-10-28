export type Skill = { name: string; caption: string };
export type SkillGroup = { category: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      {
        name: "React",
        caption: "Re-rendering my emotional state since forever.",
      },
      { name: "Next.js", caption: "One framework. Seventeen new decisions." },
      { name: "TypeScript", caption: "JavaScript, but it judges you." },
      {
        name: "JavaScript",
        caption:
          "The language I'd defend in court and complain about at dinner.",
      },
      {
        name: "Tailwind CSS",
        caption: "CSS works perfectly until someone opens Safari. This helps.",
      },
      {
        name: "Three.js",
        caption: "For when a div simply isn't three-dimensional enough.",
      },
      {
        name: "GSAP",
        caption: "Making things move for reasons I can justify.",
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        caption: "JavaScript escaped the browser and I followed it.",
      },
      {
        name: "Express.js",
        caption: "Minimal, unopinionated, and therefore my opinion everywhere.",
      },
      {
        name: "REST APIs",
        caption:
          "Status 200 means it worked. Status 200 with an error body means a long night.",
      },
    ],
  },
  {
    category: "Mobile",
    skills: [
      {
        name: "React Native",
        caption: "One codebase, two app stores, many review emails.",
      },
      {
        name: "Expo",
        caption: "Shipping to phones without making Xcode a personality trait.",
      },
    ],
  },
  {
    category: "Database",
    skills: [
      {
        name: "PostgreSQL",
        caption: "Commitment issues? Not with transactions.",
      },
      {
        name: "MongoDB",
        caption: "Schemaless, right up until it very much isn't.",
      },
      {
        name: "Firebase",
        caption: "Works beautifully until you check the billing dashboard.",
      },
      { name: "Supabase", caption: "Postgres with a nice front door." },
    ],
  },
  {
    category: "Cloud",
    skills: [
      {
        name: "AWS",
        caption: "Two hundred services. I use six and fear the rest.",
      },
      {
        name: "Cloudflare",
        caption:
          "Making things fast and occasionally making me prove I'm human.",
      },
      {
        name: "Vercel",
        caption: "git push, then pretend deployment was always this easy.",
      },
    ],
  },
  {
    category: "AI / Automation",
    skills: [
      {
        name: "LLM APIs",
        caption: "Yes, I use AI. No, it doesn't attend client meetings.",
      },
      {
        name: "RAG",
        caption:
          "Giving the model the documents so it stops making things up. Mostly.",
      },
      {
        name: "n8n",
        caption:
          "Automating the boring parts so humans can do the interesting ones.",
      },
      {
        name: "AI integrations",
        caption: "Useful features first, buzzwords never.",
      },
    ],
  },
];

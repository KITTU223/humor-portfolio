export type Milestone = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  joke: string;
};

// No dates on purpose: the original portfolio didn't list them and I'd rather not guess.
export const journey: Milestone[] = [
  {
    title: "BCA",
    subtitle: "Bachelor of Computer Applications",
    description: "Undergraduate degree in computer applications. Fundamentals, data structures, and first real programs.",
    tags: ["Fundamentals"],
    joke: "Discovered that computers can ruin your sleep schedule.",
  },
  {
    title: "MCA",
    subtitle: "Parul University",
    description: "Postgraduate studies focused on advanced software engineering and system architecture.",
    tags: ["Architecture"],
    joke: "Decided one degree wasn't enough suffering.",
  },
  {
    title: "CALCS",
    subtitle: "Full Stack Development Internship",
    description: "First professional role, building web applications with a real team and real deadlines.",
    tags: ["React", "Node.js"],
    joke: "Learned that production code is a very different universe.",
  },
  {
    title: "Freelance",
    subtitle: "Independent software development",
    description: "Independent contracting for clients — scoping, building, shipping and supporting products end to end.",
    tags: ["Next.js", "Tailwind"],
    joke: "Unlocked the ability to explain software to actual humans.",
  },
  {
    title: "NAKU Laundry",
    subtitle: "UK client project",
    description: "Led development of a complete cross-platform laundry ecosystem: website, mobile apps and admin platform.",
    tags: ["React Native", "Stripe", "Firebase"],
    joke: "Built a laundry ecosystem. Didn't personally wash anything.",
  },
  {
    title: "Krutonic",
    subtitle: "Founder",
    description: "Founded a software studio building web apps, mobile apps, SaaS and custom software for businesses.",
    tags: ["Business", "Product"],
    joke: "Started a software company. Seemed reasonable at the time.",
  },
];

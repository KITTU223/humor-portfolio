export type ProjectStatus = "Active" | "Live" | "Experiment" | "Archived";

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  category: string;
  role?: string;
  status: ProjectStatus;
  description: string;
  joke: string;
  stack: string[];
  image: { src: string; alt: string; width: number; height: number };
  links: ProjectLink[];
  // Shown when there's no public build to link to, so nobody clicks into a 404.
  linkNote?: string;
};

export const nakuCaseStudy = {
  challenge:
    "Bookings, payments and day-to-day operations needed to work as one system — for customers and for the team running the service.",
  approach:
    "Follow a single order from booking to delivery, then design every screen — customer and staff — around that journey.",
  solution:
    "A Next.js customer website and admin dashboard, Expo mobile apps, and one shared Firebase backend handling bookings, payments and order management.",
  result:
    "Live in production: a public website, apps on the App Store and Google Play, and an admin dashboard the team uses to run orders day to day.",
  architecture: {
    clients: [
      { layer: "Website", tech: "Next.js" },
      { layer: "iOS + Android", tech: "React Native / Expo" },
      { layer: "Admin dashboard", tech: "Next.js" },
    ],
    backend: { layer: "Shared backend", tech: "Firebase + Node.js · Stripe payments" },
  },
  screens: [
    {
      src: "/images/work/naku/mobile.webp",
      alt: "NAKU Laundry mobile app home screen listing wash and dry cleaning services",
      width: 591,
      height: 1280,
    },
    {
      src: "/images/work/naku/admin-dashboard-redacted.webp",
      alt: "NAKU Laundry admin dashboard with orders table, customer data redacted",
      width: 2000,
      height: 1173,
    },
  ],
};

type Screen = { src: string; alt: string; width: number; height: number };

// Lighter case studies: the four steps plus a screenshot, with an optional phone overlapping it.
export type CaseStudy = {
  tape: string;
  challenge: string;
  approach: string;
  solution: string;
  result: string;
  screen: Screen;
  phone?: Screen;
};

export const caseStudies: Record<string, CaseStudy> = {
  "transport-billing": {
    tape: "Spreadsheets were harmed. Lightly.",
    challenge:
      "Invoices were built by hand from spreadsheets, the same calculations were repeated for every bill, and past records were hard to find.",
    approach: "Keep the Excel files the team already uses as the input, and automate everything after that step.",
    solution:
      "A desktop app with Excel import, automatic billing calculations, one-click PDF invoices, and a searchable history synced to the cloud.",
    result:
      "Invoices go from the team's Excel files to finished PDFs without retyping or recalculating, and every past bill is stored in one searchable place.",
    screen: {
      src: "/images/work/transport-billing/pdf-invoice-redacted.webp",
      alt: "Generated PDF invoice with business and client details redacted",
      width: 1840,
      height: 1200,
    },
  },
  vonlylegal: {
    tape: "Ordering happens on WhatsApp. Obviously.",
    challenge:
      "Customers needed an easy way to see which PlayStation games are available, which console each one is for, and what each rental plan costs.",
    approach:
      "Put the effort into a catalogue that's fast to browse, and keep ordering on WhatsApp, where the business already talks to customers.",
    solution:
      "A game collection with categories, search, and per-game pages showing plans and prices, with every order handed straight to WhatsApp.",
    result:
      "Customers pick a plan and land in WhatsApp with their order ready to send. Live and taking orders across the full PS5 and PS4 catalogue.",
    screen: {
      src: "/images/work/vonlylegal/collection.webp",
      alt: "VONLYLEGAL game collection with categories and rental prices",
      width: 1320,
      height: 920,
    },
    phone: {
      src: "/images/work/vonlylegal/mobile.webp",
      alt: "VONLYLEGAL homepage on mobile",
      width: 780,
      height: 1688,
    },
  },
};

export const projects: Project[] = [
  {
    slug: "krutonic",
    name: "Krutonic",
    category: "Software Studio",
    role: "Founder",
    status: "Active",
    description:
      "Building web applications, mobile apps, SaaS platforms, custom software, and practical AI-powered solutions.",
    joke: "Because having one job apparently wasn't stressful enough.",
    stack: ["Web apps", "Mobile apps", "SaaS", "Custom software", "AI"],
    image: {
      src: "/images/work/krutonic-logo.png",
      alt: "Krutonic logo — Technology in motion",
      width: 1536,
      height: 1024,
    },
    links: [{ label: "Visit Krutonic", href: "https://krutonic.com/" }],
  },
  {
    slug: "naku-laundry",
    name: "NAKU Laundry",
    category: "Real client project — United Kingdom",
    role: "Lead developer",
    status: "Live",
    description:
      "A complete digital ecosystem for a laundry business, including a customer-facing mobile app, website, admin dashboard, ordering workflows, and payment integrations.",
    joke: "Finally, software that handles dirty laundry without starting family drama.",
    stack: ["Next.js", "React Native", "Expo", "Firebase", "Stripe", "Node.js"],
    image: {
      src: "/images/work/naku/website.webp",
      alt: "NAKU Laundry website homepage with booking call-to-action",
      width: 1580,
      height: 1000,
    },
    links: [
      { label: "Live site", href: "https://www.nakulaundry.com" },
      { label: "App Store", href: "https://apps.apple.com/in/app/naku-laundry/id6756433155" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.anonymous.NAKULaundretteAppEastLondon",
      },
    ],
  },
  {
    slug: "transport-billing",
    name: "Transport Billing System",
    category: "Custom business software — Desktop app",
    status: "Live",
    description:
      "A desktop billing app for a transport business: it imports the team's existing Excel files, runs the billing calculations, generates PDF invoices in one click, and keeps every past bill in a searchable cloud history.",
    joke: "Excel stays. The retyping, recalculating and 'where's that bill from March?' do not.",
    stack: ["Electron", "Next.js", "Supabase", "Tailwind CSS"],
    image: {
      src: "/images/work/transport-billing/invoice-editor.webp",
      alt: "Create LR screen with a live consignment note preview",
      width: 1670,
      height: 1146,
    },
    links: [],
    linkNote: "Private client software — no public build.",
  },
  {
    slug: "vonlylegal",
    name: "VONLYLEGAL",
    category: "Website — PS5 & PS4 game rentals",
    status: "Live",
    description:
      "A storefront for a PlayStation game-rental business, with a fast catalogue of categories, search and per-game rental plans. Every order goes straight to WhatsApp, ready to send.",
    joke: "Rent the game, skip the ₹5,000 guilt. The rest of the weekend is your problem.",
    stack: ["Next.js", "GSAP", "Supabase", "PostgreSQL"],
    image: {
      src: "/images/work/vonlylegal/home.webp",
      alt: "VONLYLEGAL homepage with featured game carousel",
      width: 1320,
      height: 1000,
    },
    links: [{ label: "Live site", href: "https://vonlylegal.vercel.app/" }],
  },
  {
    slug: "image-humanizer",
    name: "Image Humanizer",
    category: "AI experiment",
    status: "Experiment",
    description:
      "Exploring techniques that help synthetic AI-generated imagery achieve more natural photographic characteristics.",
    joke: "Teaching AI how to look less like AI. The irony is not lost on me.",
    stack: ["Diffusion", "GPU compute", "Modal", "Cloudflare R2"],
    image: {
      src: "/images/work/image-humanizer.svg",
      alt: "Illustration of an image being refined from synthetic to natural",
      width: 480,
      height: 280,
    },
    links: [],
    linkNote: "Still in development — no public build yet.",
  },
  {
    slug: "resonance",
    name: "Resonance",
    category: "Audio platform",
    status: "Archived",
    description: "An immersive browser-based audio platform.",
    joke: "A project from the archives. We all have a past.",
    stack: ["Next.js", "PostgreSQL", "Prisma", "S3", "Clerk"],
    image: {
      src: "/images/work/resonance.svg",
      alt: "Illustration of an expanding audio waveform",
      width: 480,
      height: 280,
    },
    links: [],
    linkNote: "Archived — no longer publicly hosted.",
  },
];

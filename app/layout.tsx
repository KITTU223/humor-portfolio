import type { Metadata, Viewport } from "next";
import { Anton, Instrument_Serif, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Intro from "@/components/layout/Intro";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import EasterEggs from "@/components/layout/EasterEggs";
import TabMood from "@/components/layout/TabMood";
import { site } from "@/data/site";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

const description =
  "Krutarth Chauhan is a full stack and creative developer from Gujarat, India, and founder of Krutonic — building web apps, mobile apps and SaaS products that actually work.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Krutarth Chauhan — Full Stack Developer & Founder of Krutonic",
  description,
  keywords: [
    "Krutarth Chauhan",
    "Full Stack Developer",
    "Creative Developer",
    "Next.js Developer",
    "Mobile App Developer",
    "React Native Developer",
    "Krutonic",
    "Gujarat",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "Krutarth Chauhan — Professionally unprofessional.",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Krutarth Chauhan — Professionally unprofessional.",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f1e8",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/images/photo-suit.jpg`,
  jobTitle: "Full Stack Developer",
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressRegion: "Gujarat", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Krutonic", url: site.links.krutonic },
  sameAs: [site.links.github, site.links.linkedin, site.links.krutonic],
};

// Runs before paint so the intro never flashes for returning visitors.
const introFlag = `(function(){var d=document.documentElement;d.classList.add("js");var seen=false;try{seen=!!sessionStorage.getItem("intro-seen")}catch(e){}d.dataset.intro=seen||location.pathname!=="/"?"done":"running";setTimeout(function(){d.dataset.intro="done"},9000)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${grotesk.variable} ${instrument.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introFlag }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] bg-lime px-4 py-2 font-mono text-sm focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Intro />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
        <EasterEggs />
        <TabMood />
      </body>
    </html>
  );
}

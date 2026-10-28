import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Journey from "@/components/sections/Journey";
import Stack from "@/components/sections/Stack";
import Playground from "@/components/sections/Playground";
import Contact from "@/components/sections/Contact";
import ScrollReveals from "@/components/layout/ScrollReveals";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Journey />
      <Stack />
      <Playground />
      <Contact />
      <ScrollReveals />
    </>
  );
}

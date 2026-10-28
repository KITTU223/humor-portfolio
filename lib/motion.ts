import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Set by <SmoothScroll />; the nav and intro use it to pause scrolling.
export const scroller: { lenis: Lenis | null } = { lenis: null };

export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (scroller.lenis) scroller.lenis.scrollTo(target, { offset: -8 });
  else target.scrollIntoView({ behavior: "smooth" });
}

// The intro state lives on <html data-intro>, set before paint by the inline script in layout.tsx.
export function onIntroDone(callback: () => void) {
  const html = document.documentElement;
  if (html.dataset.intro !== "running") {
    callback();
    return () => {};
  }
  const observer = new MutationObserver(() => {
    if (html.dataset.intro === "done") {
      observer.disconnect();
      callback();
    }
  });
  observer.observe(html, { attributes: true, attributeFilter: ["data-intro"] });
  return () => observer.disconnect();
}

export { gsap, ScrollTrigger };

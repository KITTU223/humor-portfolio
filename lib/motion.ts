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

// Page-level motion state lives on <html> data attributes, set before paint by the inline script
// in layout.tsx: data-intro ("running" → "done") and data-hero ("pending" → "done").
function waitFor(key: "intro" | "hero", busy: string, callback: () => void) {
  const html = document.documentElement;
  if (html.dataset[key] !== busy) {
    callback();
    return () => {};
  }
  const observer = new MutationObserver(() => {
    if (html.dataset[key] === busy) return;
    observer.disconnect();
    callback();
  });
  observer.observe(html, { attributes: true, attributeFilter: [`data-${key}`] });
  return () => observer.disconnect();
}

export const onIntroDone = (callback: () => void) => waitFor("intro", "running", callback);

// The hero entrance owns the portrait's transforms until it finishes; GSAP parallax waits for this.
export const onHeroDone = (callback: () => void) => waitFor("hero", "pending", callback);

export { gsap, ScrollTrigger };

"use client";

import { createTimeline, stagger, type Scope } from "animejs";
import { ease, markEntered, onFirstView } from "@/lib/anime";
import { useAnimeScope } from "@/hooks/useAnimeScope";

/*
 * The plate itself fades in with GSAP (data-reveal="fade") and the timeline line is scrubbed by
 * GSAP (data-progress). This choreographs what's on the plate, chapter by chapter, plus the
 * node on the line, which gets inked in when you reach it. No pinning, nothing scroll-jacked.
 */
function chapter(scope: Scope, li: HTMLElement) {
  const q = (selector: string) => Array.from(li.querySelectorAll<HTMLElement>(selector));
  const dot = li.querySelector<HTMLElement>("[data-chapter-dot]");
  const digits = q("[data-chapter-digit]");
  const sub = q("[data-chapter-sub]");
  const title = q("[data-chapter-title]");
  const text = q("[data-chapter-text]");
  const tags = q("[data-chapter-tag]");

  onFirstView(scope, li, () => {
    markEntered(...digits, ...sub, ...title, ...text, ...tags);
    createTimeline()
      .add(dot!, { scale: [0.4, 1.35, 1], backgroundColor: ["#f5f1e8", "#171717"], duration: 500, ease: "outQuad" })
      // The chapter number rolls over like an odometer.
      .add(digits, { opacity: [0, 1], translateY: ["100%", "0%"], duration: 700, delay: stagger(90), ease: ease.ink }, 0)
      .add(sub, { opacity: [0, 1], duration: 300, ease: "linear" }, 220)
      // Inked in left to right, like a comic caption being lettered.
      .add(title, { opacity: [0, 1], clipPath: ["inset(-10% 100% -10% 0)", "inset(-10% 0% -10% 0)"], duration: 650, ease: ease.machine }, 280)
      .add(text, { opacity: [0, 1], translateY: [10, 0], duration: 600, ease: ease.paper }, 520)
      // Achievements get rubber-stamped.
      .add(tags, { opacity: [0, 1], scale: [1.35, 1], duration: 220, delay: stagger(110), ease: "inQuad" }, 760);
  });
}

function setup(scope: Scope) {
  const section = scope.root as HTMLElement;
  section.querySelectorAll<HTMLElement>("[data-chapter]").forEach((li) => chapter(scope, li));
}

export default function JourneyMotion() {
  useAnimeScope("#journey", setup);
  return null;
}

"use client";

import { createTimeline, stagger, steps, type Scope } from "animejs";
import { markEntered, onFirstView, sweepMarkers } from "@/lib/anime";
import { useAnimeScope } from "@/hooks/useAnimeScope";

// The spec sheet prints like a receipt: rows chug out left to right, then it gets stamped.
function setup(scope: Scope) {
  const section = scope.root as HTMLElement;
  sweepMarkers(scope, section);

  const rows = Array.from(section.querySelectorAll<HTMLElement>("[data-spec-row]"));
  const stamp = section.querySelector<HTMLElement>("[data-stamp]");
  const header = section.querySelector<HTMLElement>("[data-spec-header]");

  onFirstView(scope, rows[0], () => {
    markEntered(...rows);
    createTimeline({ delay: 350 })
      .add(rows, {
        opacity: [0, 1],
        clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
        duration: 320,
        delay: stagger(85),
        ease: steps(7),
      })
      .call(() => markEntered(stamp), "+=150")
      // Slammed down, not placed: fast in, no overshoot, and the paper flinches.
      .add(stamp!, { opacity: [0, 1], scale: [2.4, 1], duration: 190, ease: "inQuad" }, "<")
      .add(header!, { translateX: [0, -3, 2, -1, 0], duration: 220, ease: "linear" });
  });
}

export default function AboutMotion() {
  useAnimeScope("#about", setup);
  return null;
}

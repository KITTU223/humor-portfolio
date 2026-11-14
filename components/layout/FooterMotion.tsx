"use client";

import { animate, stagger, type Scope } from "animejs";
import { markEntered, onFirstView } from "@/lib/anime";
import { useAnimeScope } from "@/hooks/useAnimeScope";

/*
 * The letters are hung up one by one, each swinging on its hook before it settles. The H isn't
 * in this list: it has its own scroll-driven fall (Footer.module.css), and it's late anyway.
 */
function setup(scope: Scope) {
  const letters = Array.from((scope.root as HTMLElement).querySelectorAll<HTMLElement>("[data-footer-letter]"));
  onFirstView(scope, letters[0], () => {
    markEntered(...letters);
    animate(letters, {
      opacity: { from: 0, to: 1, duration: 120 },
      "--drop": ["-0.35em", "0em"],
      "--swing": [(_: unknown, i = 0) => `${i % 2 ? 9 : -11}deg`, "0deg"],
      duration: 900,
      delay: stagger(70, { jitter: 20 }),
      ease: "outElastic(1, .45)",
    });
  });
}

export default function FooterMotion() {
  useAnimeScope("footer", setup);
  return null;
}

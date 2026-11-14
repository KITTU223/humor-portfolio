import { animate, onScroll, spring, type Scope } from "animejs";

/*
 * Anime.js owns choreography and one-off interactions (intro, hero, card tricks, the nonsense).
 * GSAP keeps what it already did well: Lenis sync, the data-reveal scroll system, magnetic
 * buttons, hero parallax and the signature. The rule that keeps them apart: never let both
 * libraries write `transform` on the same element. When they meet, Anime animates a wrapper
 * or child, or hands over with cleanInlineStyles() once it's finished.
 */

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A small, shared motion vocabulary so the site has one handwriting, not twenty.
export const ease = {
  ink: "outExpo", // things that settle like ink: headings, masks
  paper: "outQuart", // slightly heavier: paper, cards, documents
  machine: "inOutQuart", // panels and mechanisms
} as const;

// Springs are created per use: a Spring instance belongs to the animation that uses it.
export const springs = {
  snappy: () => spring({ bounce: 0.35, duration: 450 }),
  sticker: () => spring({ bounce: 0.5, duration: 600 }),
  lazy: () => spring({ bounce: 0.25, duration: 800 }),
};

/**
 * Runs `play` once, the first time `target` reaches 88% down the viewport — the same line
 * lib/reveals.ts uses, so GSAP and Anime reveals agree on when something has "arrived".
 * Anything `play` creates is registered with `scope` and reverted with it.
 */
export function onFirstView(scope: Scope, target: Element | null, play: () => void) {
  if (!target) return;
  let played = false;
  onScroll({
    target,
    enter: "88% top",
    onEnter: () => {
      if (played) return;
      played = true;
      scope.execute(play);
    },
  });
}

/**
 * Highlighter pen across a `.marker` word. Waits for the GSAP line reveal underneath to land
 * first — you highlight a word after it's written, not before.
 */
export function sweepMarkers(scope: Scope, root: ParentNode, delay = 700) {
  root.querySelectorAll<HTMLElement>("[data-marker]").forEach((marker) =>
    onFirstView(scope, marker, () => {
      animate(marker, {
        backgroundSize: ["0% 100%", "100% 100%"],
        duration: 520,
        delay,
        ease: "inOutQuad",
        onBegin: () => markEntered(marker),
      });
    }),
  );
}

// Elements hidden by `[data-enter]` in globals.css become visible once this is set.
export function markEntered(...elements: (Element | null | undefined)[]) {
  elements.forEach((el) => el?.setAttribute("data-entered", ""));
}

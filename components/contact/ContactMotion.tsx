"use client";

import { animate, type Scope } from "animejs";
import { markEntered, onFirstView, springs } from "@/lib/anime";
import { useAnimeScope } from "@/hooks/useAnimeScope";

/*
 * The heading's lines are GSAP's (data-reveal="lines"). Once they've landed, "guy." gives a
 * little shrug, and the main button is the last thing to arrive — it's the point of the page.
 */
function setup(scope: Scope) {
  const section = scope.root as HTMLElement;
  const guy = section.querySelector<HTMLElement>("[data-contact-guy]");
  const cta = section.querySelector<HTMLElement>("[data-contact-cta]");
  const link = section.querySelector<HTMLElement>("[data-contact-link]");
  const arrow = section.querySelector<HTMLElement>("[data-contact-arrow]");

  onFirstView(scope, guy, () => {
    animate(guy!, { rotate: [0, -9, 0], translateY: [0, "-0.06em", 0], duration: 700, delay: 900, ease: "inOutSine" });
  });

  onFirstView(scope, cta, () => {
    markEntered(cta);
    animate(cta!, { opacity: { from: 0, to: 1, duration: 150 }, scale: [0.82, 1], translateY: [20, 0], delay: 250, ease: springs.sticker() });
  });

  // The arrow springs off toward where it points, then comes back. Every hover, never stacking.
  const launch = () => animate(arrow!, { translateX: [0, 5, 0], translateY: [0, -5, 0], ease: springs.snappy() });
  link?.addEventListener("pointerenter", launch);
  link?.addEventListener("focus", launch);
  return () => {
    link?.removeEventListener("pointerenter", launch);
    link?.removeEventListener("focus", launch);
  };
}

export default function ContactMotion() {
  useAnimeScope("#contact", setup);
  return null;
}

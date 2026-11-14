"use client";

import { useEffect } from "react";
import { createTimeline, stagger, svg, utils } from "animejs";
import { ease, prefersReducedMotion, springs } from "@/lib/anime";
import { onIntroDone } from "@/lib/motion";

/*
 * Reading order, not DOM order: the headline lands first, the portrait assembles itself beside
 * it, the small talk (labels, annotation) arrives once you've read the joke, and the buttons
 * come last, when there's something to click for.
 *
 * Plays once the intro hands over. Visitors who skipped the intro (same session) get the same
 * piece at 1.5× speed — it's a reload, not a premiere.
 */
export default function HeroEntrance() {
  useEffect(() => {
    const html = document.documentElement;
    const section = document.getElementById("top");
    if (!section || html.dataset.hero !== "pending") return;

    if (prefersReducedMotion()) {
      html.dataset.hero = "done";
      return;
    }

    const $ = (selector: string) => Array.from(section.querySelectorAll<HTMLElement>(selector));
    const sawIntro = html.dataset.intro === "running";
    let timeline: ReturnType<typeof createTimeline> | undefined;

    const stopWaiting = onIntroDone(() => {
      const arrow = svg.createDrawable($("[data-hero-arrow]"));
      // Hands every element back to CSS and GSAP (parallax, magnetic buttons, the sag joke).
      const handOver = () => {
        html.dataset.hero = "done";
        if (timeline) utils.cleanInlineStyles(timeline);
      };

      timeline = createTimeline({ playbackRate: sawIntro ? 1 : 1.5, onComplete: handOver })
        .add($("[data-hero-eyebrow]"), { opacity: [0, 1], translateX: [-14, 0], duration: 500, ease: ease.paper })
        .label("headline", 80)
        .add($("[data-hero-line]"), { translateY: ["125%", "0%"], duration: 1100, delay: stagger(95), ease: ease.ink }, "headline")
        // Its line rises like the others; the word itself slides in sideways, so it arrives on a diagonal.
        .add($("[data-hero-questionable]"), { translateX: ["-16%", "0%"], rotate: [-7, 0], duration: 1000, ease: ease.paper }, "headline+=285")

        // The portrait builds itself: backdrop shapes first, then the photo is "placed" on top.
        .add($("[data-hero-part='block']"), { opacity: [0, 1], translateX: ["-18%", "0%"], duration: 700, ease: ease.ink }, "headline+=150")
        .add($("[data-hero-part='sun']"), { opacity: [0, 1], scale: [0.2, 1], duration: 650, ease: "outBack(1.4)" }, "<<+=140")
        .add($("[data-hero-portrait]"), { opacity: [0, 1], scale: [0.88, 1], rotate: [-6, 0], translateY: [24, 0], duration: 1000, ease: ease.ink }, "<<+=120")

        .add($("[data-hero-copy]"), { opacity: [0, 1], translateY: [16, 0], duration: 700, ease: ease.paper }, "headline+=650")
        .add(arrow, { draw: ["0 0", "0 1"], duration: 450, ease: "inOutSine" }, "headline+=900")
        .add($("[data-hero-note]"), { opacity: [0, 1], rotate: [-6, 0], translateY: [6, 0], duration: 500, ease: "outBack(2)" }, "<<")

        // Labels get stuck on like stickers: a little too hard, then they settle.
        .add($("[data-hero-label]"), {
          opacity: { from: 0, to: 1, duration: 120, ease: "linear" },
          scale: [0.5, 1],
          rotate: (_target: unknown, i = 0) => [i % 2 ? 14 : -16, 0],
          ease: springs.sticker(),
          delay: stagger(130),
        }, "headline+=1000")
        .add($("[data-hero-part='badge']"), { opacity: [0, 1], scale: [0, 1], duration: 600, ease: "outBack(1.8)" }, "<<+=180")

        .add($("[data-hero-strip]"), { opacity: [0, 1], clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], duration: 900, ease: ease.machine }, "headline+=1150")
        .add($("[data-hero-cta]"), { opacity: [0, 1], translateY: [18, 0], scale: [0.92, 1], ease: springs.snappy(), delay: stagger(90) }, "headline+=1350");
    });

    return () => {
      stopWaiting();
      // Strict Mode re-runs this effect: undo a half-played entrance and leave the hero "pending"
      // so the second run can start it cleanly. (The inline script's timeout is the last resort.)
      if (timeline && !timeline.completed) timeline.revert();
    };
  }, []);

  return null;
}

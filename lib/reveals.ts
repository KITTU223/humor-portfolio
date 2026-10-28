import { gsap, ScrollTrigger } from "./motion";

/*
 * Declarative scroll reveals. Markup opts in with data attributes:
 *   data-reveal="fade"   fade + rise
 *   data-reveal="joke"   same, but arrives late and slightly crooked (comedic timing)
 *   data-reveal="mask"   clip-path wipe, for images
 *   data-reveal="lines"  .line > span children slide up in sequence
 *   data-count="12"      number counts up
 *   data-progress        scaleY scrubbed against its parent
 *
 * CSS keeps targets hidden until they get data-revealed. Each tween sets explicit from-values,
 * then clears its inline styles, so the final state never depends on GSAP parsing CSS transforms.
 * Must run inside a gsap.context so everything is reverted on cleanup.
 */
const start = "top 88%";

function markRevealed(elements: Element[]) {
  elements.forEach((el) => el.setAttribute("data-revealed", ""));
}

export function setupReveals() {
  ScrollTrigger.batch("[data-reveal='fade']", {
    start,
    once: true,
    onEnter: (els) => {
      markRevealed(els);
      gsap.fromTo(
        els,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, clearProps: "opacity,visibility,transform" },
      );
    },
  });

  ScrollTrigger.batch("[data-reveal='joke']", {
    start,
    once: true,
    onEnter: (els) => {
      markRevealed(els);
      gsap.fromTo(
        els,
        { autoAlpha: 0, y: 12, rotate: -4 },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: 0.6,
          delay: 0.45,
          ease: "back.out(2.5)",
          stagger: 0.1,
          clearProps: "opacity,visibility,transform",
        },
      );
    },
  });

  gsap.utils.toArray<HTMLElement>("[data-reveal='mask']").forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        markRevealed([el]);
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.out", clearProps: "clipPath" },
        );
      },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-reveal='lines']").forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        markRevealed([el]);
        gsap.fromTo(
          el.querySelectorAll(".line > span"),
          { yPercent: 125, y: 0 },
          { yPercent: 0, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, clearProps: "transform" },
        );
      },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
    const counter = { value: 0 };
    const target = Number(el.dataset.count);
    const width = el.textContent?.length ?? 1;
    ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () =>
        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value)).padStart(width, "0");
          },
        }),
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((el) => {
    gsap.fromTo(
      el,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top 60%", end: "bottom 60%", scrub: true },
      },
    );
  });
}

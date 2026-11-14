"use client";

import { animate, createTimeline, stagger, steps, type Scope } from "animejs";
import { ease, markEntered, onFirstView, springs } from "@/lib/anime";
import { useAnimeScope } from "@/hooks/useAnimeScope";

/*
 * Headings, the main screenshots and the counters are GSAP's (data-reveal / data-count).
 * This adds the per-project details on top: how tags arrive, and the case-study set pieces.
 */

const all = (root: ParentNode, selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

function tags(scope: Scope, list: HTMLElement) {
  const items = Array.from(list.children) as HTMLElement[];
  const style = list.dataset.tags;

  onFirstView(scope, list, () => {
    markEntered(...items);
    if (style === "ledger") {
      // Entered one after another, like line items: wiped in left to right, no bounce.
      animate(items, { opacity: [0, 1], clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], duration: 380, delay: stagger(110), ease: ease.paper });
    } else if (style === "arcade") {
      animate(items, { opacity: [0, 1], scale: [0.4, 1], duration: 260, delay: stagger(70), ease: steps(4) });
    } else {
      // Stickers: dropped on slightly crooked, then pressed flat.
      animate(items, {
        opacity: { from: 0, to: 1, duration: 150 },
        translateY: [-10, 0],
        rotate: [() => (Math.random() - 0.5) * 14, 0],
        delay: stagger(60, { jitter: 25 }),
        ease: springs.sticker(),
      });
    }
  });
}

function invoiceCaseStudy(scope: Scope, root: ParentNode) {
  const page = root.querySelector<HTMLElement>("[data-print]");
  onFirstView(scope, page, () => {
    markEntered(page);
    // Paper feeding out of a printer: a slightly uneven chug down the page.
    animate(page!, { opacity: [0, 1], clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"], translateY: [-14, 0], duration: 1300, ease: steps(9) });
  });

  const lines = all(root, "[data-ledger]");
  onFirstView(scope, lines[0], () => {
    markEntered(...lines);
    animate(lines, { opacity: [0, 1], clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], duration: 600, delay: stagger(140, { start: 300 }), ease: ease.paper });
  });
}

function arcadeCaseStudy(scope: Scope, root: ParentNode) {
  const screen = root.querySelector<HTMLElement>("[data-pixel-wipe]");
  const phone = root.querySelector<HTMLElement>("[data-pixel-pop]");
  onFirstView(scope, screen, () => {
    markEntered(screen, phone);
    createTimeline()
      .add(screen!, { opacity: [0, 1], clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], duration: 640, ease: steps(8) })
      .add(phone!, { opacity: [0, 1], translateY: [36, 0], scale: [0.85, 1], duration: 300, ease: steps(5) }, "-=120");
  });
}

function nakuCaseStudy(scope: Scope, root: ParentNode) {
  // The phone is dropped onto the dashboard after it has wiped in (GSAP), and lands at its tilt.
  const phone = root.querySelector<HTMLElement>("[data-phone-slide]");
  onFirstView(scope, phone, () => {
    markEntered(phone);
    animate(phone!, { opacity: { from: 0, to: 1, duration: 200 }, translateY: ["35%", "0%"], rotate: [-12, 0], delay: 450, ease: springs.lazy() });
  });

  // The architecture assembles top-down, then one request travels from the apps to the backend.
  const arch = root.querySelector<HTMLElement>("[data-arch]");
  onFirstView(scope, arch, () => {
    const clients = all(arch!, "[data-arch-client]");
    const arrows = all(arch!, "[data-arch-arrow]");
    const backend = arch!.querySelector<HTMLElement>("[data-arch-backend]")!;
    markEntered(...clients, ...arrows, backend);
    createTimeline()
      .add(clients, { opacity: [0, 1], translateY: [-14, 0], duration: 500, delay: stagger(110), ease: "outBack(1.6)" })
      .add(arrows, { opacity: [0, 1], translateY: [-8, 0], duration: 300, delay: stagger(70), ease: ease.paper }, "-=150")
      .add(backend, { opacity: [0, 1], translateY: [14, 0], duration: 500, ease: ease.paper }, "-=100")
      .add(arrows, { translateY: [0, 6, 0], color: ["#ff6438", "#171717"], duration: 420, delay: stagger(90), ease: "inOutSine" }, "+=150")
      .add(backend, { scale: [1, 1.025, 1], duration: 300, ease: "outQuad" }, "-=180");
  });
}

function setup(scope: Scope) {
  const section = scope.root as HTMLElement;
  all(section, "[data-tags]").forEach((list) => tags(scope, list));
  invoiceCaseStudy(scope, section);
  arcadeCaseStudy(scope, section);
  nakuCaseStudy(scope, section);
}

export default function ProjectsMotion() {
  useAnimeScope("#work", setup);
  return null;
}

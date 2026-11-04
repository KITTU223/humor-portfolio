import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/motion";

const PEN_SPEED = 520; // viewBox units per second: an unhurried hand
const PEN_LIFT = 0.28; // seconds between strokes while the pen moves to the next one

/**
 * Signs the name like a hand would, once, when the signature comes into view: stroke by
 * stroke at pen speed, each stroke easing in and out like a wrist. No scroll coupling.
 * The markup ships fully signed, so without JS (or with reduced motion) it's just there.
 */
export function useSignatureDraw(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const strokes = Array.from(root.querySelectorAll<SVGPathElement>("[data-stroke]"));
      const credits = q("[data-credit]");
      // Dash in real lengths, not pathLength=1: GSAP rounds px values, so a 0..1 dash would snap
      // each stroke on in one go. The gap is twice the dash so no zero-length dash (a round-cap
      // dot) lands on the end of an unstarted stroke.
      strokes.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: `${len} ${len * 2}`, strokeDashoffset: len });
      });
      gsap.set(credits, { autoAlpha: 0, y: 14 });

      const sign = gsap.timeline({ paused: true });
      strokes.forEach((path, i) => {
        const len = path.getTotalLength();
        sign.to(
          path,
          { strokeDashoffset: 0, duration: Math.max(0.35, len / PEN_SPEED), ease: "power1.inOut" },
          i ? `>${PEN_LIFT}` : 0,
        );
      });
      sign.to(credits, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }, ">0.2");

      const target = q("[data-signature]")[0];
      if (!target) return;
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          sign.play();
        },
        { threshold: 0.6 },
      );
      io.observe(target);
    }, root);

    return () => {
      io?.disconnect();
      ctx.revert();
    };
  }, [scope]);
}

import { useEffect, useRef, type RefObject } from "react";
import { animate, utils } from "animejs";
import { ease, prefersReducedMotion, springs } from "@/lib/anime";

type Box = { x: number; y: number; w: number; h: number };

// offset* values ignore transforms, so the GSAP reveal sliding a group in doesn't skew this.
const boxOf = (button: HTMLElement): Box => ({
  x: button.offsetLeft,
  y: button.offsetTop,
  w: button.offsetWidth,
  h: button.offsetHeight,
});

const place = ({ x, y, w, h }: Box) => ({ translateX: x, translateY: y, width: w, height: h });

/**
 * One lime highlighter per skill group. Inside a group it glides to the new word; switching
 * groups, the old one is lifted off and the new one is swiped on, like a marker pen.
 */
export function useSkillHighlight(root: RefObject<HTMLElement | null>, activeName: string) {
  const current = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = root.current;
    if (!container || prefersReducedMotion()) return;
    const button = container.querySelector<HTMLElement>(`[data-skill="${CSS.escape(activeName)}"]`);
    const marker = button?.closest("[data-skill-group]")?.querySelector<HTMLElement>("[data-highlight]");
    if (!button || !marker) return;

    const box = boxOf(button);
    const previous = current.current;
    current.current = marker;

    if (previous === marker) {
      animate(marker, { ...place(box), opacity: 1, ease: springs.snappy() });
      return;
    }
    if (previous) {
      animate(previous, { opacity: 0, scaleX: 0, duration: 160, ease: "inQuad" });
    }
    utils.set(marker, { ...place(box), transformOrigin: "0% 50%" });
    animate(marker, { opacity: [0, 1], scaleX: [0, 1], duration: previous ? 260 : 0, ease: ease.paper });
  }, [root, activeName]);

  // Re-measure on resize; text reflows, the highlight shouldn't drift.
  useEffect(() => {
    const container = root.current;
    if (!container || prefersReducedMotion()) return;
    const remeasure = () => {
      const marker = current.current;
      const button = container.querySelector<HTMLElement>("[data-skill][aria-pressed='true']");
      if (marker && button) utils.set(marker, place(boxOf(button)));
    };
    const observer = new ResizeObserver(remeasure);
    observer.observe(container);
    document.fonts.ready.then(remeasure);
    return () => observer.disconnect();
  }, [root]);
}

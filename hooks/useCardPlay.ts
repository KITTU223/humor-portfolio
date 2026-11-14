import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/anime";

/**
 * Runs a card visual's trick when its card is "activated": mouse hover, keyboard focus, or a tap.
 * `play` returns a reset function, which runs on leave/blur and before every replay, so a
 * frantic triple-tap (the Easter egg) restarts the trick instead of stacking three copies.
 *
 * Touch has no "leave", so a tap just replays. Reduced motion skips all of it; the cards'
 * CSS hover states still work.
 */
export function useCardPlay(ref: RefObject<Element | null>, play: () => () => void) {
  useEffect(() => {
    const card = ref.current?.closest("article");
    if (!card || prefersReducedMotion()) return;

    let reset: (() => void) | null = null;
    const stop = () => {
      reset?.();
      reset = null;
    };
    const start = () => {
      stop();
      reset = play();
    };
    const startOnce = () => !reset && start();

    const onEnter = (event: PointerEvent) => event.pointerType !== "touch" && startOnce();
    const onLeave = (event: PointerEvent) => event.pointerType !== "touch" && stop();
    const onTap = (event: PointerEvent) => event.pointerType === "touch" && start();
    const onBlur = (event: FocusEvent) => !card.contains(event.relatedTarget as Node) && stop();

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
    card.addEventListener("pointerup", onTap);
    card.addEventListener("focusin", startOnce);
    card.addEventListener("focusout", onBlur);
    return () => {
      stop();
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
      card.removeEventListener("pointerup", onTap);
      card.removeEventListener("focusin", startOnce);
      card.removeEventListener("focusout", onBlur);
    };
  }, [ref, play]);
}

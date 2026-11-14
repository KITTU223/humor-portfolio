import { useEffect, type RefObject } from "react";
import { createScope, type Scope } from "animejs";
import { prefersReducedMotion } from "@/lib/anime";
import { onIntroDone } from "@/lib/motion";

type Root = string | RefObject<HTMLElement | null>;

/**
 * Builds an Anime.js scope for one section once the intro has handed over, and reverts it on
 * unmount (which also makes Strict Mode's double effect harmless). Reduced motion skips it
 * entirely: everything it would reveal is already visible in that mode.
 *
 * `setup` should be a stable, module-level function. It may return a cleanup (for listeners).
 */
export function useAnimeScope(root: Root, setup: (scope: Scope) => void | (() => void)) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const target = typeof root === "string" ? root : root.current;
    if (!target) return;

    let scope: Scope | undefined;
    const stopWaiting = onIntroDone(() => {
      scope = createScope({ root: target }).add((self) => setup(self!));
    });

    return () => {
      stopWaiting();
      scope?.revert();
    };
  }, [root, setup]);
}

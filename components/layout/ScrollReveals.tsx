"use client";

import { useEffect } from "react";
import { gsap, onIntroDone, ScrollTrigger } from "@/lib/motion";
import { setupReveals } from "@/lib/reveals";

// Rendered inside the page (not the layout) so it only runs once the content it animates has
// hydrated — the counters rewrite text, and doing that earlier causes hydration mismatches.
export default function ScrollReveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {});
    // Wait for the intro, otherwise reveals would play behind it where nobody can see them.
    const stopWaiting = onIntroDone(() => {
      ctx.add(setupReveals);
      ScrollTrigger.refresh();
    });

    return () => {
      stopWaiting();
      ctx.revert();
    };
  }, []);

  return null;
}

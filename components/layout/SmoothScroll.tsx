"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, onIntroDone, scroller, ScrollTrigger } from "@/lib/motion";

export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.11, anchors: true });
    scroller.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    if (document.documentElement.dataset.intro === "running") lenis.stop();
    const stopWaiting = onIntroDone(() => lenis.start());

    return () => {
      stopWaiting();
      gsap.ticker.remove(tick);
      lenis.destroy();
      scroller.lenis = null;
    };
  }, []);

  return null;
}

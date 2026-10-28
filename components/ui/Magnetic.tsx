"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

// Pulls its child toward the cursor on precise pointers. Touch and reduced-motion get a normal button.
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!el || !canHover.matches) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - rect.left - rect.width / 2) * strength);
      yTo((event.clientY - rect.top - rect.height / 2) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </div>
  );
}

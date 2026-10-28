"use client";

import { useEffect, useRef } from "react";
import styles from "./Cards.module.css";

// The AI card's robot watches the cursor, but only while you're actually on its card.
export default function Robot() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const robot = ref.current;
    const card = robot?.closest("article");
    if (!robot || !card) return;

    const onMove = (event: PointerEvent) => {
      const rect = robot.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      robot.style.setProperty("--look-x", `${Math.max(-1, Math.min(1, dx)) * 5}px`);
      robot.style.setProperty("--look-y", `${Math.max(-1, Math.min(1, dy)) * 3}px`);
    };
    const onLeave = () => {
      robot.style.setProperty("--look-x", "0px");
      robot.style.setProperty("--look-y", "0px");
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <svg ref={ref} className={styles.robot} viewBox="0 0 120 90" aria-hidden="true">
      <line x1="60" y1="6" x2="60" y2="18" />
      <circle cx="60" cy="5" r="4" className={styles.antenna} />
      <rect x="22" y="18" width="76" height="56" rx="14" />
      <g className={styles.eyes}>
        <circle cx="45" cy="44" r="7" />
        <circle cx="75" cy="44" r="7" />
      </g>
      <path d="M48 62h24" className={styles.mouth} />
    </svg>
  );
}

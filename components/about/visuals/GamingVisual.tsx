"use client";

import { useCallback, useRef } from "react";
import { animate, createTimer, steps } from "animejs";
import { useCardPlay } from "@/hooks/useCardPlay";
import styles from "../Cards.module.css";

// The continue screen actually counts down. Stay on the card long enough and you lose.
export default function GamingVisual() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const play = useCallback(() => {
    const label = labelRef.current!;
    const count = countRef.current!;
    let shown = 9;

    // Pixel-art bounce: big, then snapped down in chunky steps rather than smoothly.
    const bump = () => animate(count, { scale: [1.8, 1], duration: 240, ease: steps(4) });

    const countdown = createTimer({
      delay: 600, // let the CSS wipe reveal "CONTINUE?" first
      duration: 9800,
      onUpdate: (timer) => {
        const next = Math.min(9, Math.max(0, 9 - Math.floor(timer.currentTime / 1000)));
        if (next === shown) return;
        shown = next;
        count.textContent = String(next);
        bump();
      },
      onComplete: () => {
        label.textContent = "GAME OVER";
        count.textContent = "";
      },
    });

    return () => {
      countdown.pause();
      label.textContent = "CONTINUE?";
      count.textContent = "9";
      count.style.transform = "";
    };
  }, []);
  useCardPlay(labelRef, play);

  return (
    <div className={`${styles.visual} ${styles.arcade} bg-blue font-mono text-paper`}>
      <p className={styles.pressStart}>PRESS START</p>
      <p className={styles.continue}>
        <span ref={labelRef}>CONTINUE?</span> <span ref={countRef} className="inline-block">9</span>
      </p>
    </div>
  );
}

"use client";

import { useCallback, useRef } from "react";
import { createTimeline, scrambleText } from "animejs";
import { springs } from "@/lib/anime";
import { useCardPlay } from "@/hooks/useCardPlay";
import styles from "../Cards.module.css";

const LABEL = "My predictions";

// One prediction finally comes good... and goes to the third umpire. The WRONG column's
// flip from 47 to 48 is still the CSS hover; this is the RIGHT column's brief moment of hope.
export default function CricketVisual() {
  const labelRef = useRef<HTMLParagraphElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);

  const play = useCallback(() => {
    const label = labelRef.current!;
    const right = rightRef.current!;

    const review = createTimeline({ delay: 180 })
      .call(() => (right.textContent = "03"))
      .add(right, { scale: [1.6, 1], ease: springs.snappy() })
      .add(label, { innerHTML: scrambleText({ text: "Third umpire: overturned", chars: "uppercase", settleDuration: 160 }) }, "+=320")
      .call(() => (right.textContent = "02"), "+=120")
      .add(right, { translateX: [0, -4, 3, -2, 0], color: ["#ff6438", "#d9ff43"], duration: 380, ease: "linear" }, "<");

    return () => {
      review.revert();
      label.textContent = LABEL;
      right.textContent = "02";
    };
  }, []);
  useCardPlay(labelRef, play);

  return (
    <div className={`${styles.visual} ${styles.scoreboard} bg-[#1d3b2a] font-mono text-paper`}>
      <p ref={labelRef} className="annot text-paper/60">
        {LABEL}
      </p>
      <div className="mt-2 flex gap-6 text-sm">
        <p>
          RIGHT{" "}
          <span ref={rightRef} className="inline-block text-lime">
            02
          </span>
        </p>
        <p className="flex">
          WRONG&nbsp;
          <span className={styles.flip}>
            <span>47</span>
            <span>48</span>
          </span>
        </p>
      </div>
    </div>
  );
}

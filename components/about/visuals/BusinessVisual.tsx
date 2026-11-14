"use client";

import { useCallback, useRef } from "react";
import { createTimeline, scrambleText } from "animejs";
import { ease } from "@/lib/anime";
import { useCardPlay } from "@/hooks/useCardPlay";
import styles from "../Cards.module.css";

const stage = (text: string) => ({ innerHTML: scrambleText({ text, chars: "uppercase", settleDuration: 120 }) });

// Idea → building → shipped, then the CSS "PAID" stamp lands (its hover delay is tuned to this).
export default function BusinessVisual() {
  const fillRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  const play = useCallback(() => {
    const fill = fillRef.current!;
    const status = statusRef.current!;

    const pipeline = createTimeline()
      .add(fill, { scaleX: [0, 0.3], duration: 220, ease: ease.paper })
      .add(status, stage("Building"), "<<")
      // The middle bit always takes longest. Then it suddenly doesn't.
      .add(fill, { scaleX: 0.85, duration: 420, ease: "inOutSine" })
      .add(fill, { scaleX: 1, duration: 120, ease: "outQuad" })
      .add(status, stage("Shipped"), "<<");

    return () => {
      pipeline.revert();
      status.textContent = "Idea";
    };
  }, []);
  useCardPlay(fillRef, play);

  return (
    <div className={`${styles.visual} bg-paper font-mono text-[0.7rem]`}>
      <p className="flex justify-between border-b border-dashed border-ink/30 pb-1">
        <span>Ideas → product</span>
        <span>₹ ∞</span>
      </p>
      <p className="flex justify-between pt-1">
        <span>Coffee consumed</span>
        <span>non-billable</span>
      </p>
      <p className={styles.pipeline} aria-hidden="true">
        <span className={styles.pipelineTrack}>
          <span ref={fillRef} className={styles.pipelineFill} />
        </span>
        <span ref={statusRef} className="uppercase">
          Idea
        </span>
      </p>
      <span className={styles.stamp}>Paid</span>
    </div>
  );
}

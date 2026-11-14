"use client";

import { useCallback, useRef } from "react";
import { createTimeline, scrambleText } from "animejs";
import { useCardPlay } from "@/hooks/useCardPlay";
import Robot from "../Robot";
import styles from "../Cards.module.css";

const IDLE = "Status: idle";

// Two dots arrive on time. The third one takes a while. Then it delivers its verdict.
export default function AIVisual() {
  const statusRef = useRef<HTMLSpanElement>(null);
  const dotsRef = useRef<HTMLSpanElement>(null);

  const play = useCallback(() => {
    const status = statusRef.current!;
    const dots = Array.from(dotsRef.current!.children);
    const antenna = status.closest("article")?.querySelector("[data-antenna]");

    const thinking = createTimeline()
      .add(status, { innerHTML: scrambleText({ text: "Analysing human", chars: "lowercase", settleDuration: 100 }) })
      .add(dots[0], { opacity: [0, 1], duration: 1 }, "+=120")
      .add(dots[1], { opacity: [0, 1], duration: 1 }, "+=180")
      .add(dots[2], { opacity: [0, 1], duration: 1 }, "+=1050")
      .add(dots, { opacity: 0, duration: 1 }, "+=250")
      .add(status, { innerHTML: scrambleText({ text: "Verdict: judging you. Politely.", chars: "lowercase", settleDuration: 140 }) }, "<");
    if (antenna) {
      thinking.add(antenna, { opacity: [1, 0.15, 1, 0.15, 1, 0.15, 1], duration: 1500, ease: "linear" }, 0);
    }

    return () => {
      thinking.revert();
      status.textContent = IDLE;
    };
  }, []);
  useCardPlay(statusRef, play);

  return (
    <div className={`${styles.visual} grid place-items-center bg-lime`}>
      <Robot />
      <p className={styles.aiStatus} aria-hidden="true">
        <span ref={statusRef}>{IDLE}</span>
        <span ref={dotsRef}>
          <span className="opacity-0">.</span>
          <span className="opacity-0">.</span>
          <span className="opacity-0">.</span>
        </span>
      </p>
    </div>
  );
}

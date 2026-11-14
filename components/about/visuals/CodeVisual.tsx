"use client";

import { useCallback, useRef } from "react";
import { createTimeline } from "animejs";
import { useCardPlay } from "@/hooks/useCardPlay";
import styles from "../Cards.module.css";

const COMMENT = "// fixed: it was a typo (3h)";

// Keystrokes for typing the comment, including the typo it's about. Each entry is the text
// on screen and how long the "hand" took to get there.
function keystrokes() {
  const frames: [string, number][] = [];
  let text = "";
  const jitter = () => Math.random() * 35;
  const type = (chars: string, pace = 30) => {
    for (const char of chars) frames.push([(text += char), pace + jitter()]);
  };
  const erase = (count: number) => {
    for (let i = 0; i < count; i++) frames.push([(text = text.slice(0, -1)), 70]);
  };

  type("// fixde");
  frames.push([text, 420]); // ...wait.
  erase(2);
  type("ed: it was a typo (3h)");
  return frames;
}

export default function CodeVisual() {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const play = useCallback(() => {
    const line = lineRef.current!;
    const text = textRef.current!;
    line.dataset.playing = "";
    text.textContent = "";

    const typing = createTimeline();
    let at = 0;
    for (const [frame, pause] of keystrokes()) {
      at += pause;
      typing.call(() => (text.textContent = frame), at);
    }

    return () => {
      typing.pause();
      delete line.dataset.playing;
      text.textContent = COMMENT;
    };
  }, []);
  useCardPlay(lineRef, play);

  return (
    <div className={`${styles.visual} bg-night font-mono text-xs text-paper`}>
      <p>
        <span className="text-blue">const</span> sleep = <span className="text-signal">null</span>;
      </p>
      <p ref={lineRef} className={styles.typed} aria-hidden="true">
        <span ref={textRef}>{COMMENT}</span>
      </p>
      <span className="sr-only">{COMMENT}</span>
    </div>
  );
}

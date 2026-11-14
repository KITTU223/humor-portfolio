"use client";

import { useRef, useState } from "react";
import { animate, spring, utils } from "animejs";
import { prefersReducedMotion, springs } from "@/lib/anime";

const MAX_DODGES = 4;
const EDGE = 8; // px the dodging button keeps from the card's border

export default function EscapingButton() {
  const [dodges, setDodges] = useState(0);
  const [declined, setDeclined] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLSpanElement>(null);
  const yesRef = useRef<HTMLSpanElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const freed = dodges >= MAX_DODGES;

  const moveTo = (x: number, y: number, settle = false) => {
    offset.current = { x, y };
    const target = { translateX: x, translateY: y };
    if (prefersReducedMotion()) return utils.set(noRef.current!, target);
    animate(noRef.current!, {
      ...target,
      rotate: settle ? [0, -6, 4, 0] : (x > 0 ? 1 : -1) * 4,
      ease: settle ? springs.lazy() : spring({ bounce: 0.45, duration: 420 }),
    });
  };

  // The "fair" part: every dodge makes the other option a little more persuasive.
  const growHire = (count: number) => {
    const scale = count >= MAX_DODGES ? 1 : 1 + count * 0.05;
    if (prefersReducedMotion()) return;
    animate(yesRef.current!, { scale, ease: springs.snappy() });
  };

  // Mouse only: keyboard and touch users can always press it straight away.
  const dodge = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || freed) return;
    const next = dodges + 1;
    setDodges(next);
    growHire(next);
    if (next >= MAX_DODGES) {
      moveTo(0, 0, true);
      return;
    }

    // Jump to the other side, but never out of the card.
    const area = areaRef.current!.getBoundingClientRect();
    const button = noRef.current!.getBoundingClientRect();
    const homeLeft = button.left - offset.current.x;
    const homeTop = button.top - offset.current.y;
    const side = offset.current.x > 0 ? -1 : 1;
    const x = utils.clamp(side * utils.random(50, 90), area.left + EDGE - homeLeft, area.right - EDGE - button.width - homeLeft);
    const y = utils.clamp(utils.random(-25, 25), area.top + EDGE - homeTop, area.bottom - EDGE - button.height - homeTop);
    moveTo(x, y);
  };

  const message = declined
    ? "Noted. No hard feelings. (Some hard feelings.)"
    : freed
      ? "Okay, okay. Your free will has been restored."
      : dodges > 0
        ? ["Whoops.", "Slippery, isn't it?", "One more and I'll stop. Probably."][dodges - 1]
        : "A completely fair and balanced choice.";

  return (
    <div ref={areaRef} className="flex h-full flex-col items-center justify-center gap-10 py-8 text-center">
      <p className="font-display text-3xl uppercase">Would you like to hire Krutarth?</p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <span ref={yesRef} className="inline-block">
          <a href="#contact" className="btn btn-primary bg-blue hover:bg-ink">
            Hire Krutarth
          </a>
        </span>
        <span ref={noRef} className="inline-block">
          <button type="button" onPointerEnter={dodge} onClick={() => setDeclined(true)} className="btn btn-ghost">
            No thanks
          </button>
        </span>
      </div>
      <p aria-live="polite" className="min-h-[1.5em] font-serif text-xl italic">
        {message}
      </p>
    </div>
  );
}

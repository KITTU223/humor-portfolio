"use client";

import { useState } from "react";

const MAX_DODGES = 4;

export default function EscapingButton() {
  const [dodges, setDodges] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [declined, setDeclined] = useState(false);
  const freed = dodges >= MAX_DODGES;

  // Mouse only: keyboard and touch users can always press it straight away.
  const dodge = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || freed) return;
    const next = dodges + 1;
    setDodges(next);
    if (next >= MAX_DODGES) {
      setOffset({ x: 0, y: 0 });
      return;
    }
    const side = offset.x > 0 ? -1 : 1;
    setOffset({ x: side * (50 + Math.random() * 40), y: (Math.random() - 0.5) * 50 });
  };

  const message = declined
    ? "Noted. No hard feelings. (Some hard feelings.)"
    : freed
      ? "Okay, okay. Your free will has been restored."
      : dodges > 0
        ? ["Whoops.", "Slippery, isn't it?", "One more and I'll stop. Probably."][dodges - 1]
        : "A completely fair and balanced choice.";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 py-8 text-center">
      <p className="font-display text-3xl uppercase">Would you like to hire Krutarth?</p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <a href="#contact" className="btn btn-primary bg-blue hover:bg-ink">
          Hire Krutarth
        </a>
        <button
          type="button"
          onPointerEnter={dodge}
          onClick={() => setDeclined(true)}
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          className="btn btn-ghost transition-transform duration-300 ease-[var(--ease-spring)]"
        >
          No thanks
        </button>
      </div>
      <p aria-live="polite" className="min-h-[1.5em] font-serif text-xl italic">
        {message}
      </p>
    </div>
  );
}

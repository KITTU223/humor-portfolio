"use client";

import { useRef, useState } from "react";

const reactions = [
  "I specifically asked you not to.",
  "Interesting. We have a rebel.",
  "Fine. Have a confetti.",
  "That was the only confetti. Budget cuts.",
  "You're still clicking. That's either curiosity or a bug report.",
  "I'm telling the other buttons.",
];

const CONFETTI_COLORS = ["#d9ff43", "#4355f5", "#ff6438", "#171717"];

function burstConfetti(origin: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < 22; i++) {
    const piece = document.createElement("span");
    piece.style.cssText = `position:absolute;left:50%;top:50%;width:8px;height:12px;pointer-events:none;background:${CONFETTI_COLORS[i % 4]}`;
    origin.appendChild(piece);
    const angle = (Math.PI * 2 * i) / 22 + Math.random() * 0.4;
    const distance = 70 + Math.random() * 70;
    piece
      .animate(
        [
          { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance + 60}px) rotate(${Math.random() * 720}deg)`,
            opacity: 0,
          },
        ],
        { duration: 900 + Math.random() * 400, easing: "cubic-bezier(0.2, 0.8, 0.4, 1)" },
      )
      .finished.then(() => piece.remove());
  }
}

export default function ImpossibleButton() {
  const [clicks, setClicks] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = clicks + 1;
    setClicks(next);
    if (next === 3) burstConfetti(wrapRef.current!);
    if (next > reactions.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      event.currentTarget.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.15, 0.8)" }, { transform: "scale(0.95, 1.08)" }, { transform: "scale(1)" }],
        { duration: 450, easing: "ease-out" },
      );
    }
  };

  const message =
    clicks === 0
      ? "It's a perfectly normal button with one request."
      : clicks <= reactions.length
        ? reactions[clicks - 1]
        : `Click #${clicks}. I've stopped keeping count. (I haven't.)`;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 py-6 text-center">
      <div ref={wrapRef} className="relative">
        <button
          type="button"
          onClick={onClick}
          className="min-h-24 min-w-56 rounded-full border-[3px] border-ink bg-signal px-8 font-display text-3xl tracking-wide uppercase shadow-[0_8px_0_var(--color-ink)] transition-[transform,box-shadow] duration-100 active:translate-y-2 active:shadow-[0_0_0_var(--color-ink)]"
        >
          {clicks > reactions.length ? "Click away" : "Do not click"}
        </button>
      </div>
      <p aria-live="polite" className="min-h-[3.5em] max-w-xs font-serif text-xl italic">
        {message}
      </p>
    </div>
  );
}

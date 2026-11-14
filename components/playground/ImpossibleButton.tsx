"use client";

import { useEffect, useRef, useState } from "react";
import { animate, utils } from "animejs";
import { prefersReducedMotion, springs } from "@/lib/anime";

const reactions = [
  "I specifically asked you not to.",
  "Interesting. We have a rebel.",
  "Fine. Have a confetti.",
  "That was the only confetti. Budget cuts.",
  "You're still clicking. That's either curiosity or a bug report.",
  "I'm telling the other buttons.",
];

const CONFETTI_COLORS = ["#d9ff43", "#4355f5", "#ff6438", "#171717"];

// Thrown up and out, then gravity takes over: rise and fall are separate eases, which is what
// makes it read as an arc rather than a straight line.
function burstConfetti(layer: HTMLElement) {
  for (let i = 0; i < 22; i++) {
    const piece = document.createElement("span");
    piece.style.cssText = `position:absolute;left:50%;top:50%;width:8px;height:12px;margin:-6px 0 0 -4px;background:${CONFETTI_COLORS[i % 4]}`;
    layer.appendChild(piece);

    const angle = (Math.PI * 2 * i) / 22 + utils.random(0, 0.4, 2);
    const distance = utils.random(70, 140);
    const lift = Math.sin(angle) * distance - utils.random(30, 60);
    const duration = utils.random(950, 1300);
    animate(piece, {
      translateX: { to: Math.cos(angle) * distance, ease: "outCirc" },
      translateY: [
        { to: lift, duration: duration * 0.35, ease: "outQuad" },
        { to: lift + utils.random(140, 200), duration: duration * 0.65, ease: "inQuad" },
      ],
      rotate: utils.random(-540, 540),
      opacity: { to: 0, delay: duration * 0.6, duration: duration * 0.4 },
      duration,
      onComplete: () => piece.remove(),
    });
  }
}

export default function ImpossibleButton() {
  const [clicks, setClicks] = useState(0);
  const bodyRef = useRef<HTMLSpanElement>(null);
  const confettiRef = useRef<HTMLSpanElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const lastFlinch = useRef(0);

  // Each new reaction is delivered slightly sideways, like it was muttered.
  useEffect(() => {
    if (clicks === 0 || prefersReducedMotion()) return;
    animate(messageRef.current!, { opacity: [0, 1], rotate: [-2.5, 0], translateY: [6, 0], duration: 320, ease: "outBack(2)" });
  }, [clicks]);

  // It flinches away from the cursor. Never far enough to dodge: it's nervous, not rude.
  const flinch = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse" || prefersReducedMotion()) return;
    // Moving away can carry the button out from under a cursor parked on its edge; without a
    // cooldown it would re-enter and flinch forever.
    if (event.timeStamp - lastFlinch.current < 1500) return;
    lastFlinch.current = event.timeStamp;
    const rect = event.currentTarget.getBoundingClientRect();
    const away = event.clientX < rect.left + rect.width / 2 ? 1 : -1;
    animate(bodyRef.current!, {
      translateX: [0, away * 9, 0],
      rotate: [0, away * 3, 0],
      duration: 420,
      ease: "outQuad",
    });
  };

  const onClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (prefersReducedMotion()) return;
    if (next === 3) burstConfetti(confettiRef.current!);
    // Past the scripted reactions the button gives up on dignity and just goes boing.
    const boing = next > reactions.length;
    animate(bodyRef.current!, {
      scaleX: [boing ? 1.18 : 1.06, 1],
      scaleY: [boing ? 0.78 : 0.94, 1],
      ease: boing ? springs.sticker() : springs.snappy(),
    });
  };

  const message =
    clicks === 0
      ? "It's a perfectly normal button with one request."
      : clicks <= reactions.length
        ? reactions[clicks - 1]
        : `Click #${clicks}. I've stopped keeping count. (I haven't.)`;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 py-6 text-center">
      <div className="relative">
        <span ref={bodyRef} className="inline-block">
          <button
            type="button"
            onClick={onClick}
            onPointerEnter={flinch}
            className="min-h-24 min-w-56 rounded-full border-[3px] border-ink bg-signal px-8 font-display text-3xl tracking-wide uppercase shadow-[0_8px_0_var(--color-ink)] transition-[transform,box-shadow] duration-100 active:translate-y-2 active:shadow-[0_0_0_var(--color-ink)]"
          >
            {clicks > reactions.length ? "Click away" : "Do not click"}
          </button>
        </span>
        <span ref={confettiRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
      </div>
      <p ref={messageRef} aria-live="polite" className="min-h-[3.5em] max-w-xs font-serif text-xl italic">
        {message}
      </p>
    </div>
  );
}

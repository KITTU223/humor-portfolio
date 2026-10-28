"use client";

import { useEffect, useRef, useState } from "react";

const SPOTS = [
  { top: "6%", left: "88%" },
  { top: "48%", left: "2%" },
  { top: "92%", left: "60%" },
  { top: "30%", left: "96%" },
  { top: "96%", left: "8%" },
];
const NOTICE_DISTANCE = 110;

// Lives in the Playground only. Gets nervous when the cursor comes close.
export default function LurkingBug() {
  const ref = useRef<HTMLSpanElement>(null);
  const [spot, setSpot] = useState(0);
  const [squeak, setSqueak] = useState(false);

  useEffect(() => {
    const bug = ref.current;
    const section = bug?.closest("section");
    if (!bug || !section) return;
    let cooling = false;

    const onMove = (event: PointerEvent) => {
      if (cooling) return;
      const rect = bug.getBoundingClientRect();
      const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
      if (distance > NOTICE_DISTANCE) return;
      cooling = true;
      setSqueak(true);
      setSpot((current) => (current + 1 + Math.floor(Math.random() * (SPOTS.length - 1))) % SPOTS.length);
      window.setTimeout(() => {
        cooling = false;
        setSqueak(false);
      }, 900);
    };

    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute z-10 transition-[top,left] duration-700 ease-[var(--ease-expo)] motion-reduce:transition-none"
      style={SPOTS[spot]}
    >
      <svg width="28" height="22" viewBox="0 0 28 22" className="-rotate-12">
        <path d="M6 4 2 1M6 18l-4 3M14 3V0M14 19v3M22 4l4-3M22 18l4 3" stroke="#171717" strokeWidth="1.6" />
        <ellipse cx="14" cy="11" rx="9" ry="7" fill="#171717" />
        <circle cx="11" cy="9" r="1.6" fill="#ff6438" />
        <circle cx="17" cy="13" r="1.6" fill="#ff6438" />
      </svg>
      {squeak && <span className="absolute -top-6 left-6 font-mono text-xs whitespace-nowrap">eep!</span>}
    </span>
  );
}

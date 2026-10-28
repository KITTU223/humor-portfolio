"use client";

import { useRef, useState } from "react";
import Magnetic from "@/components/ui/Magnetic";

const LEAVE_MESSAGE_MS = 1800;

export default function HireButton() {
  const [mood, setMood] = useState<"idle" | "hover" | "left">("idle");
  const timer = useRef<number>(undefined);

  const enter = () => {
    window.clearTimeout(timer.current);
    setMood("hover");
  };
  const leave = () => {
    setMood("left");
    timer.current = window.setTimeout(() => setMood("idle"), LEAVE_MESSAGE_MS);
  };

  const remark = mood === "hover" ? "Excellent decision." : mood === "left" ? "Understandable. Big commitment." : "";

  return (
    <div className="relative">
      <Magnetic>
        <a
          href="#contact"
          className="btn btn-ghost bg-lime"
          onPointerEnter={enter}
          onPointerLeave={leave}
          onFocus={enter}
          onBlur={leave}
        >
          Hire this guy <span aria-hidden="true">↗</span>
        </a>
      </Magnetic>
      <p
        aria-live="polite"
        className="pointer-events-none absolute top-full left-2 mt-3 -rotate-2 font-serif text-lg whitespace-nowrap text-blue italic"
      >
        {remark}
      </p>
    </div>
  );
}

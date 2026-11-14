"use client";

import { useEffect, useRef, useState } from "react";
import { animate, scrambleText } from "animejs";
import { ease, prefersReducedMotion } from "@/lib/anime";

type Props = {
  name: string;
  path: string;
  caption: string;
  position: string;
  evidence: string;
};

/*
 * The name and path are written by Anime.js (scrambled like a terminal redraw), so React renders
 * them once and never touches them again; screen readers get the plain name from an sr-only copy.
 */
export default function StackTerminal({ name, path, caption, position, evidence }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const [initial] = useState({ name, path });
  const lastPath = useRef(path);

  useEffect(() => {
    const nameEl = nameRef.current!;
    const pathEl = pathRef.current!;
    if (nameEl.textContent === name) return; // first render, or the same skill again

    const pathChanged = lastPath.current !== path;
    lastPath.current = path;

    if (prefersReducedMotion()) {
      nameEl.textContent = name;
      pathEl.textContent = path;
      return;
    }

    animate(nameEl, { innerHTML: scrambleText({ text: name, chars: "A-Z", revealRate: 140, settleDuration: 90 }) });
    if (pathChanged) {
      animate(pathEl, { innerHTML: scrambleText({ text: path, chars: "a-z/-", revealRate: 160, settleDuration: 60, cursor: true }) });
    }
    animate(captionRef.current!, { opacity: [0, 1], translateY: [6, 0], duration: 280, ease: ease.paper });
    // A small keypress: the panel dips toward its shadow and comes back.
    animate(panelRef.current!, { translateX: [0, 3, 0], translateY: [0, 3, 0], duration: 160, ease: "outQuad" });
  }, [name, path]);

  return (
    <div
      ref={panelRef}
      className="sticky top-20 z-10 self-start border-2 border-ink bg-night p-5 text-paper shadow-[6px_6px_0_var(--color-blue)] sm:p-7 lg:order-2 lg:col-span-5 lg:top-28"
      aria-live="polite"
    >
      <p className="annot flex justify-between text-paper/50">
        <span ref={pathRef} aria-hidden="true">
          {initial.path}
        </span>
        <span>{position}</span>
      </p>
      <p className="mt-3 font-display text-4xl text-lime uppercase sm:mt-6 sm:text-6xl">
        <span ref={nameRef} aria-hidden="true">
          {initial.name}
        </span>
        <span className="sr-only">{name}</span>
      </p>
      <p ref={captionRef} className="mt-2 min-h-[3.5em] font-serif text-xl leading-snug italic sm:mt-4 sm:text-2xl">
        {caption}
      </p>
      <p className="annot mt-4 hidden border-t border-paper/15 pt-4 text-paper/60 sm:block">{evidence}</p>
    </div>
  );
}

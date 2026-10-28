"use client";

import { useEffect, useState } from "react";
import { easterEggs, konamiEgg, type EggDefinition } from "@/data/easterEggs";
import styles from "./EasterEggs.module.css";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const SHADOWS = ["var(--color-signal)", "var(--color-blue)", "var(--color-lime)"];
// Generous on purpose: relaxed taps on a phone often land 600-800ms apart.
const TAP_WINDOW_MS = 900;

type Egg = {
  id: number;
  mode: string;
  text: string;
  ms: number;
  tilt: number;
  shadow: string;
  flip: boolean;
  peak: number;
  source?: Element;
};

const random = (min: number, max: number) => min + Math.random() * (max - min);
const lastLine = new Map<string, number>();
let nextId = 0;

// Everything random is decided here, in event handlers, never during render.
function roll(definition: EggDefinition, source?: Element): Egg {
  const { lines } = definition;
  let index = Math.floor(Math.random() * lines.length);
  if (lines.length > 1 && index === lastLine.get(definition.mode)) index = (index + 1) % lines.length;
  lastLine.set(definition.mode, index);

  return {
    id: nextId++,
    mode: definition.mode,
    text: lines[index],
    ms: definition.ms,
    tilt: random(-3.5, 3.5),
    shadow: SHADOWS[Math.floor(Math.random() * SHADOWS.length)],
    flip: Math.random() < 0.5,
    peak: random(8, 30),
    source,
  };
}

let greeted = false;

export default function EasterEggs() {
  const [egg, setEgg] = useState<Egg | null>(null);

  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      "%cHello, fellow inspect-element enthusiast.",
      "font: 700 16px monospace; background: #d9ff43; color: #171717; padding: 6px 10px;",
    );
    console.log("If you're reading this, we should probably talk. → contact@krutonic.com");
    console.log(
      "Since you're here: type boxbox, pushpa or surya. Triple-tap the logo or any personality card. Konami code works too.",
    );
  }, []);

  useEffect(() => {
    let konami = 0;
    let typed = "";

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]")) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      konami = key === KONAMI[konami] ? konami + 1 : key === KONAMI[0] ? 1 : 0;
      if (konami === KONAMI.length) {
        konami = 0;
        setEgg(roll(konamiEgg));
        return;
      }

      if (!/^[a-z]$/.test(key)) return;
      typed = (typed + key).slice(-12);
      const found = easterEggs.find((item) => item.typeable && typed.endsWith(item.code));
      if (found) {
        typed = "";
        setEgg(roll(found));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Triple-tap anything with data-egg-trigger. Works on phones, where nobody is typing "pushpa".
  useEffect(() => {
    let last: Element | null = null;
    let taps = 0;
    let lastTap = 0;

    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as Element).closest("[data-egg-trigger]");
      if (!trigger) return;
      taps = trigger === last && event.timeStamp - lastTap < TAP_WINDOW_MS ? taps + 1 : 1;
      last = trigger;
      lastTap = event.timeStamp;
      if (taps < 3) return;
      taps = 0;
      const found = easterEggs.find((item) => item.code === trigger.getAttribute("data-egg-trigger"));
      if (found) setEgg(roll(found, trigger));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!egg) return;
    const html = document.documentElement;
    const attribute = egg.mode === "dramatic" ? "mode" : "egg";
    // Re-triggering during a surprise: the previous cleanup removed the attribute in this same
    // frame, so force a style flush first or the CSS animations won't restart.
    delete html.dataset[attribute];
    egg.source?.removeAttribute("data-egg-pop");
    void html.offsetWidth;
    html.dataset[attribute] = egg.mode;
    egg.source?.setAttribute("data-egg-pop", "");
    const timer = window.setTimeout(() => setEgg(null), egg.ms);
    return () => {
      window.clearTimeout(timer);
      delete html.dataset[attribute];
      egg.source?.removeAttribute("data-egg-pop");
    };
  }, [egg]);

  return (
    <>
      {egg?.mode === "catch" && (
        <div
          key={egg.id}
          className={styles.flight}
          data-flip={egg.flip}
          style={{ "--peak": `${egg.peak}vh` } as React.CSSProperties}
          aria-hidden="true"
        >
          <span className={styles.ball} />
          <span className={styles.caught}>Caught!</span>
        </div>
      )}
      <div role="status" className="pointer-events-none fixed inset-x-0 bottom-6 z-80 flex justify-center px-4">
        {egg && (
          <p
            key={egg.id}
            className={`${styles.toast} max-w-xl border-2 border-ink bg-ink px-5 py-3 text-center font-display text-lg tracking-wide text-lime uppercase sm:text-2xl`}
            style={{ "--tilt": `${egg.tilt}deg`, boxShadow: `6px 6px 0 ${egg.shadow}` } as React.CSSProperties}
          >
            {egg.text}
          </p>
        )}
      </div>
    </>
  );
}

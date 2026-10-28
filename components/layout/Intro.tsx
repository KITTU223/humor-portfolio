"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import styles from "./Intro.module.css";

const messages = [
  "Aligning approximately 4,000 divs...",
  "Negotiating with CSS...",
  "Asking JavaScript to behave...",
  "Removing unnecessary console.logs...",
  "Convincing the designer this is intentional...",
];

const MIN_DURATION = 1800;
const TASK_TIMEOUT = 3500;

function withTimeout(task: Promise<unknown>) {
  return Promise.race([
    task,
    new Promise((resolve) => setTimeout(resolve, TASK_TIMEOUT)),
  ]);
}

function heroImageReady() {
  const img = document.querySelector<HTMLImageElement>(
    "[data-hero-portrait] img",
  );
  if (!img || img.complete) return Promise.resolve();
  return new Promise((resolve) => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  });
}

function windowLoaded() {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) =>
    window.addEventListener("load", resolve, { once: true }),
  );
}

export default function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    if (html.dataset.intro !== "running" || !root) return;

    const q = gsap.utils.selector(root);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const started = performance.now();
    const progress = { value: 0 };
    let finished = false;
    let messageIndex = 0;

    const render = () => {
      gsap.set(barRef.current, { scaleX: progress.value });
      if (percentRef.current)
        percentRef.current.textContent = String(
          Math.round(progress.value * 100),
        );
    };

    const ticker = reduced
      ? undefined
      : window.setInterval(() => {
          messageIndex = Math.min(messageIndex + 1, messages.length - 1);
          setMessage(messages[messageIndex]);
        }, 380);

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearInterval(ticker);
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {}
      html.dataset.intro = "done";
    };

    const exit = (quick: boolean) => {
      if (finished) return;
      gsap.killTweensOf(progress);
      if (quick || reduced) {
        gsap.to(root, { autoAlpha: 0, duration: 0.3, onComplete: finish });
        return;
      }
      window.clearInterval(ticker);
      setMessage("Well, that was dramatic.");
      gsap
        .timeline({ delay: 0.75, onComplete: finish })
        .to(q(`.${styles.content}`), {
          yPercent: -30,
          autoAlpha: 0,
          duration: 0.45,
          ease: "power2.in",
        })
        .to(
          q(`.${styles.top}`),
          { yPercent: -100, duration: 0.9, ease: "expo.inOut" },
          "-=0.1",
        )
        .to(
          q(`.${styles.bottom}`),
          { yPercent: 100, duration: 0.9, ease: "expo.inOut" },
          "<",
        );
    };
    skipRef.current = () => exit(true);

    const tasks = [document.fonts.ready, heroImageReady(), windowLoaded()];
    let completed = 0;
    tasks.forEach((task) =>
      withTimeout(task).then(() => {
        completed += 1;
        gsap.to(progress, {
          value: completed / tasks.length,
          duration: 0.5,
          ease: "power2.out",
          onUpdate: render,
        });
      }),
    );

    Promise.all(tasks.map(withTimeout)).then(() => {
      const wait = Math.max(
        0,
        (reduced ? 300 : MIN_DURATION) - (performance.now() - started),
      );
      window.setTimeout(() => {
        gsap.to(progress, {
          value: 1,
          duration: 0.25,
          onUpdate: render,
          onComplete: () => exit(false),
        });
      }, wait);
    });

    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && exit(true);
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearInterval(ticker);
      window.removeEventListener("keydown", onKey);
      gsap.killTweensOf(progress);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.intro}
      aria-label="Loading the portfolio"
    >
      <div className={styles.top} />
      <div className={styles.bottom} />

      <div className={`${styles.content} shell`}>
        <p className="annot text-muted">Portfolio / Krutarth Chauhan</p>
        <p className="mt-6 max-w-[14ch] font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.9] uppercase">
          Preparing something incredibly important.
        </p>
        <p className="punchline mt-4 text-muted">
          It&apos;s a portfolio. Relax.
        </p>

        <div className="mt-10 flex items-end justify-between gap-6 font-mono text-xs uppercase sm:text-sm">
          <p role="status" className="min-h-[2.5em] max-w-[34ch]">
            {message}
          </p>
          <p className="tabular-nums" aria-hidden="true">
            <span ref={percentRef}>0</span>%
          </p>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden bg-ink/10">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-ink" />
        </div>
      </div>

      <button
        type="button"
        onClick={() => skipRef.current()}
        className={`${styles.skip} annot`}
      >
        Skip intro →
      </button>
    </div>
  );
}

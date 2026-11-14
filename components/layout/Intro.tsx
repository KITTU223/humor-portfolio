"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline, splitText, stagger } from "animejs";
import { ease, prefersReducedMotion, springs } from "@/lib/anime";
import styles from "./Intro.module.css";

const messages = [
  "Aligning approximately 4,000 divs...",
  "Negotiating with CSS...",
  "Asking JavaScript to behave...",
  "Removing unnecessary console.logs...",
  "Convincing the designer this is intentional...",
];
const returningMessage = "Oh, it's you again. Short version, then.";

const MIN_DURATION = 1800;
const MIN_DURATION_RETURNING = 900;
const MESSAGE_MS = 380;
const TASK_TIMEOUT = 3500;

function withTimeout(task: Promise<unknown>) {
  return Promise.race([task, new Promise((resolve) => setTimeout(resolve, TASK_TIMEOUT))]);
}

function heroImageReady() {
  const img = document.querySelector<HTMLImageElement>("[data-hero-portrait] img");
  if (!img || img.complete) return Promise.resolve();
  return new Promise((resolve) => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  });
}

function windowLoaded() {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
}

// Seen it in a previous session? Then you get the abridged edition. Read once per page load,
// so Strict Mode's second effect run doesn't mistake the first for a previous visit.
let returningVisitor: boolean | undefined;
function isReturning() {
  if (returningVisitor !== undefined) return returningVisitor;
  try {
    returningVisitor = localStorage.getItem("intro-visited") === "1";
    localStorage.setItem("intro-visited", "1");
  } catch {
    returningVisitor = false;
  }
  return returningVisitor;
}

export default function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const punchRef = useRef<HTMLParagraphElement>(null);
  const messageRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    const heading = headingRef.current;
    const message = messageRef.current;
    if (html.dataset.intro !== "running" || !root || !heading || !message) return;

    const reduced = prefersReducedMotion();
    const returning = isReturning();
    const started = performance.now();
    const progress = { value: 0 };
    let finished = false;
    let leaving = false;
    let disposed = false;
    let messageIndex = 0;
    let messageTimer: number | undefined;

    const split = reduced ? null : splitText(heading, { words: { wrap: "clip" } });

    const render = () => {
      const value = progress.value;
      if (barRef.current) barRef.current.style.transform = `scaleX(${value})`;
      if (percentRef.current) percentRef.current.textContent = String(Math.round(value * 100));
      // The headline gets dragged along as the bar fills, like a rubber band being pulled.
      if (!reduced) heading.style.transform = `translateX(${value * -1.2}%) skewX(${value * -7}deg)`;
    };

    const showMessage = (text: string) => {
      if (reduced) {
        message.textContent = text;
        return;
      }
      animate(message, {
        translateY: [0, "-110%"],
        opacity: [1, 0],
        duration: 120,
        ease: "inQuad",
        onComplete: () => {
          message.textContent = text;
          animate(message, { translateY: ["110%", 0], opacity: [0, 1], duration: 220, ease: ease.paper });
        },
      });
    };

    if (returning) message.textContent = returningMessage;
    else if (!reduced) {
      messageTimer = window.setInterval(() => {
        if (messageIndex >= messages.length - 1) return window.clearInterval(messageTimer);
        showMessage(messages[++messageIndex]);
      }, MESSAGE_MS);
    }

    if (!reduced) {
      // The heading is hidden by CSS until it has been split, so it never flashes unsplit.
      heading.style.opacity = "1";
      createTimeline()
        .add(split!.words, {
          translateY: ["110%", "0%"],
          rotate: [() => (Math.random() - 0.5) * 6, 0],
          duration: 800,
          delay: stagger(55),
          ease: ease.ink,
        })
        .add(punchRef.current!, { opacity: [0, 1], rotate: [-3, 0], translateY: [8, 0], duration: 500, ease: "outBack(2)" }, "+=120");
    }

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearInterval(messageTimer);
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {}
      split?.revert();
      html.dataset.intro = "done";
    };

    const exit = (quick: boolean) => {
      if (leaving) return;
      leaving = true;
      window.clearInterval(messageTimer);
      animate(progress, { value: progress.value, duration: 0 }); // stops any running fill

      if (quick || reduced) {
        animate(root, { opacity: 0, duration: reduced ? 0 : 280, ease: "outQuad", onComplete: finish });
        return;
      }

      showMessage("Well, that was dramatic.");
      createTimeline({ onComplete: finish })
        // Let go of the rubber band.
        .add(heading, { translateX: "0%", skewX: 0, duration: 700, ease: springs.sticker() })
        .add(contentRef.current!, { translateY: [0, "-8%"], opacity: [1, 0], duration: 420, ease: "inQuad" }, "+=280")
        .add(topRef.current!, { translateY: [0, "-100%"], duration: 850, ease: "inOutExpo" }, "-=120")
        .add(bottomRef.current!, { translateY: [0, "100%"], duration: 850, ease: "inOutExpo" }, "<<");
    };
    skipRef.current = () => exit(true);

    const tasks = [document.fonts.ready, heroImageReady(), windowLoaded()];
    let completed = 0;
    tasks.forEach((task) =>
      withTimeout(task).then(() => {
        if (leaving || disposed) return;
        completed += 1;
        animate(progress, { value: completed / tasks.length, duration: 500, ease: "outQuad", onUpdate: render });
      }),
    );

    Promise.all(tasks.map(withTimeout)).then(() => {
      const minimum = reduced ? 300 : returning ? MIN_DURATION_RETURNING : MIN_DURATION;
      const wait = Math.max(0, minimum - (performance.now() - started));
      window.setTimeout(() => {
        if (leaving || disposed) return;
        animate(progress, {
          value: 1,
          duration: 250,
          ease: "outQuad",
          onUpdate: render,
          onComplete: () => exit(false),
        });
      }, wait);
    });

    const onKey = (event: KeyboardEvent) => event.key === "Escape" && exit(true);
    window.addEventListener("keydown", onKey);

    return () => {
      disposed = true;
      window.clearInterval(messageTimer);
      window.removeEventListener("keydown", onKey);
      split?.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.intro} aria-label="Loading the portfolio">
      <div ref={topRef} className={styles.top} />
      <div ref={bottomRef} className={styles.bottom} />

      <div ref={contentRef} className={`${styles.content} shell`}>
        <p className="annot text-muted">Portfolio / Krutarth Chauhan</p>
        <p
          ref={headingRef}
          className={`${styles.heading} mt-6 max-w-[14ch] font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.9] uppercase`}
        >
          Preparing something incredibly important.
        </p>
        <p ref={punchRef} className={`${styles.punch} punchline mt-4 text-muted`}>
          It&apos;s a portfolio. Relax.
        </p>

        <div className="mt-10 flex items-end justify-between gap-6 font-mono text-xs uppercase sm:text-sm">
          <p role="status" className="min-h-[2.5em] max-w-[34ch] overflow-hidden">
            <span ref={messageRef} className="inline-block">
              {messages[0]}
            </span>
          </p>
          <p className="tabular-nums" aria-hidden="true">
            <span ref={percentRef}>0</span>%
          </p>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden bg-ink/10">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-ink" />
        </div>
      </div>

      <button type="button" onClick={() => skipRef.current()} className={`${styles.skip} annot`}>
        Skip intro →
      </button>
    </div>
  );
}

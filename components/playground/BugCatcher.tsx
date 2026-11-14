"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { animate, createTimeline, steps, utils } from "animejs";
import { ease, prefersReducedMotion } from "@/lib/anime";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { createGame, type Game } from "./bugGame";

type Phase = "idle" | "playing" | "paused" | "over";

function verdict(score: number) {
  if (score >= 25) return "Suspiciously good. Are you a QA team?";
  if (score >= 15) return "Solid. The backlog fears you.";
  if (score >= 5)
    return "Respectable. Some bugs made it to production, as is tradition.";
  return "The bugs won. They usually do.";
}

export default function BugCatcher() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(null);
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLSpanElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const goRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const game = createGame(canvas, {
      slow: reduced,
      onScore: setScore,
      onEnd: () => setPhase("over"),
    });
    gameRef.current = game;

    // Pause when the tab is hidden or the game scrolls away.
    const pause = () => {
      if (game.pause()) setPhase("paused");
    };
    const onVisibility = () => document.hidden && pause();
    const observer = new IntersectionObserver(
      ([entry]) => !entry.isIntersecting && pause(),
      { threshold: 0.2 },
    );
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      game.destroy();
    };
  }, [reduced]);

  // Game-state transitions. The canvas game itself is untouched; this is all the chrome around it.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (phase === "playing") return;
    const panel = panelRef.current;
    if (!panel) return;
    if (phase === "paused") {
      animate(panel, { opacity: [0, 1], translateY: [-16, 0], duration: 240, ease: steps(4) });
      return;
    }
    const intro = animate(panel, { opacity: [0, 1], translateY: [12, 0], duration: 360, ease: ease.paper });
    if (phase !== "over" || !finalRef.current) return;
    // The final score counts up like an arcade tally, then the verdict follows.
    const tally = { value: 0 };
    const final = finalRef.current;
    const verdicts = panel.querySelectorAll("[data-verdict]");
    final.textContent = "0";
    utils.set(verdicts, { opacity: 0 });
    const count = createTimeline({ delay: 200 })
      .add(tally, {
        value: score,
        duration: Math.min(1200, 150 + score * 60),
        ease: "outQuad",
        onUpdate: () => (final.textContent = String(Math.round(tally.value))),
      })
      .add(final, { scale: [1.25, 1], duration: 300, ease: "outBack(2)" })
      .add(verdicts, { opacity: [0, 1], translateY: [8, 0], duration: 400, ease: ease.paper }, "-=150");
    return () => {
      intro.pause();
      count.pause();
    };
    // Score is final by the time phase is "over"; re-running on score changes isn't wanted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Every catch: the score jumps in chunky arcade steps.
  useEffect(() => {
    if (score === 0 || !scoreRef.current || prefersReducedMotion()) return;
    animate(scoreRef.current, { scale: [1.7, 1], duration: 260, ease: steps(3) });
  }, [score]);

  const start = () => {
    if (goRef.current && !prefersReducedMotion()) {
      animate(goRef.current, { opacity: [0, 1, 1, 0], scale: [0.6, 1.1, 1.1, 1.3], duration: 700, ease: "outQuad" });
    }
    setScore(0);
    setPhase("playing");
    gameRef.current?.start();
    canvasRef.current?.focus();
  };
  const togglePause = () => {
    const game = gameRef.current;
    if (!game) return;
    if (phase === "playing" && game.pause()) setPhase("paused");
    else if (phase === "paused") {
      game.resume();
      setPhase("playing");
      canvasRef.current?.focus();
    }
  };

  return (
    <div>
      <div className="relative overflow-hidden border-2 border-ink bg-paper">
        <canvas
          ref={canvasRef}
          tabIndex={0}
          aria-label="Catch the bugs game. Click or tap bugs to catch them. With a keyboard, use arrow keys to aim, space to catch, and P to pause."
          onKeyDown={(event) => {
            if (event.key === "p" || event.key === "P") togglePause();
          }}
          className="block h-[22rem] w-full touch-none sm:h-[26rem]"
        />

        {phase !== "playing" && (
          <div className="absolute inset-0 grid place-items-center bg-paper/85 p-6 text-center backdrop-blur-[2px]">
            <div ref={panelRef} className="max-w-md">
              {phase === "idle" && (
                <>
                  <p className="font-display text-5xl uppercase sm:text-6xl">
                    Catch the bugs
                  </p>
                  <p className="mt-3 text-muted">
                    Ten seconds. Click or tap the bugs. Keyboard: arrows to aim,
                    space to catch.
                  </p>
                </>
              )}
              {phase === "paused" && (
                <p className="font-display text-5xl uppercase">Paused</p>
              )}
              {phase === "over" && (
                <div aria-live="polite">
                  <p className="annot text-muted">Final score</p>
                  <p className="font-display text-7xl">
                    <span ref={finalRef} className="inline-block" aria-hidden="true">
                      {score}
                    </span>
                    <span className="sr-only">{score}</span>
                  </p>
                  <p className="mt-2 font-serif text-2xl italic" data-verdict>
                    Congratulations. You&apos;re now qualified for production
                    support.
                  </p>
                  <p className="mt-2 text-muted" data-verdict>
                    {verdict(score)}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={phase === "paused" ? togglePause : start}
                className="btn btn-primary mt-6"
              >
                {phase === "paused" ? (
                  <Play size={16} aria-hidden="true" />
                ) : (
                  <RotateCcw size={16} aria-hidden="true" />
                )}
                {phase === "idle"
                  ? "Start"
                  : phase === "paused"
                    ? "Resume"
                    : "Play again"}
              </button>
            </div>
          </div>
        )}
        <p
          ref={goRef}
          className="pointer-events-none absolute inset-0 grid place-items-center font-display text-7xl text-blue uppercase opacity-0"
          aria-hidden="true"
        >
          Go!
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="annot text-muted" aria-live="off">
          Score:{" "}
          <span ref={scoreRef} className="inline-block text-ink">
            {score}
          </span>
        </p>
        <button
          type="button"
          onClick={togglePause}
          disabled={phase !== "playing" && phase !== "paused"}
          className="btn btn-ghost min-h-10 px-4 disabled:opacity-40"
        >
          {phase === "paused" ? (
            <Play size={14} aria-hidden="true" />
          ) : (
            <Pause size={14} aria-hidden="true" />
          )}
          {phase === "paused" ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
}

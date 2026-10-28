"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
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

  const start = () => {
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
            <div className="max-w-md">
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
                  <p className="font-display text-7xl">{score}</p>
                  <p className="mt-2 font-serif text-2xl italic">
                    Congratulations. You&apos;re now qualified for production
                    support.
                  </p>
                  <p className="mt-2 text-muted">{verdict(score)}</p>
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
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="annot text-muted" aria-live="off">
          Score: <span className="text-ink">{score}</span>
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

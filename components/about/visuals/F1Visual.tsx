"use client";

import { useCallback, useRef } from "react";
import { animate, cubicBezier, svg, utils } from "animejs";
import { useCardPlay } from "@/hooks/useCardPlay";
import styles from "../Cards.module.css";

const TRACK = "M10 60 C40 10 70 70 100 40 S160 10 190 50";
const TOP_SPEED = 327;
// Same curve as the CSS racing line, so the car leads the line it's drawing.
const launch = cubicBezier(0.7, 0, 0.3, 1);

export default function F1Visual() {
  const trackRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);

  const play = useCallback(() => {
    const car = carRef.current!;
    const readout = speedRef.current!;
    const telemetry = { kmh: 0 };

    const lap = animate(car, {
      ...svg.createMotionPath(trackRef.current!),
      opacity: { from: 0, to: 1, duration: 80 },
      duration: 900,
      ease: launch,
    });
    // Speed peaks mid-straight and scrubs off into the last corner, like a real trace.
    const speed = animate(telemetry, {
      kmh: [0, TOP_SPEED, 284],
      duration: 900,
      ease: launch,
      onUpdate: () => (readout.textContent = utils.padStart(Math.round(telemetry.kmh), 3, "0")),
    });

    return () => {
      lap.revert();
      speed.pause();
      readout.textContent = "000";
    };
  }, []);
  useCardPlay(trackRef, play);

  return (
    <div className={`${styles.visual} bg-paper-deep`}>
      <svg viewBox="0 0 200 80" className={styles.track} aria-hidden="true">
        <path ref={trackRef} className={styles.trackBase} d={TRACK} />
        <path className={styles.racingLine} d={TRACK} pathLength="1" />
        <g ref={carRef} className={styles.car}>
          <rect x="-6" y="-3" width="12" height="6" rx="2" />
        </g>
      </svg>
      <p className={styles.telemetry} aria-hidden="true">
        <span ref={speedRef}>000</span> km/h
      </p>
      <div className={styles.gauge} aria-hidden="true">
        <span className={styles.needle} />
      </div>
    </div>
  );
}

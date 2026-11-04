"use client";

import { useId, useRef } from "react";
import { signature } from "@/data/signature";
import { useSignatureDraw } from "@/hooks/useSignatureDraw";
import styles from "./Footer.module.css";

export default function Signature() {
  const root = useRef<HTMLDivElement>(null);
  const maskId = `sig-${useId().replace(/[^\w-]/g, "")}`;
  useSignatureDraw(root);

  return (
    <div ref={root} className={styles.signature}>
      <svg
        data-signature
        viewBox={signature.viewBox}
        className={styles.signatureInk}
        role="img"
        aria-label="Krutarth's signature (stylised)"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {signature.strokes.map((d, i) => (
              <path
                key={i}
                data-stroke
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth={signature.reveal}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </mask>
        </defs>
        <g mask={`url(#${maskId})`} fill="currentColor">
          {signature.ink.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>
      <p data-credit className={styles.signatureNote}>
        ↑ Hand-drawn in SVG. My actual handwriting is worse.
      </p>
      <p data-credit className={styles.signatureFine}>
        Took 4 tries and a git revert.
      </p>
    </div>
  );
}

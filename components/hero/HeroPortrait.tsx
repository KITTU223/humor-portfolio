"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "@/lib/anime";
import { gsap, onHeroDone } from "@/lib/motion";
import styles from "./Hero.module.css";

// Each layer drifts by its data-depth as the cursor moves over the hero.
export default function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLSpanElement>(null);
  const [real, setReal] = useState(false);

  useEffect(() => {
    const root = ref.current;
    const section = root?.closest("section");
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!root || !section || !canHover.matches) return;

    // The entrance (HeroEntrance) animates these same layers with Anime.js, so the parallax only
    // takes over their transforms once it has finished.
    let layers: { depth: number; x: gsap.QuickToFunc; y: gsap.QuickToFunc }[] = [];
    const onMove = (event: PointerEvent) => {
      const dx = event.clientX / window.innerWidth - 0.5;
      const dy = event.clientY / window.innerHeight - 0.5;
      layers.forEach((layer) => {
        layer.x(dx * layer.depth);
        layer.y(dy * layer.depth);
      });
    };

    const stopWaiting = onHeroDone(() => {
      layers = gsap.utils.toArray<HTMLElement>("[data-depth]", root).map((el) => ({
        depth: Number(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
      }));
      section.addEventListener("pointermove", onMove);
    });

    return () => {
      stopWaiting();
      section.removeEventListener("pointermove", onMove);
    };
  }, []);

  // The real photo still wipes in with CSS (so it works everywhere); this adds the camera flash
  // going to the real one, and a little print-settle going back to the comic.
  const toggle = () => {
    const next = !real;
    setReal(next);
    if (prefersReducedMotion()) return;
    const img = ref.current?.querySelector<HTMLElement>(next ? "[data-photo-real]" : "[data-photo-comic]");
    if (next && flashRef.current) {
      animate(flashRef.current, { opacity: [0, 0.9, 0], duration: 420, ease: "outQuad" });
    }
    if (img) animate(img, { scale: [1.08, 1], duration: 900, ease: "outExpo" });
  };

  return (
    <div ref={ref} className={styles.portrait}>
      <div data-depth="-30" data-hero-part="sun" className={`${styles.sun} ${styles.enter}`} aria-hidden="true" />
      <div data-depth="-55" data-hero-part="block" className={`${styles.block} ${styles.enter}`} aria-hidden="true" />

      <figure
        data-depth="18"
        data-hero-portrait
        data-real={real}
        className={`${styles.photo} ${styles.enter}`}
      >
        <Image
          src="/images/photo-suit-comic.webp"
          alt="Halftone comic illustration of Krutarth Chauhan in a dark suit, hands in pockets"
          width={1020}
          height={1276}
          sizes="(min-width: 1024px) 34vw, 78vw"
          loading="eager"
          fetchPriority="high"
          data-photo-comic
          className="h-full w-full object-cover"
        />
        <Image
          src="/images/photo-suit.webp"
          alt={
            real
              ? "Krutarth Chauhan in a dark suit and sunglasses, hands in pockets"
              : ""
          }
          width={510}
          height={638}
          sizes="(min-width: 1024px) 34vw, 78vw"
          data-photo-real
          className={`${styles.realPhoto} h-full w-full object-cover`}
        />
        <span ref={flashRef} className={styles.flash} aria-hidden="true" />

        <span
          className={`${styles.tapeCorner} ${styles.tapeLeft}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.tapeCorner} ${styles.tapeRight}`}
          aria-hidden="true"
        />
      </figure>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={real}
        data-hero-label
        className={`${styles.toggle} ${styles.enter} tape`}
      >
        {real
          ? "Fine. This is the real one · Back to 2D"
          : "Illustrated for dramatic effect · See the real one"}
      </button>

      <p
        data-depth="40"
        data-hero-label
        className={`${styles.label} ${styles.labelHuman} ${styles.enter}`}
        data-boast="Certified genius. Allegedly."
      >
        Human developer. Allegedly.
      </p>
      <p
        data-depth="60"
        data-hero-label
        className={`${styles.label} ${styles.labelFuel} ${styles.enter}`}
        data-boast="Has never missed a deadline (lie)"
      >
        Runs on chai and questionable deadlines.
      </p>

      <svg
        data-depth="25"
        data-hero-part="badge"
        className={`${styles.badge} ${styles.enter}`}
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <defs>
          <path
            id="badge-circle"
            d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"
          />
        </defs>
        <circle cx="60" cy="60" r="58" />
        <text>
          <textPath href="#badge-circle">
            PROFESSIONALLY ✳ UNPROFESSIONAL ✳{" "}
          </textPath>
        </text>
        <text x="60" y="68" textAnchor="middle" className={styles.badgeStar}>
          ✳
        </text>
      </svg>
    </div>
  );
}

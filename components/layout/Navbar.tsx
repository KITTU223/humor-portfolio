"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/site";
import { scroller, scrollToHash } from "@/lib/motion";
import BrandMark from "./BrandMark";
import styles from "./Navbar.module.css";

export default function Navbar() {
  // Section anchors only exist on the home page; elsewhere (the 404) they need to go home first.
  const base = usePathname() === "/" ? "" : "/";
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const page = [
      document.getElementById("main"),
      document.querySelector("footer"),
    ];
    page.forEach((el) => el?.setAttribute("inert", ""));
    const toggle = toggleRef.current;
    scroller.lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    menuRef.current?.querySelector("a")?.focus();

    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      page.forEach((el) => el?.removeAttribute("inert"));
      document.documentElement.style.overflow = "";
      scroller.lenis?.start();
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const goTo = (event: React.MouseEvent, href: string) => {
    setOpen(false);
    if (base) return;
    event.preventDefault();
    // Let the menu's cleanup restart scrolling before we ask for a scroll.
    requestAnimationFrame(() => scrollToHash(href));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
          open
            ? "border-paper/10 bg-night text-paper"
            : "border-ink/10 bg-paper"
        }`}
      >
        <div className={styles.progress} aria-hidden="true" />
        <nav
          className="shell flex h-16 items-center justify-between"
          aria-label="Primary"
        >
          <a
            href={`${base}#top`}
            className={`${styles.brand} group flex items-center gap-3`}
            aria-label="Krutarth, back to top"
          >
            <BrandMark />
            <span className="leading-none">
              <span className="block font-display text-lg tracking-wide">
                KRUTARTH<sup className={styles.tm}>™</sup>
              </span>
              <span className={`${styles.tagline} font-serif text-sm italic`}>
                <span>Mostly functional.</span>
                <span aria-hidden="true">Hi. Still mostly functional.</span>
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="group relative">
                <a
                  href={base + link.href}
                  data-nav-link
                  className="annot inline-block py-3 transition-colors hover:text-blue"
                >
                  {link.label}
                </a>
                <span className={styles.quip} aria-hidden="true">
                  {link.quip}
                </span>
                <span className={styles.secret} aria-hidden="true">
                  ★ {link.secret}
                </span>
              </li>
            ))}
          </ul>

          <button
            ref={toggleRef}
            type="button"
            className={`btn min-h-11 px-5 lg:hidden ${open ? "border-paper text-paper" : "btn-ghost"}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.menu} lg:hidden`}
        data-open={open}
        aria-hidden={!open}
        inert={!open}
      >
        <ol className="shell flex flex-col gap-2 pt-24 pb-10">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              className={styles.item}
              style={{ "--i": index } as React.CSSProperties}
            >
              <a
                href={base + link.href}
                onClick={(event) => goTo(event, link.href)}
                className="group block py-2"
              >
                <span className="annot text-lime">0{index + 1}</span>
                <span className="block font-display text-[clamp(2.75rem,13vw,5rem)] leading-[0.95] uppercase group-hover:text-lime">
                  {link.label}
                </span>
                <span className="font-serif text-lg text-paper/60 italic">
                  {link.quip}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

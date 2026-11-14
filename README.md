# krutarthchauhan.co.in

Portfolio of Krutarth Chauhan — "Professionally unprofessional."

Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

## Where things live

- `data/` — all content: projects, journey, skills, site links, the "useless AI" replies.
- `components/sections/` — one file per page section, composed in `app/page.tsx`.
- `components/{hero,about,projects,playground,contact}/` — pieces used by a single section.
- `components/layout/` — intro loader, nav, footer, smooth scroll, Easter eggs.
- `lib/reveals.ts` — scroll reveals. Opt in with `data-reveal="fade|joke|mask|lines"`, `data-count`, `data-progress`.

## Motion notes

- The intro runs once per session (a shorter cut for people who've visited before). `<html data-intro>`
  and `<html data-hero>` are set by an inline script in `app/layout.tsx` before paint, each with a
  safety timeout. The hero entrance is an Anime.js timeline that starts when the intro hands over.
- Two animation libraries, one rule: they never both write `transform` on the same element.
  GSAP owns Lenis sync, `data-reveal` scroll reveals, magnetic buttons, hero parallax and the
  signature. Anime.js (`lib/anime.ts`, `hooks/useAnimeScope.ts`) owns the intro, hero entrance,
  card tricks, case-study set pieces, the stack terminal and the nonsense. Anime reveals opt in
  with `data-enter` (hidden until `data-entered`) and `data-marker` (highlighter sweep).
- Lenis is driven by GSAP's ticker so it stays in sync with ScrollTrigger. Both are skipped entirely
  for `prefers-reduced-motion`, and nothing is hidden in that mode.
- CSS modules are excluded from the Tailwind Turbopack loader in `next.config.ts`; they don't use
  Tailwind directives and need Next's own `.module.css` handling.

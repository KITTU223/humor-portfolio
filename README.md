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

- The intro runs once per session. `<html data-intro>` is set by an inline script in `app/layout.tsx`
  before paint; the hero's entrance is pure CSS keyed off that attribute.
- Lenis is driven by GSAP's ticker so it stays in sync with ScrollTrigger. Both are skipped entirely
  for `prefers-reduced-motion`, and nothing is hidden in that mode.
- CSS modules are excluded from the Tailwind Turbopack loader in `next.config.ts`; they don't use
  Tailwind directives and need Next's own `.module.css` handling.

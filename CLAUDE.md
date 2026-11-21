@AGENTS.md

# Design rules

Read `docs/design.md` before changing anything visual. In short:

- The page is a LaTeX paper on a blackboard: Computer Modern for print, Kalam for handwriting, chalk colours from the tokens in `app/globals.css`.
- Every block is a `Tx` with its rendered form and its LaTeX source (the `.tex` switch shows the source).
- The published page runs no React. Components are server-only (no `"use client"`); all interactivity lives in `client/main.ts`, bundled to `public/site.js`. Motion is opted into with data attributes, and every animation must do nothing under `prefers-reduced-motion`.
- Follow the performance rules in `docs/design.md`: no SVG filters or backdrop blur, no layout reads inside scroll frames, responsive image sizes.
- Content lives in `lib/data.ts` and follows the résumé. Do not invent facts.
- Do not use class names that are also Tailwind utilities (`table`, `grid`, ...).

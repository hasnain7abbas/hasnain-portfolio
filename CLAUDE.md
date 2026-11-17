@AGENTS.md

# Design rules

Read `docs/design.md` before changing anything visual. In short:

- The page is a LaTeX paper on a blackboard: Computer Modern for print, Kalam for handwriting, chalk colours from the tokens in `app/globals.css`.
- Every block is a `Tx` with its rendered form and its LaTeX source (the `.tex` switch shows the source).
- All motion lives in `components/Motion.tsx` and is opted into with data attributes. Every animation must do nothing under `prefers-reduced-motion`.
- Content lives in `lib/data.ts` and follows the résumé. Do not invent facts.
- Do not use class names that are also Tailwind utilities (`table`, `grid`, ...).

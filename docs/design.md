# Design notes

## Direction: a paper on a blackboard

The page is a short paper about Hasnain, typeset as LaTeX would set it and
written up on a blackboard. It should read as the work of a physicist with a
software engineer's habits: equations, numbered figures, an algorithm, a
booktabs table, a bibliography, and the source of every block one click away.

- **Typeset:** Computer Modern (CMU Serif, CMU Typewriter) for everything printed.
- **Handwritten:** the name, section titles and margin notes in Kalam, roughened
  with a chalk filter, as if the author annotated the page.
- **Lively, not flashy:** the chalk is driven by the reader's scroll. Important
  phrases get underlined, double-underlined, boxed or circled, and the margin
  notes and section titles are written, as you scroll past them, the way a
  lecturer writes while you follow. Chalk never erases: scrolling back up keeps
  what is written. A little dust falls from the chalk tip while it moves, and an
  optional chalk sound (off by default, the "chalk" switch in the top bar)
  scratches in proportion to how fast it writes. Figure 1 is a memristor loop
  the reader can drag, and the `.tex` switch turns the page into its source.

## Tokens (`app/globals.css`)

| Token | Value | Role |
|---|---|---|
| `--board` | `#121514` | Background |
| `--ink` | `#e7e4db` | Text (chalk white) |
| `--ink-soft` / `--ink-dim` | `#b4b8b2` / `#858b86` | Secondary text, captions, labels |
| `--chalk-yellow` | `#f0d27c` | Notes, the Figure 1 tracer |
| `--chalk-pink` | `#ee9fae` | Notes, circles |
| `--chalk-blue` | `#93c6e6` | Links (the hyperref colour), notes |
| `--chalk-green` | `#a8d59c` | Notes |

Layout: a 42rem text column with a 15rem margin for notes on wide screens
(1100px and up); on narrow screens notes follow their paragraph with a chalk
rule. Text is justified and hyphenated from 640px up, ragged right below.

## Structure

Title page (name, affiliation, abstract, equation (1), Figure 1), contents,
1 Research (with Algorithm 1), 2 Teaching and the photographs (Figures 2 and 3),
3 Software (Table 1, Listing 1), 4 Curriculum vitae, Appendix A Notes,
acknowledgements, references (contact), ∎.

## How it is built and served

Next.js is used only to generate static HTML. The published page runs no React:
`scripts/strip-next-runtime.mjs` removes Next's client runtime and the hydration
copy of the page after `next build`. The only script is `public/site.js`, about
5 KB compressed, bundled by `scripts/build-client.mjs` from `client/main.ts`.

`npm run build` does all three steps; `npm run dev` builds `site.js` once and
starts Next (run `npm run client` again after editing `client/main.ts`).

## How the pieces work

- `components/Paper.tsx`: `Tx` (a block with its rendered form and its LaTeX
  source), `Row` (text column plus margin), `Note` (handwritten margin note with
  a chalk arrow), `SectionHead`, `Caption`.
- `lib/tex.tsx`: KaTeX rendered at build time (`M`), and the LaTeX highlighter
  for the source view.
- `components/TopBar.tsx`: running head, the chalk-sound switch and the page /
  `.tex` switch (key `S`). Their state is `data-sound` and `data-view` on `<html>`.
- `components/LoopFigure.tsx` and `lib/loop.ts`: Figure 1, rendered at its
  starting point; the client script makes it sweep and lets the reader drag it.
- `lib/chalk.ts`: the chalk itself. `markPath` draws a hand-made underline,
  double underline, box or circle around line boxes (seeded, so a mark keeps its
  wobble), `Dust` is the falling dust on a fixed canvas, and `ChalkSound` makes
  the scratch from filtered noise with the Web Audio API (no audio files).
- `client/main.ts`: everything that moves. Scroll-driven handwriting
  (`data-write`) and marks (`data-mark="underline|double|box|circle"`,
  `data-tone`), dust, the sound, Figure 1, the two switches and videos
  (`data-autoplay`).
- CSS alone runs the title being written (`chalk-write`), the title-page entrance
  (`data-hero="1..7"`, staggered), Figure 1 drawing itself (`.is-drawn`) and the
  fade of figures and tables as they scroll in (`data-reveal`, scroll-driven, so
  browsers without `animation-timeline` simply show them).

With `prefers-reduced-motion: reduce` nothing animates: marks are drawn at once,
handwriting is simply there, there is no dust or sound, Figure 1 does not sweep
by itself, and videos get controls.

## Performance rules

Measured on a 4x slowed CPU and a 4G connection, median of three runs, against
the previous build: the name is on screen at 1.7 s instead of 5.0 s, scrolling
runs at 55 fps with 3% slow frames instead of 35 fps with 22%, and the page
transfers 0.84 MB instead of 1.5 MB. Keep it that way:

- No SVG filters (`feTurbulence`, `feDisplacementMap`) on anything visible: the
  browser recomputes them on every repaint. Textures are pre-rendered PNGs in
  `public/textures/` (the board dust and the chalk-grain mask).
- No `backdrop-filter`, no full-screen overlays with `mix-blend-mode`.
- No `text-wrap: pretty`; it made layout several times slower.
- The client script never reads layout inside a scroll frame. Positions are
  measured in `measure()` (on load, fonts, resize and after the title page
  lands) and frames only do arithmetic and writes. There is no animation loop
  while nothing moves.
- Elements that contain chalk marks must not move with transforms while they
  come in (the reveal is opacity-only), or the marks are measured in the wrong
  place.
- Photos have smaller copies (`name-<width>.webp`, listed as `widths` in
  `lib/data.ts`) and `sizes`, so each screen fetches what it shows. Videos are
  encoded at the 360 px they are shown at.
- Only CMU Serif regular is preloaded; other faces load when used.

## Rules for future edits

- Facts come from the résumé (`lib/data.ts`); do not invent numbers or duties.
- Every new block gets a `Tx` with honest LaTeX source.
- Handwriting is for the name, section titles and short notes only.
- Avoid class names that are also Tailwind utilities (`table`, `grid`, `hidden`,
  `block`...): Tailwind generates them and they override the page's styles.
- Asset paths are absolute under `/hasnain-portfolio/` (the GitHub Pages base path).
- Components must stay server components: no `"use client"`, because the
  runtime that would run them is stripped. Interactivity goes in `client/`.

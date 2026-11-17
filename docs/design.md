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

## How the pieces work

- `components/Paper.tsx`: `Tx` (a block with its rendered form and its LaTeX
  source), `Row` (text column plus margin), `Note` (handwritten margin note with
  a chalk arrow), `SectionHead`, `Caption`.
- `lib/tex.tsx`: KaTeX rendered at build time (`M`), and the LaTeX highlighter
  for the source view.
- `components/TopBar.tsx`: running head and the page / `.tex` switch (key `S`),
  which sets `data-view` on `<html>`.
- `components/LoopFigure.tsx`: Figure 1.
- `lib/chalk.ts`: the chalk itself. `markPath` draws a hand-made underline,
  double underline, box or circle around line boxes (seeded, so a mark keeps its
  wobble), `Dust` is the falling dust on a fixed canvas, and `ChalkSound` makes
  the scratch from filtered noise with the Web Audio API (no audio files).
- `components/Motion.tsx`: Lenis, scroll-driven handwriting (`data-write`) and
  marks (`data-mark="underline|double|box|circle"`, `data-tone`), figure strokes
  (`data-draw`), the title-page entrance (`data-hero`), reveals (`data-reveal`)
  and videos (`data-autoplay`).

With `prefers-reduced-motion: reduce` nothing animates: marks are drawn at once,
handwriting is simply there, there is no dust or sound, Figure 1 does not sweep
by itself, and videos get controls.

## Rules for future edits

- Facts come from the résumé (`lib/data.ts`); do not invent numbers or duties.
- Every new block gets a `Tx` with honest LaTeX source.
- Handwriting is for the name, section titles and short notes only.
- Avoid class names that are also Tailwind utilities (`table`, `grid`, `hidden`,
  `block`...): Tailwind generates them and they override the page's styles.
- Asset paths are absolute under `/hasnain-portfolio/` (the GitHub Pages base path).

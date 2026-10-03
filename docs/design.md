# Design notes

One page, one direction. This file records the decisions so later edits stay
consistent with them.

## Direction: field notebook

Natural and academic. The page reads like a well-set lab notebook: warm paper,
pine-green ink, serif text, monospaced labels for dates and captions, hairline
rules instead of cards. Content comes from the résumé and is treated as a CV,
not as marketing.

**Signature move:** the Paperwren wren leaves the logo and roams the page,
perching on headings, rules, buttons and photo frames, and turning pale over
the dark sections.

## Reference and what was taken from it

[Paperwren](https://razee4315.github.io/Paperwren/) (Astro, Manrope +
JetBrains Mono, warm grey paper `#d8d4c9`, pine text `#182d2a`).

| Taken | How it is used here |
|---|---|
| The roaming wren (art and flight code, MIT) | Ported to `lib/wren.ts` and `components/Wren.tsx`; credited in the footer and `THIRD_PARTY_NOTICES.md` |
| Paper and pine palette | Same family, slightly warmer paper |
| JetBrains Mono for small labels | Kept for dates, captions and section numbers |
| Light plumage over dark sections | Teaching section and footer are marked `data-wren-zone="night"` |
| Calm, sparse copy | Short declarative lines, no slogans |

Not taken: Manrope (a serif suits an academic page better), the hanging file
icons, the theme switcher.

## Tokens (`app/globals.css`)

| Token | Value | Role |
|---|---|---|
| `--paper` | `#d9d3c4` | Page background (a mid-tone paper, deliberately not off-white) |
| `--paper-deep` | `#cdc6b4` | Alternate section background |
| `--ink` | `#132b27` | Text |
| `--ink-soft` | `#3c524c` | Secondary text |
| `--moss` | `#1f5750` | Accent: links on hover, institutions, the I–V curve |
| `--clay` | `#a8472a` | Focus ring and the curve tracer only |
| `--night` | `#0f211e` | Teaching section and footer |

- Type: Newsreader (display and text, optical sizing on) and JetBrains Mono (labels).
- Scale: body 18px, section headings up to 3.6rem, the name up to 8.5rem. The name is the only oversized element.
- Headings are plain descriptive titles in roman, the way a paper or CV would set them. No slogans, no two-tone italic taglines.
- Copy is written as a physicist would write it: say what was made, measured or simulated, and with what.
- Text that sits in a reveal mask needs padding inside the mask so capitals and italics are not clipped (`.hero-title .line`, `.split-line-mask`).
- Grid: 12 columns, 24px gutter, 1360px max width.
- Corners: 2px. Borders: hairline rules only, no boxed cards, no shadows.
- Texture: paper grain at 5% opacity.
- Easing: `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`) for everything.
- One mode. There is no dark theme toggle.

## Sections

1. Hero: name, one-line statement, résumé and email buttons, Fig. 1 (schematic pinched I–V loop).
2. Research profile: profile text, portrait, research interests.
3. Thesis pipeline: Material → Thin film → Device → Network. Pinned and scrubbed sideways on wide screens.
4. Teaching: Fall 2026 teaching-assistant work with lab photos and two clips, then earlier teaching.
5. Curriculum vitae: education, research experience, methods, conferences, awards.
6. Software: project list.
7. Writing: four posts as native `<details>`.
8. Contact and colophon.

## Motion (`components/Motion.tsx`)

GSAP + ScrollTrigger + SplitText, Lenis for smooth scroll on pointer devices.
Sections opt in through data attributes.

| Attribute | Effect |
|---|---|
| `data-hero` | Load sequence: name rises out of a mask, figure draws, copy follows |
| `data-split` | Masked line reveal on headings |
| `data-reveal` | Rise and fade on entry, batched and staggered |
| `data-parallax` | Scroll-linked drift inside a `.frame` |
| `data-pipeline-*` | Pinned, scrubbed stage track |
| `data-autoplay` | Videos play only while on screen |
| `data-perch` | A place the wren may land (`text`, `bottom`, or top edge) |

With `prefers-reduced-motion: reduce` nothing animates: content is shown
as-is, the pipeline becomes a plain list, the wren stays in the logo and the
videos get native controls.

## Rules for future edits

- No new colours. No gradients, shadows, pills or icon cards.
- Left-aligned. Dates and captions in mono, everything else in Newsreader.
- Facts come from the résumé; do not invent numbers or duties.
- Media go in `public/lab/` as WebP or H.264 MP4 without audio, and are
  listed in `lib/data.ts` with real alt text and a date.
- Asset paths are absolute under `/hasnain-portfolio/` (the GitHub Pages base path).

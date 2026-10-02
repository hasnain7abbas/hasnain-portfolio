@AGENTS.md

# Design rules

Read `docs/design.md` before changing anything visual. In short:

- Palette, type and easing are tokens in `app/globals.css`. Do not add colours.
- Newsreader for text, JetBrains Mono for labels. No other faces.
- Hairline rules, 2px corners. No gradients, shadows, pills, icon cards or dark-mode toggle.
- All motion lives in `components/Motion.tsx` and is opted into with data attributes. Every animation must do nothing under `prefers-reduced-motion`.
- Content lives in `lib/data.ts` and follows the résumé. Do not invent facts.
- The wren is adapted from Paperwren under the MIT License. Keep the credit in the footer and `THIRD_PARTY_NOTICES.md`.

# Hasnain Abbas — portfolio

The personal site of Hasnain Abbas, experimental physicist working on memristive
and synaptic devices for neuromorphic computing.

Live at <https://hasnain7abbas.github.io/hasnain-portfolio/>.

## Develop

```bash
npm install
npm run dev
```

Then open <http://localhost:3000/hasnain-portfolio/>.

`npm run build` writes a static export to `out/`. Pushing to `master` deploys
it to GitHub Pages through `.github/workflows/deploy.yml`.

## Where things live

- `lib/data.ts`: all content (profile, teaching, CV, projects, posts)
- `components/`: the title page, the sections, `Paper.tsx` (blocks, margin notes),
  `LoopFigure.tsx` (Figure 1), `TopBar.tsx` (the page / `.tex` switch) and
  `Motion.tsx` (all animation)
- `public/lab/`: teaching-lab photos and clips
- `public/Hasnain-Abbas-Resume.pdf`: the résumé the site links to
- `docs/design.md`: design decisions and rules for future edits

## Credits

Set in Computer Modern (CMU Serif and CMU Typewriter, SIL Open Font License,
see `app/fonts/CMU-OFL.txt`) and Kalam. Maths by KaTeX, motion by GSAP and
Lenis, built with Next.js. The chalk marks, dust and sound are in `lib/chalk.ts`.

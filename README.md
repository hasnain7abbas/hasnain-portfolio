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

`npm run build` bundles the page script (`client/main.ts` to `public/site.js`),
writes a static export to `out/`, and strips Next's client runtime from it, so the
published page is HTML, CSS and one 5 KB script. After editing `client/main.ts`
during development, run `npm run client`. Pushing to `master` deploys to GitHub
Pages through `.github/workflows/deploy.yml`.

## Where things live

- `lib/data.ts`: all content (profile, teaching, CV, projects, posts)
- `components/`: the title page, the sections, `Paper.tsx` (blocks, margin notes),
  `LoopFigure.tsx` (Figure 1) and `TopBar.tsx` (the switches), all rendered to static HTML
- `client/main.ts`: everything that moves (chalk, dust, sound, Figure 1, switches, videos)
- `public/textures/`: the pre-rendered board dust and chalk grain
- `public/lab/`: teaching-lab photos and clips
- `public/Hasnain-Abbas-Resume.pdf`: the résumé the site links to
- `docs/design.md`: design decisions and rules for future edits

## Credits

Set in Computer Modern (CMU Serif and CMU Typewriter, SIL Open Font License,
see `public/fonts/CMU-OFL.txt`) and Kalam. Maths by KaTeX, built with Next.js
as a static site generator. The chalk marks, dust and sound are in
`lib/chalk.ts`; everything that moves is in `client/main.ts`.

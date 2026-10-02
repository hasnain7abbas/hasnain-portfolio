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
- `components/`: one file per section, plus `Motion.tsx` (all animation) and `Wren.tsx`
- `public/lab/`: teaching-lab photos and clips
- `public/Hasnain-Abbas-Resume.pdf`: the résumé the site links to
- `docs/design.md`: design decisions and rules for future edits

## Credits

The wren that flies through the page is the mascot of
[Paperwren](https://github.com/Razee4315/Paperwren), an open-source document
viewer by [Razee4315](https://github.com/Razee4315). Its artwork and flight
code are adapted here under the MIT License; see
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Built with Next.js, GSAP and Lenis. Set in Newsreader and JetBrains Mono.

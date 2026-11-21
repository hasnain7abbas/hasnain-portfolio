// Bundles the page's only script (client/main.ts) into public/site.js.
// Run before `next dev` and `next build`; Next copies public/ into the export.
import { build } from "esbuild";

await build({
  entryPoints: ["client/main.ts"],
  outfile: "public/site.js",
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2020"],
  legalComments: "none",
  logLevel: "info",
});

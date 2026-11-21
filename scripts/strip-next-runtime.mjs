// After `next build`: Next is used here only to generate static HTML. The page
// has no React components that run in the browser, so this removes Next's
// client runtime, the duplicate copy of the page it inlines for hydration, and
// the files only that runtime reads. What remains is HTML, CSS, fonts, images
// and public/site.js.
import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
let before = 0, after = 0;

for (const name of readdirSync(OUT)) {
  const file = join(OUT, name);
  if (name.endsWith(".txt") || name === "_not-found" || name === "_not-found.html") {
    rmSync(file, { recursive: true, force: true });
    continue;
  }
  if (!name.endsWith(".html") || !statSync(file).isFile()) continue;
  const html = readFileSync(file, "utf8");
  before += html.length;
  const stripped = html
    // Next's runtime chunks.
    .replace(/<script\b[^>]*\bsrc="[^"]*\/_next\/static\/[^"]*"[^>]*>\s*<\/script>/g, "")
    .replace(/<link\b[^>]*\brel="preload"[^>]*\bas="script"[^>]*\/?>/g, "")
    // Inline hydration data and bootstrapping; our own scripts carry data-keep.
    .replace(/<script\b(?![^>]*\bdata-keep\b)(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/g, "");
  after += stripped.length;
  if (/__next_f|_next\/static\/chunks\/[^"]+\.js/.test(stripped)) throw new Error(`Next runtime left in ${name}`);
  writeFileSync(file, stripped);
}

// The JS chunks themselves are no longer referenced.
const chunks = join(OUT, "_next", "static", "chunks");
for (const name of readdirSync(chunks)) if (name.endsWith(".js")) rmSync(join(chunks, name));

console.log(`strip-next-runtime: HTML ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB, runtime removed`);

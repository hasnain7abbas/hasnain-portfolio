import katex from "katex";
import type { ReactNode } from "react";

/** Typesets TeX with KaTeX at build time, so the page ships plain HTML. */
export function M({ children, display = false }: { children: string; display?: boolean }) {
  const html = katex.renderToString(children, {
    displayMode: display,
    throwOnError: true,
    output: "html",
    trust: (ctx) => ctx.command === "\\href" || ctx.command === "\\htmlClass",
    strict: false,
  });
  return display ? (
    <div className="math-display" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span className="math-inline" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

/**
 * Colours LaTeX source the way an editor would: commands, braces, math and
 * comments. Used by the "view source" side of every block.
 */
export function highlightTex(src: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(%[^\n]*)|(\\[a-zA-Z@]+\*?|\\.)|(\$\$?[^$]*\$\$?)|([{}[\]])|(&)/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push(src.slice(last, m.index));
    const cls = m[1] ? "c" : m[2] ? "k" : m[3] ? "m" : m[4] ? "b" : "a";
    out.push(<span key={k++} className={`t-${cls}`}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push(src.slice(last));
  return out;
}

/** Escapes text for inclusion in generated LaTeX source. */
export const esc = (s: string) =>
  s
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([&%#_{}])/g, "\\$1")
    .replace(/₃/g, "$_3$")
    .replace(/–/g, "--")
    .replace(/—/g, "---");

import type { ReactNode } from "react";
import { highlightTex } from "@/lib/tex";

/*
 * The building blocks of the page as a typeset paper: every block carries its
 * own LaTeX source, shown in place of the rendering when the reader switches
 * to "source" in the top bar.
 */

/** A block with its rendered form and the LaTeX it would compile from. */
export function Tx({ src, children, className = "" }: { src: string; children: ReactNode; className?: string }) {
  return (
    <div className={`tx ${className}`}>
      <div className="tx-r">{children}</div>
      <pre className="tx-s">
        <code>{highlightTex(src.trim())}</code>
      </pre>
    </div>
  );
}

/** A main-column block with an optional handwritten note in the margin beside it. */
export function Row({
  children,
  note,
  wide = false,
  noteSide = false,
}: {
  children: ReactNode;
  note?: ReactNode;
  wide?: boolean;
  noteSide?: boolean;
}) {
  return (
    <div className={`row${wide ? " row--wide" : ""}${noteSide ? " row--note-side" : ""}`}>
      <div className="main">{children}</div>
      {note && <aside className="margin">{note}</aside>}
    </div>
  );
}

const ARROWS = {
  // Hand-drawn, pointing back towards the text column.
  left: "M88 14 C 66 6, 34 6, 10 24 M10 24 L 22 23 M10 24 L 15 13",
  down: "M30 6 C 22 22, 22 40, 34 58 M34 58 L 34 46 M34 58 L 24 51",
  up: "M34 58 C 22 42, 22 24, 30 6 M30 6 L 22 14 M30 6 L 37 15",
} as const;

/** A handwritten margin note, with a chalk arrow that draws itself in. */
export function Note({ children, arrow, tone = "yellow" }: { children: ReactNode; arrow?: keyof typeof ARROWS; tone?: "yellow" | "blue" | "pink" | "green" }) {
  return (
    <div className={`note note--${tone}`} data-write>
      {arrow && (
        <svg className={`note-arrow note-arrow--${arrow}`} viewBox={arrow === "left" ? "0 0 96 32" : "0 0 64 64"} aria-hidden="true">
          <path d={ARROWS[arrow]} pathLength={1} data-draw />
        </svg>
      )}
      <p>{children}</p>
    </div>
  );
}

/** A numbered section: the number set in Computer Modern, the title written by hand. */
export function SectionHead({ n, title, src }: { n: string; title: string; src: string }) {
  return (
    <Row>
      <Tx src={src} className="section-head">
        <h2>
          <span className="sec-n">{n}</span>
          <span className="hand sec-t" data-write>
            {title}
          </span>
        </h2>
      </Tx>
    </Row>
  );
}

/** A figure caption in the LaTeX style: "Figure 2:" in bold, then the text. */
export function Caption({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figcaption className="caption">
      <b>{label}:</b> {children}
    </figcaption>
  );
}

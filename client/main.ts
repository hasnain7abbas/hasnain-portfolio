/*
 * The only script the published page runs. No framework: the page is static
 * HTML, and this adds the chalk, Figure 1, the two top-bar switches and the
 * videos. Bundled by esbuild into public/site.js (scripts/build-client.mjs).
 *
 * Performance rules it keeps:
 * - Text positions are measured once (and again only on resize, font or image
 *   load), never inside a scroll frame. Scroll frames do arithmetic and writes.
 * - There is no animation loop while nothing moves: frames are requested only
 *   while chalk is being written, dust is in the air or the sound is audible.
 * - The title and the title page come in with CSS, so they start on first
 *   paint instead of waiting for this script.
 */

import { ChalkSound, Dust, markPath, type MarkKind, type Rect } from "../lib/chalk";
import { CY, TAU, T0, branch, fmt, loopPoint, loopState } from "../lib/loop";

const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const CHALK: Record<string, string> = { yellow: "#f0d27c", pink: "#ee9fae", blue: "#93c6e6", green: "#a8d59c" };
const SVG_NS = "http://www.w3.org/2000/svg";
const SOUND_KEY = "chalk-sound";
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const now = () => performance.now();

/* ── Dust, sound and the frame loop ─────────────────────────────────────── */

const dustCanvas = document.createElement("canvas");
dustCanvas.className = "chalk-dust";
dustCanvas.setAttribute("aria-hidden", "true");
dustCanvas.style.visibility = "hidden";
document.body.append(dustCanvas);
const dust = new Dust(dustCanvas);
const sound = new ChalkSound();

let frameQueued = false;
let lastFrame = 0;
const request = () => {
  if (frameQueued) return;
  frameQueued = true;
  requestAnimationFrame(frame);
};

/* ── Things the chalk writes: marks and handwriting ─────────────────────── */

type Timed = { start: number; dur: number };
type Item = {
  /** Where the element's top sits in the document, measured, not read per frame. */
  docTop: number;
  start: number;
  end: number;
  p: number;
  timed?: Timed;
  apply: (p: number, prev: number) => void;
};

const items: Item[] = [];
const viewH = () => window.innerHeight;

/* Marks: underline, double, box or circle. Each gets its own small SVG beside the text. */
const marksLayer = document.createElement("div");
marksLayer.className = "chalk-marks";
marksLayer.setAttribute("aria-hidden", "true");
document.body.append(marksLayer);

type Mark = Item & { el: HTMLElement; svg: SVGSVGElement; path: SVGPathElement; kind: MarkKind; seed: number; tone: string; len: number; ox: number; oy: number };
const marks: Mark[] = [...document.querySelectorAll<HTMLElement>("[data-mark]")].map((el, i) => {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "mark");
  const path = document.createElementNS(SVG_NS, "path");
  const tone = CHALK[el.dataset.tone ?? "yellow"] ?? CHALK.yellow;
  path.setAttribute("stroke", tone);
  path.setAttribute("stroke-width", el.dataset.mark === "underline" || el.dataset.mark === "double" ? "2.3" : "1.9");
  svg.append(path);
  marksLayer.append(svg);
  const m: Mark = {
    el, svg, path, tone, kind: (el.dataset.mark as MarkKind) || "underline", seed: i * 7919 + 17,
    len: 1, ox: 0, oy: 0, docTop: 0, start: 0.92, end: 0.7, p: reduce ? 1 : 0,
    apply: (p, prev) => {
      m.path.style.strokeDashoffset = String(m.len * (1 - p));
      const moved = (p - prev) * m.len;
      if (moved > 0.5 && p < 1) {
        const tip = m.path.getPointAtLength(p * m.len);
        dust.emit(tip.x + m.ox, tip.y + m.oy, moved / 7, m.tone);
        sound.scratch(moved);
      }
    },
  };
  return m;
});
items.push(...marks);

/* Handwriting (margin notes and section titles), with the note's arrow drawn first. */
type Writing = Item & { text: HTMLElement; arrows: SVGPathElement[]; tone: string; rect: Rect; arrowPts: { x: number; y: number }[] };
const writings: Writing[] = [...document.querySelectorAll<HTMLElement>("[data-write]:not(.title)")].map((el) => {
  const text = (el.querySelector("p") ?? el) as HTMLElement;
  const arrows = [...el.querySelectorAll<SVGPathElement>("[data-draw]")];
  const w: Writing = {
    text, arrows, tone: "", rect: { left: 0, top: 0, right: 0, bottom: 0 }, arrowPts: [],
    docTop: 0, start: 0.94, end: 0.74, p: reduce ? 1 : 0,
    apply: (p, prev) => {
      const hasArrow = arrows.length > 0;
      const ap = hasArrow ? Math.min(1, p / 0.3) : 1;
      const tp = hasArrow ? clamp01((p - 0.25) / 0.75) : p;
      const tpPrev = hasArrow ? clamp01((prev - 0.25) / 0.75) : prev;
      for (const a of arrows) a.style.strokeDashoffset = String(1 - ap);
      // Fully written: open the clip past the box so italic overhangs are never cut.
      text.style.clipPath = tp >= 1 ? "inset(-25% -8% -25% -8%)" : `inset(-25% ${((1 - tp) * 102).toFixed(2)}% -25% -3%)`;
      if (hasArrow && ap < 1 && w.arrowPts.length) {
        const q = w.arrowPts[Math.min(w.arrowPts.length - 1, Math.round(ap * (w.arrowPts.length - 1)))];
        dust.emit(q.x, q.y, 0.8, w.tone);
        sound.scratch(10);
      }
      if (tp > tpPrev && tp < 1) {
        const width = w.rect.right - w.rect.left;
        const moved = (tp - tpPrev) * width;
        dust.emit(w.rect.left + tp * width, w.rect.top + (w.rect.bottom - w.rect.top) * (0.25 + Math.random() * 0.6), moved / 9, w.tone);
        sound.scratch(moved);
      }
    },
  };
  return w;
});
items.push(...writings);

/* The title is written by a CSS animation from first paint; this only follows it with dust. */
const title = document.querySelector<HTMLElement>(".title");
let titleRect: Rect | null = null;
let titleP = 0;
const titleAnimation = () => title?.getAnimations().find((a) => (a as CSSAnimation).animationName === "chalk-write");

/* ── Measuring: all reads together, outside scroll frames ──────────────── */

function measure() {
  const sx = window.scrollX, sy = window.scrollY;
  const toDoc = (r: DOMRect): Rect => ({ left: r.left + sx, top: r.top + sy, right: r.right + sx, bottom: r.bottom + sy });

  // Reads first.
  const markLines = marks.map((m) => [...m.el.getClientRects()].filter((r) => r.width > 2).map(toDoc));
  const writingRects = writings.map((w) => toDoc(w.text.getBoundingClientRect()));
  const writingTops = writings.map((w) => w.text.closest("[data-write]")!.getBoundingClientRect().top + sy);
  const arrowPts = writings.map((w) => {
    const a = w.arrows[0];
    const ctm = a?.getScreenCTM();
    if (!a || !ctm) return [];
    const len = a.getTotalLength();
    return Array.from({ length: 13 }, (_, k) => {
      const q = a.getPointAtLength((k / 12) * len).matrixTransform(ctm);
      return { x: q.x + sx, y: q.y + sy };
    });
  });
  const tones = writings.map((w) => getComputedStyle(w.text).color);
  titleRect = title ? toDoc(title.getBoundingClientRect()) : null;

  // Then writes.
  marks.forEach((m, i) => {
    const lines = markLines[i];
    if (!lines.length) return;
    const pad = 16;
    const box = {
      left: Math.min(...lines.map((l) => l.left)) - pad,
      top: Math.min(...lines.map((l) => l.top)) - pad,
      right: Math.max(...lines.map((l) => l.right)) + pad,
      bottom: Math.max(...lines.map((l) => l.bottom)) + pad,
    };
    m.ox = box.left;
    m.oy = box.top;
    m.docTop = lines[0].top;
    const local = lines.map((l) => ({ left: l.left - box.left, top: l.top - box.top, right: l.right - box.left, bottom: l.bottom - box.top }));
    m.svg.style.transform = `translate(${box.left}px, ${box.top}px)`;
    m.svg.setAttribute("width", String(box.right - box.left));
    m.svg.setAttribute("height", String(box.bottom - box.top));
    m.path.setAttribute("d", markPath(m.kind, local, m.seed));
    m.len = m.path.getTotalLength() || 1;
    m.path.style.strokeDasharray = String(m.len);
    m.path.style.strokeDashoffset = String(m.len * (1 - m.p));
  });
  writings.forEach((w, i) => {
    w.rect = writingRects[i];
    w.docTop = writingTops[i];
    w.arrowPts = arrowPts[i];
    w.tone = tones[i];
  });
}

/* ── The frame: arithmetic from cached positions, then writes ───────────── */

function frame(t: number) {
  frameQueued = false;
  const dt = lastFrame ? Math.min(0.05, (t - lastFrame) / 1000) : 0.016;
  lastFrame = t;
  let busy = false;

  if (!reduce && root.dataset.view !== "source") {
    const sy = window.scrollY, vh = viewH();
    for (const it of items) {
      if (it.p >= 1) continue;
      let p: number;
      if (it.timed) {
        p = clamp01((t - it.timed.start) / it.timed.dur);
        busy = true;
      } else {
        const top = it.docTop - sy;
        p = clamp01((it.start * vh - top) / ((it.start - it.end) * vh));
      }
      // Chalk never erases: progress only moves forward.
      if (p > it.p) {
        const prev = it.p;
        it.p = p;
        it.apply(p, prev);
      }
    }

    // Dust behind the title's CSS writing.
    if (title && titleRect && titleP < 1) {
      const anim = titleAnimation();
      const timing = anim?.effect?.getComputedTiming();
      const p = timing && typeof timing.progress === "number" ? timing.progress : anim ? 0 : 1;
      if (p > titleP) {
        const width = titleRect.right - titleRect.left, moved = (p - titleP) * width;
        if (p < 1) dust.emit(titleRect.left + p * width, titleRect.top + (titleRect.bottom - titleRect.top) * (0.3 + Math.random() * 0.55), moved / 6, "#e7e4db");
        sound.scratch(moved);
        titleP = p;
      }
      if (titleP < 1) busy = true;
    }
  }

  if (dust.step(dt)) busy = true;
  if (sound.step(dt)) busy = true;

  if (busy) request();
  else {
    lastFrame = 0;
    sound.idle();
  }
}

/* Writing that is already on screen at load is written on a timer, after the title page arrives. */
function scheduleVisibleOnLoad() {
  if (reduce) return;
  const vh = viewH(), sy = window.scrollY;
  let k = 0;
  // After the title page has risen into place (its last part lands at about 1.65 s), so marks meet still text.
  const base = now() + 1700;
  const visible = items
    .filter((it) => it.docTop - sy < it.end * vh && it.p < 1)
    .sort((a, b) => a.docTop - b.docTop);
  for (const it of visible) it.timed = { start: base + k++ * 280, dur: 650 };
}

/* ── Wiring ─────────────────────────────────────────────────────────────── */

let measureQueued = 0;
const remeasure = () => {
  clearTimeout(measureQueued);
  measureQueued = window.setTimeout(() => {
    measure();
    request();
  }, 120);
};

measure();
scheduleVisibleOnLoad();
root.dataset.chalk = "ready";
request();
document.fonts?.ready.then(remeasure);
window.addEventListener("load", remeasure);
// The title page rises 10 px as it comes in; measure again once each part has landed.
document.addEventListener("animationend", (e) => {
  if ((e.target as Element).matches?.("[data-hero]")) remeasure();
});
new ResizeObserver(remeasure).observe(document.body);
window.addEventListener(
  "resize",
  () => {
    dust.resize();
    remeasure();
  },
  { passive: true },
);

const topbar = document.querySelector<HTMLElement>("[data-topbar]");
let scrolled = false;
window.addEventListener(
  "scroll",
  () => {
    const s = window.scrollY > 16;
    if (s !== scrolled && topbar) topbar.dataset.scrolled = String((scrolled = s));
    request();
  },
  { passive: true },
);

/* The page / .tex switch. */
const viewToggle = document.querySelector<HTMLButtonElement>("[data-view-toggle]");
const setView = (source: boolean) => {
  root.dataset.view = source ? "source" : "page";
  viewToggle?.setAttribute("aria-pressed", String(source));
  if (!source) remeasure();
};
viewToggle?.addEventListener("click", () => setView(root.dataset.view !== "source"));
window.addEventListener("keydown", (e) => {
  if (e.key !== "s" || e.metaKey || e.ctrlKey || e.altKey) return;
  if ((e.target as HTMLElement).closest("input, textarea, [contenteditable]")) return;
  setView(root.dataset.view !== "source");
});

/* The chalk sound: off unless the reader turned it on. Browsers start audio only from a gesture. */
const soundToggle = document.querySelector<HTMLButtonElement>("[data-sound-toggle]");
let wantSound = false;
try {
  wantSound = localStorage.getItem(SOUND_KEY) === "1";
} catch {}
const showSound = () => {
  root.dataset.sound = wantSound ? "on" : "off";
  soundToggle?.setAttribute("aria-pressed", String(wantSound));
  soundToggle?.setAttribute("title", wantSound ? "Turn the chalk sound off" : "Hear the chalk as it writes");
};
showSound();
soundToggle?.addEventListener("click", () => {
  wantSound = !wantSound;
  try {
    localStorage.setItem(SOUND_KEY, wantSound ? "1" : "0");
  } catch {}
  if (wantSound) sound.enable();
  else sound.disable();
  showSound();
});
const firstGesture = () => {
  if (wantSound) sound.enable();
};
window.addEventListener("pointerdown", firstGesture, { once: true, passive: true });
window.addEventListener("keydown", firstGesture, { once: true });
window.addEventListener("scroll", () => sound.wake(), { passive: true });

/* ── Figure 1 ───────────────────────────────────────────────────────────── */

const fig = document.querySelector<HTMLElement>("[data-loop]");
if (fig) {
  const plot = fig.querySelector<HTMLElement>("[data-loop-plot]")!;
  const dot = fig.querySelector<SVGCircleElement>("[data-dot]")!;
  const guide = fig.querySelector<SVGLineElement>("[data-guide]")!;
  const outV = fig.querySelector<HTMLElement>("[data-v]")!;
  const outI = fig.querySelector<HTMLElement>("[data-i]")!;
  const outG = fig.querySelector<HTMLElement>("[data-g]")!;
  const outB = fig.querySelector<HTMLElement>("[data-branch]")!;
  const slider = fig.querySelector<HTMLInputElement>("[data-sweep]")!;
  let t = T0, holding = false, idleUntil = 0, visible = false, running = false, last = 0;
  const shown = { v: "", i: "", g: "", b: "" };

  const render = () => {
    const { v, g, i } = loopState(t), p = loopPoint(t);
    dot.setAttribute("cx", p.x.toFixed(1));
    dot.setAttribute("cy", p.y.toFixed(1));
    guide.setAttribute("x1", p.x.toFixed(1));
    guide.setAttribute("x2", p.x.toFixed(1));
    guide.setAttribute("y1", String(CY));
    guide.setAttribute("y2", p.y.toFixed(1));
    // Text only changes when the shown digits do.
    const nv = fmt(v), ni = fmt(i), ng = g.toFixed(2), nb = branch(g);
    if (nv !== shown.v) outV.textContent = shown.v = nv;
    if (ni !== shown.i) outI.textContent = shown.i = ni;
    if (ng !== shown.g) outG.textContent = shown.g = ng;
    if (nb !== shown.b) outB.textContent = shown.b = nb;
    if (!holding) slider.value = String(t);
  };

  // It sweeps by itself only while on screen, untouched for a moment, and when motion is welcome.
  const sweep = (ts: number) => {
    const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0;
    last = ts;
    if (!visible || reduce) {
      running = false;
      last = 0;
      return;
    }
    if (!holding && ts > idleUntil) {
      t = (t + dt * (TAU / 11)) % TAU;
      render();
    }
    requestAnimationFrame(sweep);
  };
  const start = () => {
    if (running || reduce) return;
    running = true;
    requestAnimationFrame(sweep);
  };

  new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        fig.classList.add("is-drawn");
        start();
      }
    },
    { threshold: 0.25 },
  ).observe(fig);

  // Dragging sideways turns the sweep like a knob: one figure-of-eight per plot width.
  plot.addEventListener("pointerdown", (e) => {
    holding = true;
    plot.setPointerCapture(e.pointerId);
    let x0 = e.clientX;
    const width = plot.getBoundingClientRect().width;
    const move = (ev: PointerEvent) => {
      t = (((t + ((ev.clientX - x0) / width) * TAU) % TAU) + TAU) % TAU;
      x0 = ev.clientX;
      render();
    };
    const up = () => {
      holding = false;
      idleUntil = now() + 1800;
      plot.removeEventListener("pointermove", move);
      plot.removeEventListener("pointerup", up);
      plot.removeEventListener("pointercancel", up);
    };
    plot.addEventListener("pointermove", move);
    plot.addEventListener("pointerup", up);
    plot.addEventListener("pointercancel", up);
  });
  slider.addEventListener("input", () => {
    t = Number(slider.value);
    idleUntil = now() + 1800;
    render();
  });

}

/* ── Videos play only while on screen ───────────────────────────────────── */

const videos = [...document.querySelectorAll<HTMLVideoElement>("[data-autoplay]")];
if (reduce) videos.forEach((v) => (v.controls = true));
else {
  const watcher = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      }
    },
    { threshold: 0.35 },
  );
  videos.forEach((v) => watcher.observe(v));
}

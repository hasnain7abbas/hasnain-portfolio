/*
 * Chalk on the blackboard: hand-drawn marks (underlines, boxes, circles) as
 * SVG paths, a little dust that falls from the tip while something is being
 * written, and an optional scratching sound made in the browser.
 */

export type Pt = { x: number; y: number };
export type Rect = { left: number; top: number; right: number; bottom: number };

/** A small seeded random generator, so every mark keeps its own wobble between layouts. */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => n.toFixed(1);

/** One slightly bowed stroke from a to b, the way a hand pulls chalk across a board. */
function stroke(a: Pt, b: Pt, r: () => number, bow = 1.6) {
  const mx = (a.x + b.x) / 2 + (r() - 0.5) * bow, my = (a.y + b.y) / 2 + (r() - 0.5) * bow * 1.6;
  return `M${f(a.x)} ${f(a.y)} Q${f(mx)} ${f(my)} ${f(b.x)} ${f(b.y)}`;
}

export type MarkKind = "underline" | "double" | "box" | "circle";

/** The path of a mark around the given line boxes (document coordinates). */
export function markPath(kind: MarkKind, lines: Rect[], seed: number) {
  const r = seeded(seed);
  const j = (n: number) => (r() - 0.5) * n;
  if (!lines.length) return "";
  const box = {
    left: Math.min(...lines.map((l) => l.left)),
    top: Math.min(...lines.map((l) => l.top)),
    right: Math.max(...lines.map((l) => l.right)),
    bottom: Math.max(...lines.map((l) => l.bottom)),
  };

  if (kind === "underline" || kind === "double") {
    const out: string[] = [];
    for (const l of lines) {
      const y = l.bottom + 1.5;
      out.push(stroke({ x: l.left - 3 + j(2), y: y + j(1.5) }, { x: l.right + 3 + j(3), y: y + j(2) }, r));
      // A second, shorter pass: chalk never covers in one go.
      out.push(stroke({ x: l.left + 2 + j(3), y: y + 1.6 + j(1) }, { x: l.right - 6 + j(4), y: y + 1.2 + j(1.5) }, r, 1));
      if (kind === "double") out.push(stroke({ x: l.left + j(3), y: y + 5 + j(1.5) }, { x: l.right + 1 + j(3), y: y + 5.5 + j(2) }, r));
    }
    return out.join(" ");
  }

  if (kind === "box") {
    const p = 5, x0 = box.left - p, x1 = box.right + p, y0 = box.top - p + 1, y1 = box.bottom + p - 1;
    return [
      stroke({ x: x0 - 4, y: y0 + j(2) }, { x: x1 + 3, y: y0 + j(2) }, r),
      stroke({ x: x1 + j(2), y: y0 - 4 }, { x: x1 + j(2), y: y1 + 3 }, r),
      stroke({ x: x1 + 4, y: y1 + j(2) }, { x: x0 - 3, y: y1 + j(2) }, r),
      stroke({ x: x0 + j(2), y: y1 + 4 }, { x: x0 + j(2), y: y0 - 3 }, r),
    ].join(" ");
  }

  // Circle: an ellipse that overshoots where it started, as a quick circling always does.
  const cx = (box.left + box.right) / 2, cy = (box.top + box.bottom) / 2;
  const rx = (box.right - box.left) / 2 + 12, ry = (box.bottom - box.top) / 2 + 8;
  const a0 = -2.4 + j(0.4), turn = Math.PI * 2 + 0.45, n = 44;
  const k1 = r() * 6, k2 = r() * 6;
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = a0 + (turn * i) / n;
    const wob = 1 + 0.035 * Math.sin(t * 2 + k1) + 0.025 * Math.sin(t * 3 + k2) + (i / n) * 0.06;
    d += `${i ? "L" : "M"}${f(cx + Math.cos(t) * rx * wob)} ${f(cy + Math.sin(t) * ry * wob)} `;
  }
  return d.trim();
}

/* ── Dust ─────────────────────────────────────────────────────────────── */

type Speck = { x: number; y: number; vx: number; vy: number; life: number; age: number; size: number; tone: string };

/** Chalk dust in document coordinates, drawn on a fixed canvas over the page. */
export class Dust {
  private specks: Speck[] = [];
  private ctx: CanvasRenderingContext2D | null;
  private dpr = 1;
  private w = 0;
  private h = 0;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");
    this.resize();
  }

  resize() {
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
  }

  /** A pinch of dust at a point, in proportion to how fast the chalk moved. */
  emit(x: number, y: number, amount: number, tone = "#e7e4db") {
    const n = Math.min(8, Math.floor(amount) + (Math.random() < amount % 1 ? 1 : 0));
    for (let i = 0; i < n && this.specks.length < 260; i++) {
      this.specks.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 3,
        vx: (Math.random() - 0.5) * 22,
        vy: -6 + Math.random() * 14,
        life: 0.7 + Math.random() * 0.9,
        age: 0,
        size: 0.9 + Math.random() * 1.6,
        tone: Math.random() < 0.7 ? "#e7e4db" : tone,
      });
    }
  }

  get busy() {
    return this.specks.length > 0;
  }

  step(dt: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.w, this.h);
    if (!this.specks.length) return;
    const sx = window.scrollX, sy = window.scrollY;
    this.specks = this.specks.filter((s) => (s.age += dt) < s.life);
    for (const s of this.specks) {
      // Light specks: they fall, but air holds them back.
      s.vy += 90 * dt;
      s.vx *= Math.exp(-2.5 * dt);
      s.vy *= Math.exp(-1.2 * dt);
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      const fade = 1 - s.age / s.life;
      ctx.globalAlpha = 0.75 * fade * fade;
      ctx.fillStyle = s.tone;
      ctx.fillRect(s.x - sx, s.y - sy, s.size, s.size);
    }
    ctx.globalAlpha = 1;
  }

  clear() {
    this.specks = [];
    this.step(0);
  }
}

/* ── Sound ────────────────────────────────────────────────────────────── */

/**
 * A chalk scratch made from filtered noise. Silent until enabled from a click
 * (browsers allow sound only after the reader asks for it); loudness follows
 * how fast the chalk is moving.
 */
export class ChalkSound {
  private ctx?: AudioContext;
  private gain?: GainNode;
  private level = 0;
  private drive = 0;
  enabled = false;

  enable() {
    this.enabled = true;
    if (!this.ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      const len = ctx.sampleRate * 2;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      // Noise with a little grain: occasional louder clicks, like chalk catching on the board.
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (Math.random() < 0.004 ? 2.2 : 0.6);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const band = ctx.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = 2900;
      band.Q.value = 0.9;
      const high = ctx.createBiquadFilter();
      high.type = "highpass";
      high.frequency.value = 900;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      src.connect(band).connect(high).connect(gain).connect(ctx.destination);
      src.start();
      this.ctx = ctx;
      this.gain = gain;
    }
    void this.ctx?.resume();
  }

  disable() {
    this.enabled = false;
    this.level = this.drive = 0;
    if (this.gain && this.ctx) this.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.02);
  }

  /** Feed it the distance the chalk just travelled, in pixels. */
  scratch(px: number) {
    if (this.enabled) this.drive = Math.min(1, this.drive + px / 60);
  }

  step(dt: number) {
    if (!this.enabled || !this.ctx || !this.gain) return;
    this.level += (this.drive - this.level) * (1 - Math.exp(-dt * 30));
    this.drive *= Math.exp(-dt * 9);
    const v = this.level < 0.01 ? 0 : 0.16 * this.level * (0.75 + Math.random() * 0.5);
    this.gain.gain.setTargetAtTime(v, this.ctx.currentTime, 0.015);
  }
}

"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Figure 1: a pinched current–voltage loop, the signature of a memristor,
 * drawn in chalk. V = sin t and I = G(t)·V with a conductance that depends on
 * where the sweep has been, so the same voltage gives two currents. The reader
 * can drag the sweep; left alone it sweeps slowly by itself.
 */

const W = 520, H = 340, CX = 260, CY = 170, RX = 200, RY = 210, G0 = 0.5, G1 = 0.42;
const TAU = Math.PI * 2;

const state = (t: number) => {
  const v = Math.sin(t), g = G0 + G1 * Math.cos(t);
  return { v, g, i: v * g };
};
const point = (t: number) => {
  const { v, i } = state(t);
  return { x: CX + v * RX, y: CY - i * RY };
};
const LOOP = Array.from({ length: 241 }, (_, k) => {
  const p = point((k / 240) * TAU);
  return `${k ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
}).join(" ");

const fmt = (n: number) => `${n < 0 ? "−" : "+"}${Math.abs(n).toFixed(2)}`;

export default function LoopFigure() {
  const [t, setT] = useState(0.9);
  const tRef = useRef(t);
  const holding = useRef(false);
  const idleSince = useRef(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tRef.current = t;
  }, [t]);

  // Sweep slowly by itself while on screen and not being dragged.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, last = 0, visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.2 });
    if (box.current) io.observe(box.current);
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      if (visible && !holding.current && now - idleSince.current > 1800) {
        const next = (tRef.current + dt * (TAU / 11)) % TAU;
        tRef.current = next;
        setT(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  // Dragging sideways turns the sweep, like a knob: a full figure-of-eight per figure width.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    holding.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    let x0 = e.clientX;
    const width = e.currentTarget.getBoundingClientRect().width;
    const move = (ev: PointerEvent) => {
      const next = (((tRef.current + ((ev.clientX - x0) / width) * TAU) % TAU) + TAU) % TAU;
      x0 = ev.clientX;
      tRef.current = next;
      setT(next);
    };
    const up = () => {
      holding.current = false;
      idleSince.current = performance.now();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const { v, g, i } = state(t);
  const p = point(t);
  // The two branches through the same voltage: which one we are on is the memory.
  const branch = g > G0 ? "high-G" : "low-G";

  return (
    <div className="loop">
      <div className="loop-plot" ref={box} onPointerDown={onPointerDown}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A pinched current–voltage hysteresis loop, shaped like a figure of eight through the origin.">
          <g className="chalk">
            {[-2, -1, 1, 2].map((k) => (
              <line key={`gx${k}`} className="gridline" x1={CX + k * 100} y1={14} x2={CX + k * 100} y2={H - 14} />
            ))}
            {[-1, 1].map((k) => (
              <line key={`gy${k}`} className="gridline" x1={14} y1={CY + k * 80} x2={W - 14} y2={CY + k * 80} />
            ))}
            <path className="axis" d={`M14 ${CY} H${W - 10} M${W - 20} ${CY - 6} L${W - 10} ${CY} L${W - 20} ${CY + 6}`} pathLength={1} data-draw />
            <path className="axis" d={`M${CX} ${H - 10} V10 M${CX - 6} 20 L${CX} 10 L${CX + 6} 20`} pathLength={1} data-draw />
            <path className="curve" d={LOOP} pathLength={1} data-draw />
            <line className="guide" x1={p.x} y1={CY} x2={p.x} y2={p.y} />
            <circle className="dot" cx={p.x} cy={p.y} r={7} />
          </g>
          <text className="lbl" x={W - 18} y={CY + 26} textAnchor="end">
            V
          </text>
          <text className="lbl" x={CX + 12} y={22}>
            I
          </text>
        </svg>
        <span className="loop-hint hand" aria-hidden="true">
          drag me ⟷
        </span>
      </div>

      <div className="loop-read">
        <p className="readout">
          <i>V</i> = {fmt(v)} &ensp; <i>I</i> = {fmt(i)} &ensp; <i>G</i> = {g.toFixed(2)} <span className="dim">(arb. units)</span>
        </p>
        <pre className="code-line">
          <span className="t-k">const</span> branch = <span className="t-m">&quot;{branch}&quot;</span>;{" "}
          <span className="t-c">{"// same V, different I: the device remembers"}</span>
        </pre>
        <label className="sweep">
          <span className="dim">sweep</span>
          <input
            type="range"
            min={0}
            max={TAU}
            step={0.01}
            value={t}
            onChange={(e) => {
              idleSince.current = performance.now();
              setT(Number(e.target.value));
            }}
            aria-label="Position along the voltage sweep"
          />
        </label>
      </div>
    </div>
  );
}

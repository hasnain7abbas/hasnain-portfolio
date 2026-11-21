/*
 * Figure 1's model, shared by the server markup and the client script: a
 * pinched current–voltage loop with V = sin t and I = G(t)·V, where the
 * conductance G depends on where the sweep has been.
 */

export const W = 520, H = 340, CX = 260, CY = 170, RX = 200, RY = 210, G0 = 0.5, G1 = 0.42;
export const TAU = Math.PI * 2;
export const T0 = 0.9;

export const loopState = (t: number) => {
  const v = Math.sin(t), g = G0 + G1 * Math.cos(t);
  return { v, g, i: v * g };
};

export const loopPoint = (t: number) => {
  const { v, i } = loopState(t);
  return { x: CX + v * RX, y: CY - i * RY };
};

export const LOOP_PATH = Array.from({ length: 241 }, (_, k) => {
  const p = loopPoint((k / 240) * TAU);
  return `${k ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
}).join(" ");

export const fmt = (n: number) => `${n < 0 ? "−" : "+"}${Math.abs(n).toFixed(2)}`;

/** The two branches through the same voltage: which one the sweep is on is the device's memory. */
export const branch = (g: number) => (g > G0 ? "high-G" : "low-G");

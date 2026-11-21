import { CX, CY, H, LOOP_PATH, T0, TAU, W, branch, fmt, loopPoint, loopState } from "@/lib/loop";

/*
 * Figure 1: a pinched current–voltage loop, the signature of a memristor.
 * Rendered as static markup at its starting point; client/figure.ts makes it
 * sweep by itself and lets the reader drag it.
 */
export default function LoopFigure() {
  const { v, g, i } = loopState(T0);
  const p = loopPoint(T0);

  return (
    <div className="loop" data-loop>
      <div className="loop-plot" data-loop-plot>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A pinched current–voltage hysteresis loop, shaped like a figure of eight through the origin.">
          {[-2, -1, 1, 2].map((k) => (
            <line key={`gx${k}`} className="gridline" x1={CX + k * 100} y1={14} x2={CX + k * 100} y2={H - 14} />
          ))}
          {[-1, 1].map((k) => (
            <line key={`gy${k}`} className="gridline" x1={14} y1={CY + k * 80} x2={W - 14} y2={CY + k * 80} />
          ))}
          <path className="axis draw" d={`M14 ${CY} H${W - 10} M${W - 20} ${CY - 6} L${W - 10} ${CY} L${W - 20} ${CY + 6}`} pathLength={1} />
          <path className="axis draw" d={`M${CX} ${H - 10} V10 M${CX - 6} 20 L${CX} 10 L${CX + 6} 20`} pathLength={1} />
          <path className="curve draw" d={LOOP_PATH} pathLength={1} />
          <line className="guide" data-guide x1={p.x} y1={CY} x2={p.x} y2={p.y} />
          <circle className="dot" data-dot cx={p.x} cy={p.y} r={7} />
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
          <i>V</i> = <span data-v>{fmt(v)}</span> &ensp; <i>I</i> = <span data-i>{fmt(i)}</span> &ensp; <i>G</i> ={" "}
          <span data-g>{g.toFixed(2)}</span> <span className="dim">(arb. units)</span>
        </p>
        <pre className="code-line">
          <span className="t-k">const</span> branch = <span className="t-m">&quot;<span data-branch>{branch(g)}</span>&quot;</span>;{" "}
          <span className="t-c">{"// same V, different I: the device remembers"}</span>
        </pre>
        <label className="sweep">
          <span className="dim">sweep</span>
          <input type="range" min={0} max={TAU} step={0.01} defaultValue={T0} aria-label="Position along the voltage sweep" data-sweep />
        </label>
      </div>
    </div>
  );
}

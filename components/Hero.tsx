import { siteConfig } from "@/lib/data";

/* Fig. 1 geometry: a pinched hysteresis loop, I = G(t)·V with V = sin t.
   Motion.tsx reads the same constants to run the tracer along it. */
const W = 400, H = 320, CX = 200, CY = 160, RX = 150, RY = 150, G0 = 0.5, G1 = 0.42;

function loopPath() {
  const steps = 160;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const v = Math.sin(t);
    const c = v * (G0 + G1 * Math.cos(t));
    d += `${i ? "L" : "M"}${(CX + v * RX).toFixed(2)} ${(CY - c * RY).toFixed(2)} `;
  }
  return d.trim();
}

export default function Hero() {
  return (
    <section id="top" className="hero" data-hero-section>
      <div className="wrap">
        <div className="hero-top label" data-hero="meta">
          <span>{siteConfig.role}</span>
          <span>{siteConfig.affiliation}</span>
        </div>

        <h1 className="hero-title" data-hero="title" data-perch="text">
          <span className="line">Hasnain</span>
          <span className="line line--2">Abbas</span>
        </h1>

        <div className="hero-body">
          <div className="hero-copy">
            <p className="lede" data-hero="item">
              I build memristive and synaptic devices for neuromorphic computing, from the sol-gel
              beaker to the neural network.
            </p>
            <div className="hero-cta" data-hero="item">
              <a href={siteConfig.resume} className="btn btn--solid" target="_blank" rel="noopener" data-perch>
                Read the résumé <span className="arrow arrow--down" aria-hidden="true">↓</span>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn" data-perch>
                Write to me <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <figure className="hero-fig fig" data-hero="fig">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label="Schematic current–voltage curve of a memristor: a figure-of-eight loop pinched at the origin."
              data-loop
              data-cx={CX}
              data-cy={CY}
              data-rx={RX}
              data-ry={RY}
              data-g0={G0}
              data-g1={G1}
            >
              {[-2, -1, 1, 2].map((k) => (
                <line key={`x${k}`} className="tick" x1={CX + k * 75} y1={20} x2={CX + k * 75} y2={H - 20} />
              ))}
              {[-1, 1].map((k) => (
                <line key={`y${k}`} className="tick" x1={20} y1={CY + k * 70} x2={W - 20} y2={CY + k * 70} />
              ))}
              <path className="axis" pathLength={1} d={`M20 ${CY} H${W - 20}`} data-draw />
              <path className="axis" pathLength={1} d={`M${CX} ${H - 12} V12`} data-draw />
              <text className="axis-label" x={W - 20} y={CY + 18} textAnchor="end">
                V
              </text>
              <text className="axis-label" x={CX + 10} y={20}>
                I
              </text>
              <path className="loop" pathLength={1} d={loopPath()} data-draw="loop" />
              <circle className="tracer" r="4.5" cx={CX} cy={CY} data-tracer />
            </svg>
            <figcaption className="label" data-perch>
              Fig. 1 — Pinched current–voltage hysteresis, the fingerprint of a memristor. Schematic.
            </figcaption>
          </figure>
        </div>

        <div className="hero-meta label" data-hero="meta">
          <span>{siteConfig.location}</span>
          <span>Seeking a PhD position, 2026</span>
          <a href="#research" className="link link--quiet">
            Scroll ↓
          </a>
        </div>
      </div>
    </section>
  );
}

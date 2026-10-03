import { pipeline, researchInterests, researchProfile } from "@/lib/data";
import { chem } from "@/lib/chem";

const pad = (n: number) => String(n).padStart(2, "0");

export function Research() {
  return (
    <section id="research" className="section">
      <div className="wrap">
        <header className="section-head">
          <span className="label">01 — Research</span>
          <h2 className="h2" data-split data-perch="text">
            Memristive oxide thin films for neuromorphic computing
          </h2>
        </header>

        <div className="profile">
          <div className="profile-text">
            <p className="lede" data-reveal>
              {chem(researchProfile[0])}
            </p>
            {researchProfile.slice(1).map((paragraph, i) => (
              <p key={i} className="prose" style={i === 0 ? { marginTop: "1.75rem" } : undefined} data-reveal>
                {chem(paragraph)}
              </p>
            ))}
          </div>

          <figure className="profile-photo" data-reveal>
            <div className="frame" style={{ aspectRatio: "4 / 5" }} data-perch>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hasnain-portfolio/hasnain.webp"
                alt="Portrait of Hasnain Abbas."
                width={1000}
                height={1227}
                loading="lazy"
                decoding="async"
                data-parallax
              />
            </div>
            <figcaption className="label">Hasnain Abbas.</figcaption>
          </figure>
        </div>

        <div style={{ marginTop: "clamp(4rem, 9vw, 8rem)" }}>
          <span className="label">Research interests</span>
          <ul className="interests">
            {researchInterests.map((interest, i) => (
              <li key={interest} data-reveal>
                <span className="label n">{pad(i + 1)}</span>
                <span>{interest}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* One sample's journey, pinned and scrubbed sideways on wide screens (Motion.tsx),
   a plain numbered list everywhere else. */
export function Pipeline() {
  return (
    <section className="section section--deep pipeline" data-pipeline aria-labelledby="pipeline-title">
      <div className="pipeline-pin" data-pipeline-pin>
        <div className="wrap">
          <div className="pipeline-head">
            <div>
              <span className="label" style={{ display: "block", marginBottom: "1.25rem" }}>
                02 — Thesis work
              </span>
              <h2 id="pipeline-title" className="h2" data-split data-perch="text">
                From material to network
              </h2>
            </div>
            <p className="prose" data-reveal>
              Thin-Film and Memristor Lab, Quaid-i-Azam University. The four stages below follow one sample from
              synthesis to simulation.
            </p>
          </div>
          <div className="pipeline-progress" aria-hidden="true" data-perch>
            <span data-pipeline-bar />
          </div>
        </div>

        <ol className="track" data-pipeline-track>
          {pipeline.map((stage, i) => (
            <li key={stage.name} className="stage" data-stage>
              <span className="label n">
                {pad(i + 1)} / {pad(pipeline.length)}
              </span>
              <h3 className="stage-name">{stage.name}</h3>
              <p className="stage-summary">{chem(stage.summary)}</p>
              <p className="prose">{chem(stage.detail)}</p>
              <ul className="tags label">
                {stage.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

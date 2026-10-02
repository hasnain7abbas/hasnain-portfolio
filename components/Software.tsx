import { projects, siteConfig } from "@/lib/data";

export default function Software() {
  return (
    <section id="software" className="section section--deep">
      <div className="wrap">
        <header className="section-head">
          <span className="label">05 — Software</span>
          <h2 className="h2" data-split data-perch="text">
            Tools I built <em>to teach with.</em>
          </h2>
          <p className="prose" style={{ marginTop: "2rem" }} data-reveal>
            I taught myself to program, with my younger brother{" "}
            <a href="https://saqlainabbas.app/" target="_blank" rel="noopener noreferrer" className="link">
              Saqlain Abbas
            </a>{" "}
            as the teacher I turn to when I am stuck. Most of what I build is free, offline simulation software for
            students who do not have a lab nearby.
          </p>
        </header>

        <ol className="projects" data-perch>
          {projects.map((project, i) => (
            <li key={project.title} data-reveal>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="project-title">{project.title}</h3>
                <span className="arrow" aria-hidden="true" style={{ gridColumn: "-2 / -1", gridRow: 1 }}>
                  ↗
                </span>
                <div className="project-body">
                  <p>{project.description}</p>
                  <span className="label">{project.tech.join(" · ")}</span>
                </div>
              </a>
            </li>
          ))}
        </ol>

        <p style={{ marginTop: "2.5rem" }} data-reveal>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="btn" data-perch>
            All repositories on GitHub <span className="arrow" aria-hidden="true">→</span>
          </a>
        </p>
      </div>
    </section>
  );
}

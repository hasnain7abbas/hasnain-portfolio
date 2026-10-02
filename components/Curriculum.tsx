import { awards, conferences, education, methods, researchExperience, siteConfig } from "@/lib/data";
import { Entries, PlainEntries } from "./Record";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="block">
      <div className="cols">
        <div className="aside">
          <h3 className="block-title">{title}</h3>
        </div>
        <div className="main">{children}</div>
      </div>
    </div>
  );
}

export default function Curriculum() {
  return (
    <section id="cv" className="section">
      <div className="wrap">
        <header className="section-head">
          <span className="label">04 — Curriculum vitae</span>
          <h2 className="h2" data-split data-perch="text">
            Education, research <em>and the record.</em>
          </h2>
          <p style={{ marginTop: "2rem" }} data-reveal>
            <a href={siteConfig.resume} className="btn" target="_blank" rel="noopener" data-perch>
              Download the résumé (PDF) <span className="arrow arrow--down" aria-hidden="true">↓</span>
            </a>
          </p>
        </header>

        <Block title="Education">
          <Entries items={education} />
        </Block>

        <Block title="Research experience">
          <Entries items={researchExperience} />
        </Block>

        <Block title="Methods and instruments">
          <dl className="record methods" data-perch>
            {methods.map((m) => (
              <div key={m.area} className="entry entry--plain" data-reveal>
                <dt>{m.area}</dt>
                <dd>{m.items}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Conferences and workshops">
          <PlainEntries items={conferences} />
        </Block>

        <Block title="Awards and honors">
          <PlainEntries items={awards} />
        </Block>
      </div>
    </section>
  );
}

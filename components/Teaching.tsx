import { awards, teachingAssistant as ta, teachingRecord, type LabMedia } from "@/lib/data";
import { Entries } from "./Record";

function Media({ item, parallax = false }: { item: LabMedia; parallax?: boolean }) {
  if (item.kind === "video") {
    return (
      <video
        src={item.src}
        poster={item.poster}
        width={item.width}
        height={item.height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={item.alt}
        data-autoplay
      />
    );
  }
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      loading="lazy"
      decoding="async"
      data-parallax={parallax ? "" : undefined}
    />
  );
}

export default function Teaching() {
  return (
    <section id="teaching" className="section section--night" data-wren-zone="night">
      <div className="wrap">
        <header className="section-head">
          <span className="label">03 — Teaching</span>
          <h2 className="h2" data-split data-perch="text">
            Physics teaching laboratory, Fall 2026
          </h2>
        </header>

        <div className="ta-intro">
          <div className="ta-role" data-reveal>
            <p className="label status">
              {ta.status} · {ta.term}
            </p>
            <h3 className="h3" style={{ marginTop: "0.9rem" }}>
              {ta.role}
            </h3>
            <p style={{ color: "var(--moss)", fontStyle: "italic", marginTop: "0.3rem" }}>{ta.place}</p>
          </div>
          <p className="lede" data-reveal>
            {ta.summary}
          </p>
        </div>

        <div className="benches">
          {ta.benches.map((item) => (
            <figure key={item.src} data-reveal>
              <div className="frame" data-perch>
                <Media item={item} parallax />
              </div>
              <figcaption className="label">
                {item.caption} <span style={{ opacity: 0.7 }}>{item.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="spectra" role="group" aria-label="Gas-discharge lamps and the probe station" tabIndex={0}>
        {ta.spectra.map((item) => (
          <figure key={item.src} data-reveal>
            <div className="frame">
              <Media item={item} />
            </div>
            <figcaption className="label">
              {item.caption} <span style={{ opacity: 0.7 }}>{item.date}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="wrap" style={{ marginTop: "clamp(5rem, 10vw, 9rem)" }}>
        <div className="cols">
          <div className="aside">
            <h3 className="block-title">Previous appointments</h3>
          </div>
          <div className="main">
            <Entries items={teachingRecord} />
            <p className="prose" style={{ marginTop: "1.75rem" }} data-reveal>
              {awards[0].title}, {awards[0].place} ({awards[0].date}).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

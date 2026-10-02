import type { Entry } from "@/lib/data";
import { chem } from "@/lib/chem";

/** Dated rows, set like the entries of a CV: when on the left, what on the right. */
export function Entries({ items }: { items: Entry[] }) {
  return (
    <div className="record" data-perch>
      {items.map((item) => (
        <article key={item.title + item.date} className="entry" data-reveal>
          <p className="label when">
            {item.date}
            {item.note && (
              <>
                <br />
                {item.note}
              </>
            )}
          </p>
          <div>
            <h4 className="h3">{item.title}</h4>
            <p className="where">
              {item.logo && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={item.logo} alt="" width={26} height={26} loading="lazy" />
              )}
              {item.place}
            </p>
            {item.points && (
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{chem(point)}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

/** Single-line rows for conferences and awards. */
export function PlainEntries({ items }: { items: { title: string; place: string; date: string }[] }) {
  return (
    <div className="record" data-perch>
      {items.map((item) => (
        <div key={item.title} className="entry entry--plain" data-reveal>
          <p className="label when">{item.date}</p>
          <div>
            <p className="what">{item.title}</p>
            <p className="where">{item.place}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

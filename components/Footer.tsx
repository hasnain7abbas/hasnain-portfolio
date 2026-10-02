import { siteConfig } from "@/lib/data";
import { WrenMark } from "./Wren";

const elsewhere = [
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "WhatsApp", href: siteConfig.whatsapp },
  { label: "Reddit", href: siteConfig.reddit },
  { label: "Instagram", href: siteConfig.instagram },
  { label: "Facebook", href: siteConfig.facebook },
];

export default function Footer() {
  return (
    <footer id="contact" className="foot" data-wren-zone="night">
      <div className="wrap">
        <span className="label" style={{ display: "block", marginBottom: "1.5rem" }}>
          07 — Contact
        </span>
        <p className="foot-call" data-split data-perch="text">
          Looking for a PhD position in neuromorphic computing.
        </p>
        <a href={`mailto:${siteConfig.email}`} className="foot-mail link" data-reveal>
          {siteConfig.email}
        </a>
        <p style={{ marginTop: "2rem" }} data-reveal>
          <a href={siteConfig.resume} className="btn" target="_blank" rel="noopener" data-perch>
            Résumé (PDF) <span className="arrow arrow--down" aria-hidden="true">↓</span>
          </a>
        </p>

        <div className="foot-grid">
          <div>
            <span className="label">Elsewhere</span>
            <ul>
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="link link--quiet">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="label">Based in</span>
            <ul>
              <li>{siteConfig.location}</li>
              <li>{siteConfig.affiliation}</li>
            </ul>
          </div>
          <div>
            <span className="label">Colophon</span>
            <p className="foot-credit" style={{ marginTop: "0.8rem" }}>
              <WrenMark size={26} light />
              <span>
                The wren that flies through this page is the mascot of{" "}
                <a
                  href="https://github.com/Razee4315/Paperwren"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Paperwren
                </a>
                , an open-source document viewer by Razee4315. Its artwork and flight code are used here under the
                MIT License. Set in Newsreader and JetBrains Mono.
              </span>
            </p>
          </div>
        </div>

        <div className="foot-base label">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <a href="#top" className="link link--quiet">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

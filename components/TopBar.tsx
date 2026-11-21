import { siteConfig } from "@/lib/data";

const links = [
  { n: "1", label: "Research", href: "#research" },
  { n: "2", label: "Teaching", href: "#teaching" },
  { n: "3", label: "Software", href: "#software" },
  { n: "4", label: "CV", href: "#cv" },
];

/*
 * The running head of the paper, with the chalk-sound switch and the switch
 * between the typeset page and its LaTeX source. Both states live as data
 * attributes on <html> (set by client/main.ts), so the buttons restyle with CSS.
 */
export default function TopBar() {
  return (
    <header className="topbar" data-topbar>
      <div className="topbar-in">
        <a href="#top" className="runhead">
          <span className="hand runhead-name">H. Abbas</span>
          <span className="runhead-t">Light, matter and code</span>
        </a>

        <nav className="topnav" aria-label="Sections">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              <span className="topnav-n">§{l.n}</span> {l.label}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <button type="button" className="sound" aria-pressed="false" data-sound-toggle title="Hear the chalk as it writes">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" />
              <path className="sound-on" d="M15.5 9.2c1 .8 1 4.8 0 5.6M18 7c2.2 1.9 2.2 8.1 0 10" />
              <path className="sound-off" d="M16 9.5l5 5M21 9.5l-5 5" />
            </svg>
            <span className="sound-label">chalk</span>
          </button>
          <button type="button" className="switch" aria-pressed="false" data-view-toggle title="Show the LaTeX this page compiles from (press S)">
            <span className="switch-opt switch-page">page</span>
            <span className="switch-opt switch-tex tt">.tex</span>
          </button>
          <a href={siteConfig.resume} target="_blank" rel="noopener" className="pdf">
            CV <span className="tt">.pdf</span>
          </a>
        </div>
      </div>
    </header>
  );
}

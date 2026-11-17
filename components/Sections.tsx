import {
  awards,
  blogPosts,
  conferences,
  education,
  methods,
  projects,
  researchExperience,
  researchInterests,
  siteConfig,
  teachingAssistant as ta,
  teachingRecord,
  type Entry,
  type LabMedia,
} from "@/lib/data";
import { M, esc } from "@/lib/tex";
import { Caption, Note, Row, SectionHead, Tx } from "./Paper";

/* Text that mentions BiFeO₃ is typeset with the formula as maths. */
function T({ children }: { children: string }) {
  const parts = children.split("BiFeO₃");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <M>{String.raw`\mathrm{BiFeO_3}`}</M>}
          {part}
        </span>
      ))}
    </>
  );
}

/* ── Contents ─────────────────────────────────────────────────────────── */

const TOC = [
  { n: "1", title: "Research", href: "#research", page: 2 },
  { n: "2", title: "Teaching, and the photographs", href: "#teaching", page: 4 },
  { n: "3", title: "Software", href: "#software", page: 6 },
  { n: "4", title: "Curriculum vitae", href: "#cv", page: 8 },
  { n: "A", title: "Notes", href: "#notes", page: 11 },
  { n: "", title: "References", href: "#references", page: 12 },
];

export function Contents() {
  return (
    <Row>
      <Tx src={String.raw`\tableofcontents`} className="toc">
        <p className="toc-head">Contents</p>
        <ol>
          {TOC.map((s) => (
            <li key={s.title}>
              <a href={s.href}>
                <span className="toc-n">{s.n}</span>
                <span className="toc-t">{s.title}</span>
                <span className="toc-dots" aria-hidden="true" />
                <span className="toc-p">{s.page}</span>
              </a>
            </li>
          ))}
        </ol>
      </Tx>
    </Row>
  );
}

/* ── 1 Research ───────────────────────────────────────────────────────── */

const ALGO: { n: number; indent: number; html: React.ReactNode; tex: string }[] = [
  { n: 1, indent: 0, html: <>prepare the sol; tune the precursor chemistry</>, tex: String.raw`\State prepare the sol; tune the precursor chemistry` },
  { n: 2, indent: 0, html: <><b>for</b> each composition <M>x</M> <b>do</b></>, tex: String.raw`\For{each composition $x$}` },
  { n: 3, indent: 1, html: <>spin-coat the film; anneal</>, tex: String.raw`\State spin-coat the film; anneal` },
  { n: 4, indent: 1, html: <>check phase and microstructure: XRD, FTIR, profilometry, impedance</>, tex: String.raw`\State check phase and microstructure: XRD, FTIR, profilometry, impedance` },
  { n: 5, indent: 1, html: <>record <M>P</M>–<M>E</M> loops on a Sawyer–Tower tester <span className="cm">▷ <M>{String.raw`P_r,\ E_c`}</M></span></>, tex: String.raw`\State record $P$--$E$ loops on a Sawyer--Tower tester \Comment{$P_r,\ E_c$}` },
  { n: 6, indent: 1, html: <>sweep and pulse <M>I</M>–<M>V</M> on a Keithley 2602 from Lua scripts <span className="cm">▷ <M>G</M></span></>, tex: String.raw`\State sweep and pulse $I$--$V$ on a Keithley 2602 from Lua scripts \Comment{$G$}` },
  { n: 7, indent: 0, html: <><b>end for</b></>, tex: String.raw`\EndFor` },
  { n: 8, indent: 0, html: <>map the measured <M>G</M> into CrossSim; train an MLP on MNIST in PyTorch</>, tex: String.raw`\State map the measured $G$ into CrossSim; train an MLP on MNIST in PyTorch` },
  { n: 9, indent: 0, html: <><b>return</b> inference accuracy with the devices as synapses</>, tex: String.raw`\State \Return inference accuracy with the devices as synapses` },
];

export function Research() {
  return (
    <section id="research" className="section">
      <SectionHead n="1" title="Research" src={String.raw`\section{Research}\label{sec:research}`} />

      <Row
        note={
          <Note arrow="left" tone="yellow">
            supervised by Dr.&nbsp;Ghulam Hassnain Jaffari
          </Note>
        }
      >
        <Tx
          src={String.raw`
I am an MPhil researcher in physics at Quaid-i-Azam University,
Islamabad. My thesis concerns Co-substituted BiFeO$_3$ thin films
for memristor and neuromorphic applications.

The work covers the whole chain from a beaker of sol to a trained
network, summarised in Algorithm~\ref{alg:thesis}. I am seeking a
PhD position in neuromorphic computing, synaptic devices and
memristor-based hardware.`}
        >
          <div className="prose">
            <p>
              I am an MPhil researcher in physics at Quaid-i-Azam University, Islamabad. My thesis concerns
              Co-substituted <M>{String.raw`\mathrm{BiFeO_3}`}</M> thin films for{" "}
              <span data-mark="underline" data-tone="yellow">memristor and neuromorphic applications</span>.
            </p>
            <p>
              The work covers the whole chain, from a beaker of sol to a trained network, summarised in{" "}
              <a href="#alg-thesis" className="ref">Algorithm 1</a>. I am seeking a{" "}
              <span data-mark="box" data-tone="pink">PhD position</span> in neuromorphic computing, synaptic devices and
              memristor-based hardware.
            </p>
          </div>
        </Tx>
      </Row>

      <Row
        note={
          <Note arrow="left" tone="green">
            yes, the SourceMeter speaks Lua
          </Note>
        }
      >
        <Tx
          src={String.raw`
\begin{algorithm}
  \caption{From precursor to network}\label{alg:thesis}
  \begin{algorithmic}[1]
    \Require sol-gel precursors for Co-substituted BiFeO$_3$
${ALGO.map((l) => "    " + "  ".repeat(l.indent) + l.tex).join("\n")}
  \end{algorithmic}
\end{algorithm}`}
        >
          <figure className="algo" id="alg-thesis" data-reveal>
            <p className="algo-head">
              <b>Algorithm 1</b> From precursor to network
            </p>
            <p className="algo-req">
              <b>Require:</b> sol-gel precursors for Co-substituted <M>{String.raw`\mathrm{BiFeO_3}`}</M>
            </p>
            <ol>
              {ALGO.map((l) => (
                <li key={l.n}>
                  <span className="algo-n">{l.n}:</span>
                  <span style={{ paddingLeft: `${l.indent * 1.4}em` }}>{l.html}</span>
                </li>
              ))}
            </ol>
          </figure>
        </Tx>
      </Row>

      <Row>
        <Tx
          src={String.raw`
\paragraph{Research interests.}
\begin{itemize}
${researchInterests.map((r) => "  \\item " + esc(r)).join("\n")}
\end{itemize}`}
        >
          <div className="prose">
            <p className="run-in">
              <b>Research interests.</b>
            </p>
            <ul className="itemize">
              {researchInterests.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </Tx>
      </Row>
    </section>
  );
}

/* ── 2 Teaching, and the photographs ──────────────────────────────────── */

function Media({ item, eager = false }: { item: LabMedia; eager?: boolean }) {
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
    <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading={eager ? "eager" : "lazy"} decoding="async" />
  );
}

const sub = "abcdefgh";

export function Teaching() {
  return (
    <section id="teaching" className="section">
      <SectionHead n="2" title="Teaching, and the photographs" src={String.raw`\section{Teaching, and the photographs}\label{sec:teaching}`} />

      <Row
        note={
          <Note arrow="left" tone="pink">
            ongoing
          </Note>
        }
      >
        <Tx
          src={String.raw`
This semester (${ta.term}) I am a teaching assistant in the physics
teaching laboratory at Quaid-i-Azam University. The experiments in
Figures~\ref{fig:benches} and~\ref{fig:spectra} are from the first
weeks of term. I photographed them as I set them up.`}
        >
          <div className="prose">
            <p>
              This semester (
              <span data-mark="circle" data-tone="pink">
                {ta.term}
              </span>
              ) I am a teaching assistant in the physics teaching laboratory at Quaid-i-Azam University. The experiments
              in <a href="#fig-benches" className="ref">Figures 2</a> and <a href="#photographs" className="ref">3</a> are
              from the first weeks of term: the Hall effect, nuclear magnetic resonance, and the emission spectra of
              gas-discharge lamps.
            </p>
          </div>
        </Tx>
      </Row>

      <Row wide>
        <Tx
          src={String.raw`
\begin{figure*}
  \centering
  \subfloat[Hall effect.]{\includegraphics[width=.58\linewidth]{hall-effect}}
  \hfill
  \subfloat[Nuclear magnetic resonance.]{\includegraphics[width=.4\linewidth]{nmr}}
  \caption{Two benches from the teaching laboratory, ${ta.term}.}
  \label{fig:benches}
\end{figure*}`}
        >
          <figure className="figure figure--plates benches" id="fig-benches" data-reveal>
            <div className="plates">
              {ta.benches.map((item, i) => (
                <div key={item.src} className="plate">
                  <div className="photo">
                    <Media item={item} />
                  </div>
                  <p className="subcap">
                    ({sub[i]}) {item.caption}
                  </p>
                </div>
              ))}
            </div>
            <Caption label="Figure 2">Two benches from the teaching laboratory, {ta.term}.</Caption>
          </figure>
        </Tx>
      </Row>

      <Row
        wide
        note={
          <Note arrow="up" tone="yellow">
            lights off for these
          </Note>
        }
      >
        <Tx
          src={String.raw`
\begin{figure*}
  \centering
${ta.spectra.map((m) => `  \\subfloat[]{\\includegraphics[width=.155\\linewidth]{${m.src.split("/").pop()}}}`).join("\n")}
  \caption{Gas-discharge lamps in the spectroscopy experiment, and a
    probe tip under the optical microscope.}
  \label{fig:spectra}
\end{figure*}`}
        >
          <figure className="figure figure--plates" id="photographs" data-reveal>
            <div className="strip" tabIndex={0} role="group" aria-label="Figure 3, six photographs">
              {ta.spectra.map((item, i) => (
                <div key={item.src} className="plate">
                  <div className="photo photo--tall">
                    <Media item={item} />
                  </div>
                  <p className="subcap">({sub[i]})</p>
                </div>
              ))}
            </div>
            <Caption label="Figure 3">
              (a) A discharge tube beside the spectrometer, filmed with the lights off. (b)–(e) Four lamps and their
              colours of emission. (f) A probe tip under the optical microscope.
            </Caption>
          </figure>
        </Tx>
      </Row>

      <Row>
        <Tx
          src={String.raw`
\paragraph{Before this.}
\begin{description}
${teachingRecord.map((e) => `  \\item[${e.date}] ${esc(e.title)}, \\emph{${esc(e.place)}}.`).join("\n")}
\end{description}
${esc(awards[0].title)}, ${esc(awards[0].place)} (${awards[0].date}).`}
        >
          <div className="prose">
            <p className="run-in">
              <b>Before this.</b>
            </p>
            <Entries items={teachingRecord} />
            <p className="after-list">
              {awards[0].title}, {awards[0].place} ({awards[0].date}).
            </p>
          </div>
        </Tx>
      </Row>
    </section>
  );
}

/* ── 3 Software ───────────────────────────────────────────────────────── */

const LUA = `-- One I-V sweep: 0 -> +Vmax -> -Vmax -> 0, measuring I at every step.
-- Simplified; the real scripts add pulse trains and compliance checks.
local function sweep(vmax, step)
  local v = {}
  for x = 0, vmax, step do v[#v + 1] = x end
  for x = vmax, -vmax, -step do v[#v + 1] = x end
  for x = -vmax, 0, step do v[#v + 1] = x end
  return v
end

smua.reset()
smua.source.func   = smua.OUTPUT_DCVOLTS
smua.source.limiti = 1e-3
smua.nvbuffer1.clear()
smua.source.output = smua.OUTPUT_ON
for _, v in ipairs(sweep(1.5, 0.05)) do
  smua.source.levelv = v
  delay(0.01)
  smua.measure.i(smua.nvbuffer1)
end
smua.source.output = smua.OUTPUT_OFF`;

function highlightLua(src: string) {
  return src.split("\n").map((line, i) => {
    const c = line.indexOf("--");
    const code = c >= 0 ? line.slice(0, c) : line;
    const comment = c >= 0 ? line.slice(c) : "";
    const parts = code.split(/(\b(?:local|function|for|do|end|return|in)\b|\b\d+(?:\.\d+)?(?:e-?\d+)?\b)/g);
    return (
      <span key={i} className="ln">
        {parts.map((p, j) =>
          /^(local|function|for|do|end|return|in)$/.test(p) ? (
            <span key={j} className="t-k">{p}</span>
          ) : /^\d/.test(p) ? (
            <span key={j} className="t-m">{p}</span>
          ) : (
            p
          ),
        )}
        {comment && <span className="t-c">{comment}</span>}
        {"\n"}
      </span>
    );
  });
}

export function Software() {
  return (
    <section id="software" className="section">
      <SectionHead n="3" title="Software" src={String.raw`\section{Software}\label{sec:software}`} />

      <Row
        note={
          <Note arrow="left" tone="blue">
            my brother Saqlain taught me most of this, usually at 2&nbsp;a.m.
          </Note>
        }
      >
        <Tx
          src={String.raw`
I taught myself to program. Most of what I write is free simulation
software for students who do not have a laboratory nearby, listed in
Table~\ref{tab:software}; the rest is the code that runs my
measurements (Listing~\ref{lst:sweep}).`}
        >
          <div className="prose">
            <p>
              I taught myself to program, with{" "}
              <a href="https://saqlainabbas.me/" target="_blank" rel="noopener noreferrer" className="ref">
                Saqlain Abbas
              </a>{" "}
              as the teacher I turn to when I am stuck. Most of what I write is free simulation software for students who
              do not have a laboratory nearby, listed in <a href="#tab-software" className="ref">Table 1</a>; the rest is
              the code that runs my measurements (<a href="#lst-sweep" className="ref">Listing 1</a>).
            </p>
          </div>
        </Tx>
      </Row>

      <Row wide>
        <Tx
          src={String.raw`
\begin{table}
  \centering
  \begin{tabular}{l p{.55\linewidth} l}
    \toprule
    Name & What it does & Built with \\
    \midrule
${projects.map((p) => `    \\href{${p.link}}{${esc(p.title)}} & ${esc(p.description)} & ${esc(p.tech.join(", "))} \\\\`).join("\n")}
    \bottomrule
  \end{tabular}
  \caption{Software I have written. All of it is free and open source.}
  \label{tab:software}
\end{table}`}
        >
          <figure className="tbl" id="tab-software" data-reveal>
            <p className="tbl-cap">
              <b>Table 1:</b> Software I have written. All of it is free and open source.
            </p>
            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>What it does</th>
                    <th>Built with</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.title}>
                      <td>
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="ref">
                          {p.title}
                        </a>
                      </td>
                      <td>{p.description}</td>
                      <td className="tt">{p.tech.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </figure>
        </Tx>
      </Row>

      <Row
        wide
        note={
          <Note arrow="up" tone="green">
            simplified, but this is the shape of it
          </Note>
        }
      >
        <Tx
          src={String.raw`
\begin{lstlisting}[language={[5.1]Lua}, caption={An $I$--$V$ sweep on
  the Keithley 2602, in Lua (TSP).}, label={lst:sweep}]
  ...
\end{lstlisting}`}
        >
          <figure className="listing" id="lst-sweep" data-reveal>
            <p className="tbl-cap">
              <b>Listing 1:</b> An <M>I</M>–<M>V</M> sweep on the Keithley 2602, in Lua (TSP).
            </p>
            <pre className="code">
              <code>{highlightLua(LUA)}</code>
            </pre>
          </figure>
        </Tx>
      </Row>

      <Row>
        <Tx src={String.raw`See also \url{${siteConfig.github}}.`}>
          <p className="prose see-also">
            <i>See also</i>{" "}
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="ref tt">
              github.com/hasnain7abbas
            </a>
            .
          </p>
        </Tx>
      </Row>
    </section>
  );
}

/* ── 4 Curriculum vitae ───────────────────────────────────────────────── */

function Entries({ items }: { items: Entry[] }) {
  return (
    <dl className="cv">
      {items.map((e) => (
        <div key={e.title + e.date} className="cv-row">
          <dt>
            {e.date}
            {e.note && <span className="cv-note">{e.note}</span>}
          </dt>
          <dd>
            <b>{e.title}</b>, <i>{e.place}</i>
            {e.points && (
              <ul className="itemize">
                {e.points.map((p) => (
                  <li key={p}>
                    <T>{p}</T>
                  </li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

const cvTex = (title: string, items: Entry[]) =>
  [`\\subsection*{${title}}`, ...items.map((e) => `\\cventry{${e.date}}{${esc(e.title)}}{${esc(e.place)}}${e.note ? `{${esc(e.note)}}` : "{}"}`)].join("\n");

export function Curriculum() {
  return (
    <section id="cv" className="section">
      <SectionHead n="4" title="Curriculum vitae" src={String.raw`\section{Curriculum vitae}\label{sec:cv}`} />

      <Row
        note={
          <Note arrow="left" tone="yellow">
            the PDF has the same, on two pages
          </Note>
        }
      >
        <Tx src={String.raw`The full r\'esum\'e is attached as a PDF: \href{${siteConfig.resume}}{Hasnain-Abbas-Resume.pdf}.`}>
          <p className="prose">
            The full résumé is attached as a PDF:{" "}
            <a href={siteConfig.resume} target="_blank" rel="noopener" className="ref tt">
              Hasnain-Abbas-Resume.pdf
            </a>
            .
          </p>
        </Tx>
      </Row>

      <Row>
        <Tx src={cvTex("Education", education)}>
          <h3 className="subsec">Education</h3>
          <Entries items={education} />
        </Tx>
      </Row>
      <Row>
        <Tx src={cvTex("Research experience", researchExperience)}>
          <h3 className="subsec">Research experience</h3>
          <Entries items={researchExperience} />
        </Tx>
      </Row>
      <Row>
        <Tx
          src={["\\subsection*{Methods and instruments}", "\\begin{description}", ...methods.map((m) => `  \\item[${esc(m.area)}] ${esc(m.items)}`), "\\end{description}"].join("\n")}
        >
          <h3 className="subsec">Methods and instruments</h3>
          <dl className="desc">
            {methods.map((m) => (
              <div key={m.area}>
                <dt>{m.area}.</dt> <dd>{m.items}</dd>
              </div>
            ))}
          </dl>
        </Tx>
      </Row>
      <Row>
        <Tx src={cvTex("Conferences and workshops", conferences)}>
          <h3 className="subsec">Conferences and workshops</h3>
          <Entries items={conferences} />
        </Tx>
      </Row>
      <Row>
        <Tx src={cvTex("Awards", awards)}>
          <h3 className="subsec">Awards</h3>
          <Entries items={awards} />
        </Tx>
      </Row>
    </section>
  );
}

/* ── Appendix A: Notes ────────────────────────────────────────────────── */

export function Notes() {
  return (
    <section id="notes" className="section">
      <SectionHead n="A" title="Notes" src={String.raw`\appendix\section{Notes}\label{app:notes}`} />
      <Row
        note={
          <Note arrow="left" tone="blue">
            click a title to open it
          </Note>
        }
      >
        <Tx src={blogPosts.map((p) => `\\subsection{${esc(p.title)}}\\label{app:${p.id}} % ${p.date}`).join("\n")}>
          <div className="notes">
            {blogPosts.map((p, i) => (
              <details key={p.id} className="post">
                <summary>
                  <span className="post-n">A.{i + 1}</span>
                  <span className="post-t">{p.title}</span>
                  <span className="post-d">{p.date}</span>
                </summary>
                <div className="prose post-body">
                  <p className="post-ex">
                    <i>{p.excerpt}</i>
                  </p>
                  <p>{p.content}</p>
                </div>
              </details>
            ))}
          </div>
        </Tx>
      </Row>
    </section>
  );
}

/* ── Acknowledgements, references, end ────────────────────────────────── */

const REFS = [
  { label: "Curriculum vitae (PDF)", href: siteConfig.resume, show: "Hasnain-Abbas-Resume.pdf" },
  { label: "Email", href: `mailto:${siteConfig.email}`, show: siteConfig.email },
  { label: "GitHub", href: siteConfig.github, show: "github.com/hasnain7abbas" },
  { label: "LinkedIn", href: siteConfig.linkedin, show: "linkedin.com/in/hasnain-abbas-659943273" },
  { label: "WhatsApp", href: siteConfig.whatsapp, show: "wa.me/923438833262" },
  { label: "Reddit", href: siteConfig.reddit, show: "reddit.com/user/hasnain7abbas" },
  { label: "Instagram", href: siteConfig.instagram, show: "instagram.com/hasnain7abbas" },
];

export function Closing() {
  return (
    <section id="references" className="section closing">
      <Row>
        <Tx
          src={String.raw`
\section*{Acknowledgements}
I thank my supervisor, Dr.~Ghulam Hassnain Jaffari, and my brother,
Saqlain Abbas, who taught me most of the software I know.`}
        >
          <h3 className="subsec">Acknowledgements</h3>
          <p className="prose">
            I thank my supervisor, Dr. Ghulam Hassnain Jaffari, and my brother, Saqlain Abbas, who taught me most of the
            software I know.
          </p>
        </Tx>
      </Row>

      <Row
        note={
          <Note arrow="left" tone="yellow">
            write to me: [2] is my email
          </Note>
        }
      >
        <Tx
          src={["\\begin{thebibliography}{9}", ...REFS.map((r, i) => `  \\bibitem{r${i + 1}} ${r.label}, \\url{${r.show}}.`), "\\end{thebibliography}"].join("\n")}
        >
          <h3 className="subsec">References</h3>
          <ol className="bib">
            {REFS.map((r, i) => (
              <li key={r.label}>
                <span className="bib-n">[{i + 1}]</span>
                <span>
                  {r.label},{" "}
                  <a
                    href={r.href}
                    className="ref tt"
                    {...(r.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {r.show}
                  </a>
                  .
                </span>
              </li>
            ))}
          </ol>
        </Tx>
      </Row>

      <Row>
        <Tx src={String.raw`\end{document}`}>
          <p className="colophon">
            Set in Computer Modern, with notes in Kalam. Built with Next.js; the source of every block is one click
            away, top right.
            <span className="qed" aria-label="end">
              ∎
            </span>
          </p>
        </Tx>
      </Row>
    </section>
  );
}

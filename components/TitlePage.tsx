import { siteConfig } from "@/lib/data";
import { M } from "@/lib/tex";
import { Caption, Note, Row, Tx } from "./Paper";
import LoopFigure from "./LoopFigure";

const month = new Date().toLocaleString("en-GB", { month: "long", year: "numeric" });

const PHYSICS = String.raw`\href{#research}{\htmlClass{ket ket--physics}{\lvert \text{physics} \rangle}}`;
const PHOTO = String.raw`\href{#photographs}{\htmlClass{ket ket--photo}{\lvert \text{photography} \rangle}}`;
const CODE = String.raw`\href{#software}{\htmlClass{ket ket--code}{\lvert \text{code} \rangle}}`;
/* One line on wide screens; on phones the same equation broken after each term. */
const KET = String.raw`\lvert \text{Hasnain} \rangle = \alpha\, ${PHYSICS} + \beta\, ${PHOTO} + \gamma\, ${CODE} \tag{1}`;
const KET_NARROW = String.raw`\begin{aligned} \lvert \text{Hasnain} \rangle &= \alpha\, ${PHYSICS} \\ &\quad + \beta\, ${PHOTO} \\ &\quad + \gamma\, ${CODE} \end{aligned} \tag{1}`;

const TITLE_SRC = String.raw`
\documentclass[11pt]{article}
\usepackage{amsmath, graphicx, hyperref}

\title{\handwritten{Hasnain Abbas}}
\author{Experimental physicist $\cdot$ photographer $\cdot$
  software engineer at heart \\
  Department of Physics, Quaid-i-Azam University, Islamabad}
\date{${month}}

\begin{document}
\maketitle`;

const ABSTRACT_SRC = String.raw`
\begin{abstract}
I grow Co-substituted BiFeO$_3$ thin films, measure how they switch,
and train neural networks that use them as synapses. I teach in the
physics laboratory, photograph what the instruments do with light,
and write the software I wished I had as a student: free simulations
that run offline.
\end{abstract}`;

const EQ_SRC = String.raw`
\begin{equation}
  \lvert \text{Hasnain} \rangle = \alpha \lvert \text{physics} \rangle
    + \beta \lvert \text{photography} \rangle
    + \gamma \lvert \text{code} \rangle
  \label{eq:me}
\end{equation}`;

const FIG_SRC = String.raw`
\begin{figure}[h]
  \centering
  \begin{tikzpicture}
    \draw[->] (-1.1,0) -- (1.1,0) node[right] {$V$};
    \draw[->] (0,-0.9) -- (0,0.9) node[above] {$I$};
    \draw[thick, domain=0:2*pi, samples=240, smooth]
      plot ({sin(\x r)}, {sin(\x r)*(0.5 + 0.42*cos(\x r))});
  \end{tikzpicture}
  \caption{A pinched hysteresis loop, the signature of a memristor
    (schematic). Drag the sweep.}
  \label{fig:loop}
\end{figure}`;

export default function TitlePage() {
  return (
    <header id="top" className="title-page">
      <p className="stamp" aria-hidden="true">
        hasnain:2611.17v1 &nbsp;[physics.app-ph &middot; cs.SE] &nbsp;{month}
      </p>

      <Tx src={TITLE_SRC} className="title-block">
        <h1 className="hand title" data-write>
          Hasnain Abbas
        </h1>
        <p className="subtitle" data-hero="1">
          Experimental physicist &middot; photographer &middot; software engineer at heart
        </p>
        <p className="affil" data-hero="2">
          Department of Physics, Quaid-i-Azam University, Islamabad
          <br />
          <span className="dim">from Skardu, Gilgit-Baltistan</span>
        </p>
        <p className="date" data-hero="3">
          {month}
        </p>
        <p className="title-links" data-hero="4">
          <a href={siteConfig.resume} target="_blank" rel="noopener" className="ref">
            Résumé (PDF)
          </a>
          <span className="dim">&middot;</span>
          <a href={`mailto:${siteConfig.email}`} className="ref">
            Email
          </a>
          <span className="dim">&middot;</span>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="ref">
            GitHub
          </a>
        </p>
      </Tx>

      <Row
        note={
          <Note arrow="left" tone="yellow">
            the short version
          </Note>
        }
      >
        <Tx src={ABSTRACT_SRC} className="abstract" >
          <p className="abstract-head" data-hero="5">
            Abstract
          </p>
          <p data-hero="6">
            I grow Co-substituted <M>{String.raw`\mathrm{BiFeO_3}`}</M> thin films, measure how they{" "}
            <span data-mark="underline" data-tone="yellow">
              switch
            </span>

            , and train neural networks that use them as{" "}
            <span data-mark="circle" data-tone="pink">
              synapses
            </span>
            . I teach in the physics laboratory, photograph what the instruments do with light, and write the software I
            wished I had as a student:{" "}
            <span data-mark="underline" data-tone="green">
              free simulations that run offline
            </span>
            .
          </p>
        </Tx>
      </Row>

      <Row
        note={
          <Note arrow="left" tone="pink">
            normalised: |α|² + |β|² + |γ|² = 1.
            <br />
            The phases are a private matter.
          </Note>
        }
      >
        <Tx src={EQ_SRC} className="eq" >
          <div data-hero="7">
            <div className="eq-wide">
              <M display>{KET}</M>
            </div>
            <div className="eq-narrow">
              <M display>{KET_NARROW}</M>
            </div>
          </div>
        </Tx>
      </Row>

      <Row
        note={
          <Note arrow="left" tone="blue">
            this is what I chase in the lab: same voltage, two currents
          </Note>
        }
      >
        <Tx src={FIG_SRC}>
          <figure className="figure" data-reveal>
            <LoopFigure />
            <Caption label="Figure 1">
              A pinched hysteresis loop, the signature of a memristor (schematic). Drag the plot or the slider to move
              along the voltage sweep.
            </Caption>
          </figure>
        </Tx>
      </Row>
    </header>
  );
}

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { siteConfig } from "@/lib/data";

/* The chalk-sound preference lives in localStorage; off unless the reader turned it on before. */
const SOUND_KEY = "chalk-sound";
const readSound = () => {
  try {
    return localStorage.getItem(SOUND_KEY) === "1";
  } catch {
    return false;
  }
};
const subscribeSound = (cb: () => void) => {
  window.addEventListener("chalksound", cb);
  return () => window.removeEventListener("chalksound", cb);
};

const links = [
  { n: "1", label: "Research", href: "#research" },
  { n: "2", label: "Teaching", href: "#teaching" },
  { n: "3", label: "Software", href: "#software" },
  { n: "4", label: "CV", href: "#cv" },
];

/*
 * The running head of the paper, plus the switch between the typeset page and
 * the LaTeX it compiles from. The view is a data attribute on <html>, so every
 * block can swap itself with CSS alone.
 */
export default function TopBar() {
  const [source, setSource] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sound = useSyncExternalStore(subscribeSound, readSound, () => false);

  const toggleSound = () => {
    const next = !sound;
    try {
      localStorage.setItem(SOUND_KEY, next ? "1" : "0");
    } catch {}
    // Dispatched inside the click, so the browser lets the sound start.
    window.dispatchEvent(new CustomEvent("chalksound", { detail: next }));
  };

  useEffect(() => {
    document.documentElement.dataset.view = source ? "source" : "page";
    window.dispatchEvent(new Event("viewchange"));
  }, [source]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // "s" toggles the source view, as long as the reader is not typing somewhere.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "s" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, [contenteditable]")) return;
      setSource((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="topbar" data-scrolled={scrolled}>
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
          <button
            type="button"
            className={`sound${sound ? " is-on" : ""}`}
            aria-pressed={sound}
            onClick={toggleSound}
            title={sound ? "Turn the chalk sound off" : "Hear the chalk as it writes"}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" />
              {sound ? (
                <path className="sound-wave" d="M15.5 9.2c1 .8 1 4.8 0 5.6M18 7c2.2 1.9 2.2 8.1 0 10" />
              ) : (
                <path className="sound-wave" d="M16 9.5l5 5M21 9.5l-5 5" />
              )}
            </svg>
            <span className="sound-label">chalk</span>
          </button>
          <button
            type="button"
            className="switch"
            aria-pressed={source}
            onClick={() => setSource((v) => !v)}
            title="Show the LaTeX this page compiles from (press S)"
          >
            <span className={`switch-opt${source ? "" : " is-on"}`}>page</span>
            <span className={`switch-opt tt${source ? " is-on" : ""}`}>.tex</span>
          </button>
          <a href={siteConfig.resume} target="_blank" rel="noopener" className="pdf">
            CV <span className="tt">.pdf</span>
          </a>
        </div>
      </div>
    </header>
  );
}

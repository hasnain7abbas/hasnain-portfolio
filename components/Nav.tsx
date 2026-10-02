"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/data";
import { WrenMark } from "./Wren";

const links = [
  { label: "Research", href: "#research" },
  { label: "Teaching", href: "#teaching" },
  { label: "CV", href: "#cv" },
  { label: "Software", href: "#software" },
  { label: "Writing", href: "#writing" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="nav" data-scrolled={scrolled || open}>
        <div className="wrap">
          <a href="#top" className="brand" onClick={() => setOpen(false)}>
            <WrenMark home />
            <span>{siteConfig.name}</span>
          </a>

          <nav className="nav-links" aria-label="Sections">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="link link--quiet">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a href={siteConfig.resume} className="btn" target="_blank" rel="noopener" data-perch>
              Résumé <span className="arrow arrow--down" aria-hidden="true">↓</span>
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div id="menu" className="menu" data-open={open} inert={!open}>
        <nav aria-label="Sections">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="menu-link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href={`mailto:${siteConfig.email}`} className="label link">
          {siteConfig.email}
        </a>
      </div>
    </>
  );
}

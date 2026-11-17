"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { ChalkSound, Dust, markPath, type MarkKind } from "@/lib/chalk";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CHALK: Record<string, string> = {
  yellow: "#f0d27c",
  pink: "#ee9fae",
  blue: "#93c6e6",
  green: "#a8d59c",
};

const SVG_NS = "http://www.w3.org/2000/svg";
const SOUND_KEY = "chalk-sound";

type Mark = { el: HTMLElement; path: SVGPathElement; kind: MarkKind; seed: number; tone: string; len: number; p: number };
type Writing = { el: HTMLElement; text: HTMLElement; arrows: SVGPathElement[]; tone: string; p: number };

/**
 * Everything that moves, opted into with data attributes:
 *   data-mark      a chalk underline, double underline, box or circle, drawn as you scroll past
 *   data-write     handwriting (and its arrow) written on as you scroll past
 *   data-draw      figure strokes that draw themselves
 *   data-hero      the title page, revealed in order on load
 *   data-reveal    figures and tables that settle in on entry
 *   data-autoplay  videos that play only while on screen
 *
 * Chalk keeps what it has written: scrolling back up never erases it.
 */
export default function Motion() {
  useGSAP(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" }, (ctx) => {
      const { motion, fine } = ctx.conditions as Record<string, boolean>;
      const videos = gsap.utils.toArray<HTMLVideoElement>("[data-autoplay]");

      /* ── The chalk layer: one SVG over the whole document for the marks ── */
      const layer = document.createElementNS(SVG_NS, "svg");
      layer.classList.add("chalk-marks");
      layer.setAttribute("aria-hidden", "true");
      document.body.append(layer);

      const marks: Mark[] = gsap.utils.toArray<HTMLElement>("[data-mark]").map((el, i) => {
        const path = document.createElementNS(SVG_NS, "path");
        const tone = CHALK[el.dataset.tone ?? "yellow"] ?? CHALK.yellow;
        path.setAttribute("stroke", tone);
        path.setAttribute("stroke-width", el.dataset.mark === "underline" || el.dataset.mark === "double" ? "2.3" : "1.9");
        layer.append(path);
        return { el, path, kind: (el.dataset.mark as MarkKind) || "underline", seed: i * 7919 + 17, tone, len: 1, p: motion ? 0 : 1 };
      });

      /** Lays one mark out from where its text is right now, keeping how far it has been drawn. */
      const layoutMark = (m: Mark) => {
        const sx = window.scrollX, sy = window.scrollY;
        const lines = [...m.el.getClientRects()]
          .filter((r) => r.width > 2)
          .map((r) => ({ left: r.left + sx, top: r.top + sy, right: r.right + sx, bottom: r.bottom + sy }));
        m.path.setAttribute("d", markPath(m.kind, lines, m.seed));
        m.len = m.path.getTotalLength() || 1;
        m.path.style.strokeDasharray = `${m.len}`;
        m.path.style.strokeDashoffset = `${m.len * (1 - m.p)}`;
      };
      const layoutMarks = () => {
        layer.setAttribute("width", String(document.documentElement.scrollWidth));
        layer.setAttribute("height", String(document.documentElement.scrollHeight));
        marks.forEach(layoutMark);
      };
      layoutMarks();

      if (!motion) {
        // Without motion everything is simply already written.
        root.classList.add("is-ready");
        videos.forEach((v) => (v.controls = true));
        const relayout = new ResizeObserver(() => layoutMarks());
        relayout.observe(document.body);
        const onView = () => layoutMarks();
        window.addEventListener("viewchange", onView);
        return () => {
          relayout.disconnect();
          window.removeEventListener("viewchange", onView);
          layer.remove();
          videos.forEach((v) => (v.controls = false));
        };
      }

      /* ── Dust and sound ── */
      const canvas = document.createElement("canvas");
      canvas.className = "chalk-dust";
      canvas.setAttribute("aria-hidden", "true");
      document.body.append(canvas);
      const dust = new Dust(canvas);
      const sound = new ChalkSound();

      let wantSound = false;
      try {
        wantSound = localStorage.getItem(SOUND_KEY) === "1";
      } catch {}
      // Browsers only allow sound after the reader does something; start it on the first touch or key.
      const wake = () => {
        if (wantSound) sound.enable();
      };
      window.addEventListener("pointerdown", wake, { once: true });
      window.addEventListener("keydown", wake, { once: true });
      const onSound = (e: Event) => {
        wantSound = (e as CustomEvent<boolean>).detail;
        if (wantSound) sound.enable();
        else sound.disable();
      };
      window.addEventListener("chalksound", onSound);

      let last = 0;
      const tickChalk = (time: number) => {
        const dt = last ? Math.min(0.05, time - last) : 0.016;
        last = time;
        dust.step(dt);
        sound.step(dt);
      };
      gsap.ticker.add(tickChalk);
      const onResize = () => dust.resize();
      window.addEventListener("resize", onResize);

      /** Advances a mark to `p` (never back), shedding dust at the chalk's tip. */
      const drawMark = (m: Mark, p: number, quiet = false) => {
        if (p <= m.p) return;
        // Measure again while drawing: fonts and the title entrance can move text after the first layout.
        layoutMark(m);
        const moved = (p - m.p) * m.len;
        m.p = p;
        m.path.style.strokeDashoffset = `${m.len * (1 - p)}`;
        if (quiet || moved < 0.5) return;
        const tip = m.path.getPointAtLength(p * m.len);
        dust.emit(tip.x, tip.y, moved / 7, m.tone);
        sound.scratch(moved);
      };

      for (const m of marks) {
        ScrollTrigger.create({
          trigger: m.el,
          start: "top 86%",
          end: "top 56%",
          onUpdate: (self) => drawMark(m, self.progress),
          onRefresh: (self) => drawMark(m, self.progress, true),
        });
      }

      /* ── Handwriting: written left to right as you scroll, arrow first ── */
      const clip = (el: HTMLElement, p: number) => (el.style.clipPath = `inset(-25% ${((1 - p) * 102).toFixed(2)}% -25% -3%)`);
      const writings: Writing[] = gsap.utils
        .toArray<HTMLElement>("[data-write]")
        .filter((el) => !el.classList.contains("title"))
        .map((el) => {
          const text = (el.querySelector("p") ?? el) as HTMLElement;
          const arrows = gsap.utils.toArray<SVGPathElement>("[data-draw]", el);
          arrows.forEach((a) => {
            a.style.strokeDasharray = "1";
            a.style.strokeDashoffset = "1";
          });
          clip(text, 0);
          return { el, text, arrows, tone: getComputedStyle(el).color, p: 0 };
        });

      const write = (w: Writing, p: number, quiet = false) => {
        if (p <= w.p) return;
        const prev = w.p;
        w.p = p;
        const hasArrow = w.arrows.length > 0;
        const ap = hasArrow ? Math.min(1, p / 0.3) : 1;
        const tp = hasArrow ? Math.max(0, (p - 0.25) / 0.75) : p;
        const tpPrev = hasArrow ? Math.max(0, (prev - 0.25) / 0.75) : prev;
        w.arrows.forEach((a) => (a.style.strokeDashoffset = `${1 - ap}`));
        // Once fully written, drop the clip so nothing (italic overhangs, long words) is cut.
        if (tp >= 1) w.text.style.clipPath = "none";
        else clip(w.text, tp);
        if (quiet) return;
        const sx = window.scrollX, sy = window.scrollY;
        if (hasArrow && ap < 1) {
          const a = w.arrows[0], ctm = a.getScreenCTM();
          if (ctm) {
            const q = a.getPointAtLength(ap * a.getTotalLength()).matrixTransform(ctm);
            dust.emit(q.x + sx, q.y + sy, 0.8, w.tone);
            sound.scratch(10);
          }
        }
        if (tp > tpPrev) {
          const r = w.text.getBoundingClientRect();
          const moved = (tp - tpPrev) * r.width;
          dust.emit(r.left + tp * r.width + sx, r.top + sy + r.height * (0.25 + Math.random() * 0.6), moved / 9, w.tone);
          sound.scratch(moved);
        }
      };

      for (const w of writings) {
        ScrollTrigger.create({
          trigger: w.el,
          start: "top 90%",
          end: "top 64%",
          onUpdate: (self) => write(w, self.progress),
          onRefresh: (self) => write(w, self.progress, true),
        });
      }

      /* Relayout the marks whenever the page moves under them. */
      let relayoutQueued = false;
      const queueLayout = () => {
        if (relayoutQueued) return;
        relayoutQueued = true;
        requestAnimationFrame(() => {
          relayoutQueued = false;
          layoutMarks();
        });
      };
      const relayout = new ResizeObserver(queueLayout);
      relayout.observe(document.body);
      ScrollTrigger.addEventListener("refresh", queueLayout);
      const onView = () => {
        if (root.dataset.view !== "source") queueLayout();
        ScrollTrigger.refresh();
      };
      window.addEventListener("viewchange", onView);

      /* ── Smooth scroll on pointer devices, on the GSAP ticker ── */
      let lenis: Lenis | undefined;
      const tick = (time: number) => lenis?.raf(time * 1000);
      if (fine) {
        lenis = new Lenis({ autoRaf: false, lerp: 0.12 });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }
      const onAnchor = (e: MouseEvent) => {
        const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        const target = a && document.querySelector<HTMLElement>(a.getAttribute("href")!);
        if (!a || !target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.3 });
        else target.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", a.getAttribute("href"));
      };
      document.addEventListener("click", onAnchor);

      /* ── Videos play only while on screen ── */
      const watcher = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const v = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) v.play().catch(() => {});
            else v.pause();
          }
        },
        { threshold: 0.35 },
      );
      videos.forEach((v) => watcher.observe(v));

      /* ── Title page: the name is written on load, then the rest arrives in order ── */
      const title = document.querySelector<HTMLElement>(".title[data-write]");
      const hero = gsap.utils.toArray<HTMLElement>("[data-hero]").filter((el) => el !== title);
      gsap.set(hero, { opacity: 0, y: 10 });
      root.classList.add("is-ready");
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (title) {
        const state = { p: 0 };
        const tone = getComputedStyle(title).color;
        clip(title, 0);
        tl.to(
          state,
          {
            p: 1,
            duration: 1.9,
            ease: "sine.inOut",
            onUpdate: () => {
              const prev = parseFloat(title.dataset.p ?? "0");
              title.dataset.p = String(state.p);
              if (state.p >= 1) title.style.clipPath = "none";
              else clip(title, state.p);
              const r = title.getBoundingClientRect();
              const moved = (state.p - prev) * r.width;
              if (moved > 0) {
                dust.emit(r.left + state.p * r.width + window.scrollX, r.top + window.scrollY + r.height * (0.3 + Math.random() * 0.55), moved / 6, tone);
                sound.scratch(moved);
              }
            },
          },
          0.2,
        );
      }
      tl.to(hero, { opacity: 1, y: 0, duration: 1, stagger: 0.09 }, 1.2);
      // The entrance moves text by a few pixels; lay the marks out again once it has settled.
      tl.call(() => {
        layoutMarks();
        ScrollTrigger.refresh();
      });

      /* ── Figure strokes and reveals ── */
      gsap.utils.toArray<HTMLElement>(".loop").forEach((fig) => {
        const strokes = gsap.utils.toArray<SVGPathElement>("[data-draw]", fig);
        strokes.forEach((s) => gsap.set(s, { strokeDasharray: 1, strokeDashoffset: 1 }));
        ScrollTrigger.create({
          trigger: fig,
          start: "top 80%",
          once: true,
          onEnter: () =>
            strokes.forEach((s, i) =>
              gsap.to(s, { strokeDashoffset: 0, duration: i === strokes.length - 1 ? 1.8 : 0.7, ease: "power2.inOut", delay: i * 0.25 }),
            ),
        });
      });

      gsap.set("[data-reveal]", { opacity: 0, y: 18 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });

      document.fonts.ready.then(() => {
        layoutMarks();
        ScrollTrigger.refresh();
      });

      return () => {
        window.removeEventListener("viewchange", onView);
        window.removeEventListener("chalksound", onSound);
        window.removeEventListener("pointerdown", wake);
        window.removeEventListener("keydown", wake);
        window.removeEventListener("resize", onResize);
        ScrollTrigger.removeEventListener("refresh", queueLayout);
        relayout.disconnect();
        watcher.disconnect();
        videos.forEach((v) => v.pause());
        document.removeEventListener("click", onAnchor);
        gsap.ticker.remove(tick);
        gsap.ticker.remove(tickChalk);
        lenis?.destroy();
        sound.disable();
        layer.remove();
        canvas.remove();
      };
    });
  });

  return null;
}

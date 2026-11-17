"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CHALK: Record<string, string> = {
  yellow: "#f0d27c",
  pink: "#ee9fae",
  blue: "#93c6e6",
  green: "#a8d59c",
};

/**
 * Everything that moves, opted into with data attributes:
 *   data-write     handwriting that is written on, left to right
 *   data-draw      chalk strokes that draw themselves (arrows, figure axes)
 *   data-mark      a rough chalk underline, circle or box around a phrase
 *   data-hero      the title page, revealed in order on load
 *   data-reveal    figures and tables that settle in on entry
 *   data-autoplay  videos that play only while on screen
 */
export default function Motion() {
  useGSAP(() => {
    const root = document.documentElement;
    const marks: RoughAnnotation[] = [];
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" }, (ctx) => {
      const { motion, fine } = ctx.conditions as Record<string, boolean>;
      const videos = gsap.utils.toArray<HTMLVideoElement>("[data-autoplay]");

      // Chalk annotations: drawn as they come into view, or shown at once without motion.
      const markEls = gsap.utils.toArray<HTMLElement>("[data-mark]");
      for (const el of markEls) {
        const a = annotate(el, {
          type: (el.dataset.mark as "underline" | "circle" | "box") ?? "underline",
          color: CHALK[el.dataset.tone ?? "yellow"],
          strokeWidth: el.dataset.mark === "underline" ? 2 : 1.6,
          padding: el.dataset.mark === "circle" ? [4, 10] : el.dataset.mark === "box" ? 3 : 1,
          animate: motion,
          animationDuration: 700,
          iterations: 2,
          multiline: true,
        });
        marks.push(a);
        if (!motion) a.show();
        else ScrollTrigger.create({ trigger: el, start: "top 82%", once: true, onEnter: () => a.show() });
      }
      // Re-measure when the reader switches between the page and its source.
      const onView = () => {
        if (root.dataset.view === "source") marks.forEach((m) => m.hide());
        else marks.forEach((m) => m.isShowing() || m.show());
        ScrollTrigger.refresh();
      };
      window.addEventListener("viewchange", onView);

      if (!motion) {
        root.classList.add("is-ready");
        videos.forEach((v) => (v.controls = true));
        return () => {
          window.removeEventListener("viewchange", onView);
          videos.forEach((v) => (v.controls = false));
        };
      }

      /* Smooth scroll on pointer devices, on the GSAP ticker. */
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

      /* Videos play only while on screen. */
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

      /* Handwriting: revealed left to right at about a writing pace. */
      const write = (el: HTMLElement, delay = 0) => {
        const chars = (el.textContent ?? "").length;
        return gsap.fromTo(
          el,
          { clipPath: "inset(-20% 100% -20% -2%)" },
          { clipPath: "inset(-20% -2% -20% -2%)", duration: Math.min(2.2, 0.35 + chars * 0.045), ease: "sine.inOut", delay },
        );
      };
      const drawStroke = (path: SVGPathElement, delay = 0, duration = 0.8) =>
        gsap.fromTo(path, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration, ease: "power2.inOut", delay });

      /* Title page, in the order a reader takes it in. */
      const title = document.querySelector<HTMLElement>(".title[data-write]");
      const hero = gsap.utils.toArray<HTMLElement>("[data-hero]").filter((el) => el !== title);
      gsap.set(hero, { opacity: 0, y: 10 });
      root.classList.add("is-ready");
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (title) tl.add(write(title), 0.15);
      tl.to(hero, { opacity: 1, y: 0, duration: 1, stagger: 0.09 }, 0.9);

      /* Everything below: written, drawn or settled in as it arrives. */
      gsap.utils.toArray<HTMLElement>("[data-write]").forEach((el) => {
        if (el === title) return;
        const strokes = gsap.utils.toArray<SVGPathElement>("[data-draw]", el);
        const text = el.querySelector("p") ?? el;
        gsap.set(text, { clipPath: "inset(-20% 100% -20% -2%)" });
        strokes.forEach((s) => gsap.set(s, { strokeDasharray: 1, strokeDashoffset: 1 }));
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            strokes.forEach((s) => drawStroke(s, 0, 0.6));
            write(text as HTMLElement, strokes.length ? 0.35 : 0);
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".loop").forEach((fig) => {
        const strokes = gsap.utils.toArray<SVGPathElement>("[data-draw]", fig);
        strokes.forEach((s) => gsap.set(s, { strokeDasharray: 1, strokeDashoffset: 1 }));
        ScrollTrigger.create({
          trigger: fig,
          start: "top 80%",
          once: true,
          onEnter: () => strokes.forEach((s, i) => drawStroke(s, i * 0.25, i === strokes.length - 1 ? 1.8 : 0.7)),
        });
      });

      gsap.set("[data-reveal]", { opacity: 0, y: 18 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });

      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener("viewchange", onView);
        watcher.disconnect();
        videos.forEach((v) => v.pause());
        document.removeEventListener("click", onAnchor);
        gsap.ticker.remove(tick);
        lenis?.destroy();
      };
    });

    return () => marks.forEach((m) => m.remove());
  });

  return null;
}

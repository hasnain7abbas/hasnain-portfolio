"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const EXPO = "expo.out";

/**
 * All scroll and load motion for the page, in one place so the sections stay
 * plain markup. Elements opt in with data attributes:
 *   data-hero      the load sequence
 *   data-split     masked line reveal on headings
 *   data-reveal    rise-and-fade on entry, batched and staggered
 *   data-parallax  scroll-linked drift inside a .frame
 *   data-pipeline  the pinned, scrubbed stage track
 *   data-autoplay  videos that play only while on screen
 */
export default function Motion() {
  useGSAP(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        pinned: "(min-width: 900px) and (min-height: 640px)",
        fine: "(hover: hover) and (pointer: fine)",
      },
      (ctx) => {
        const { motion, pinned, fine } = ctx.conditions as Record<string, boolean>;
        const videos = gsap.utils.toArray<HTMLVideoElement>("[data-autoplay]");

        if (!motion) {
          // Nothing moves: show everything, and hand the videos their own controls.
          root.classList.add("is-ready");
          videos.forEach((v) => (v.controls = true));
          return () => videos.forEach((v) => (v.controls = false));
        }

        /* Smooth scroll, driven by the GSAP ticker so there is one RAF loop. Off on touch. */
        let lenis: Lenis | undefined;
        const tick = (time: number) => lenis?.raf(time * 1000);
        if (fine) {
          lenis = new Lenis({ autoRaf: false, lerp: 0.11 });
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
          // Handy when checking scroll positions by hand in development.
          if (process.env.NODE_ENV !== "production") Object.assign(window, { __lenis: lenis });
        }
        const onAnchor = (e: MouseEvent) => {
          const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
          const target = a && document.querySelector<HTMLElement>(a.getAttribute("href")!);
          if (!a || !target) return;
          e.preventDefault();
          if (lenis) lenis.scrollTo(target, { offset: -64, duration: 1.4 });
          else target.scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", a.getAttribute("href"));
        };
        document.addEventListener("click", onAnchor);

        /* Videos play only while they are on screen. */
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

        /* Entry reveals. */
        gsap.set("[data-reveal]", { opacity: 0, y: 26 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: EXPO, stagger: 0.08, overwrite: true }),
        });

        /* Scroll-linked drift on framed media. */
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        /* The pinned stage track. */
        const pin = document.querySelector<HTMLElement>("[data-pipeline-pin]");
        const track = document.querySelector<HTMLElement>("[data-pipeline-track]");
        const bar = document.querySelector<HTMLElement>("[data-pipeline-bar]");
        if (pinned && pin && track && bar) {
          const stages = gsap.utils.toArray<HTMLElement>("[data-stage]", track);
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => `+=${distance() + window.innerHeight * 0.4}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          tl.to(track, { x: () => -distance(), ease: "none", duration: 1 }, 0)
            .fromTo(bar, { scaleX: 0.04 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
          stages.slice(1).forEach((stage, i) => {
            tl.fromTo(
              stage,
              { opacity: 0.28 },
              { opacity: 1, ease: "power2.out", duration: 0.25 },
              (i / stages.length) * 0.9,
            );
          });
        } else if (bar) {
          gsap.set(bar, { scaleX: 1 });
        }

        /* Hero: leaves at different speeds as the page scrolls away from it. */
        const hero = document.querySelector<HTMLElement>("[data-hero-section]");
        if (hero) {
          const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
          gsap.to("[data-hero=title]", { yPercent: -18, ease: "none", scrollTrigger: st });
          gsap.to("[data-hero=fig]", { y: -70, ease: "none", scrollTrigger: st });
          gsap.to("[data-hero=meta]", { opacity: 0, ease: "none", scrollTrigger: { ...st, end: "40% top" } });
        }

        /* Fig. 1: the tracer follows the sinusoidal sweep, so it slows at the turning points on its own. */
        const loop = document.querySelector<SVGSVGElement>("[data-loop]");
        const tracer = loop?.querySelector<SVGCircleElement>("[data-tracer]");
        let trace: gsap.core.Tween | undefined;
        if (loop && tracer) {
          const n = (k: string) => Number(loop.dataset[k]);
          const sweep = { t: 0 };
          gsap.set(tracer, { opacity: 0 });
          trace = gsap.to(sweep, {
            t: Math.PI * 2,
            duration: 9,
            ease: "none",
            repeat: -1,
            paused: true,
            onUpdate: () => {
              const v = Math.sin(sweep.t);
              const c = v * (n("g0") + n("g1") * Math.cos(sweep.t));
              tracer.setAttribute("cx", (n("cx") + v * n("rx")).toFixed(2));
              tracer.setAttribute("cy", (n("cy") - c * n("ry")).toFixed(2));
            },
          });
          ScrollTrigger.create({
            trigger: loop,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => (self.isActive ? trace!.resume() : trace!.pause()),
          });
        }

        /* Everything that splits text waits for the real fonts. */
        let cancelled = false;
        const splits: SplitText[] = [];
        document.fonts.ready.then(() => {
          if (cancelled) return;
          ctx.add(() => {
            // Hero load sequence: name first, then the figure draws while the copy arrives.
            const title = document.querySelector<HTMLElement>("[data-hero=title]");
            if (title) {
              const lines = gsap.utils.toArray<HTMLElement>(".line", title);
              lines.forEach((line) => {
                line.style.overflow = "clip";
                line.innerHTML = `<span style="display:block">${line.innerHTML}</span>`;
              });
              title.setAttribute("aria-label", lines.map((line) => line.textContent).join(" "));
              const inner = lines.map((line) => line.firstElementChild);
              const tl = gsap.timeline({ defaults: { ease: EXPO } });
              tl.set("[data-hero]", { visibility: "visible" })
                .add(() => root.classList.add("is-ready"))
                .from("[data-hero=meta]", { opacity: 0, duration: 1.2 }, 0.1)
                .from(inner, { yPercent: 108, duration: 1.5, stagger: 0.14 }, 0.15)
                .from("[data-hero=item]", { opacity: 0, y: 28, duration: 1.2, stagger: 0.12 }, 0.75)
                .from("[data-hero=fig] .tick, [data-hero=fig] .axis-label", { opacity: 0, duration: 0.8 }, 0.7)
                .fromTo("[data-draw]:not([data-draw=loop])", { strokeDasharray: 1, strokeDashoffset: 1 },
                  { strokeDashoffset: 0, duration: 1.1, stagger: 0.12 }, 0.7)
                .fromTo("[data-draw=loop]", { strokeDashoffset: 1 },
                  { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }, 1.05)
                .from("[data-hero=fig] figcaption", { opacity: 0, duration: 1 }, 1.6)
                .to("[data-tracer]", { opacity: 1, duration: 0.6 }, 2.9);
            } else {
              root.classList.add("is-ready");
            }

            // Section headings: lines rise out of their own masks.
            gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
              splits.push(
                SplitText.create(el, {
                  type: "lines",
                  mask: "lines",
                  linesClass: "split-line",
                  autoSplit: true,
                  onSplit: (self) =>
                    gsap.from(self.lines, {
                      yPercent: 105,
                      duration: 1.3,
                      ease: EXPO,
                      stagger: 0.09,
                      scrollTrigger: { trigger: el, start: "top 86%", once: true },
                    }),
                }),
              );
            });
            ScrollTrigger.refresh();
          });
        });

        return () => {
          cancelled = true;
          splits.forEach((s) => s.revert());
          trace?.kill();
          watcher.disconnect();
          videos.forEach((v) => v.pause());
          document.removeEventListener("click", onAnchor);
          gsap.ticker.remove(tick);
          lenis?.destroy();
        };
      },
    );
  });

  return null;
}

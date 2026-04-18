"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { aboutText } from "@/lib/data";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading — clip-path sweep reveal */}
        <motion.h2
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-text-primary mb-8 sm:mb-12"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {/* Text column — staggered slide-from-left */}
          <div className="md:col-span-2 space-y-4 order-2 md:order-1">
            {/* First paragraph */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-text-secondary leading-relaxed"
            >
              {aboutText[0]}
            </motion.p>

            {/* Second paragraph — self-taught narrative with mentor links */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-text-secondary leading-relaxed"
            >
              On the software side, I&apos;m entirely self-taught — no CS
              degree, no bootcamp, no classroom. Whenever I hit a wall, I turn
              to my younger brother{" "}
              <a
                href="https://saqlainabbas.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors"
              >
                Saqlain Abbas
              </a>
              , an AI graduate and professional developer, who has been my go-to
              teacher since day one. He proved that the best education happens
              outside lecture halls. From
              Rust and Tauri desktop apps to Next.js web applications, I taught
              myself to code driven by curiosity and stubbornness — and with a
              brother patient enough to answer my questions at 2 AM.
            </motion.p>

            {/* Third paragraph */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-text-secondary leading-relaxed"
            >
              {aboutText[2]}
            </motion.p>

            {/* Mentor cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <a
                href="https://saqlainabbas.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-border hover:border-accent transition-all duration-300"
              >
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  <span className="text-accent font-medium">
                    Saqlain Abbas
                  </span>{" "}
                  — Younger Brother &amp; Teacher
                </span>
                <ExternalLink
                  size={14}
                  className="text-text-secondary/50 group-hover:text-accent transition-colors shrink-0"
                />
              </a>
            </motion.div>
          </div>

          {/* Photo — blur-to-focus reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ y: photoY }}
            className="flex items-start justify-center order-1 md:order-2"
          >
            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl border-2 border-border overflow-hidden shadow-lg group relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="./hasnain.jpg"
                alt="Hasnain Abbas"
                width={320}
                height={320}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

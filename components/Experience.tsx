"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experiences } from "@/lib/data";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  /* The timeline line draws in sync with scroll */
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="experience" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        {/* Heading — slide up with blur fade */}
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-text-primary mb-8 sm:mb-12"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line — scroll-linked draw */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-6 top-0 w-px bg-accent/40 origin-top"
          />

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? -40 : -20,
                  rotate: i % 2 === 0 ? -1 : 0.5,
                }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-10 md:pl-16"
              >
                {/* Timeline node — pulse pop */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                  className="absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background shadow-[0_0_8px_rgba(217,119,6,0.3)]"
                />

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-4 md:p-5 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1">
                    <h3 className="text-sm sm:text-base md:text-lg font-mono font-semibold text-text-primary">
                      {exp.role}
                    </h3>
                    <span className="text-xs sm:text-sm text-accent font-mono">
                      {exp.date}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-accent/80 mb-2">{exp.place}</p>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {exp.detail}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

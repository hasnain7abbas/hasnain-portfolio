"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} id="projects" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      {/* Subtle background gradient that fades in on scroll */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading — letter-spacing expand */}
        <motion.h2
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          whileInView={{ opacity: 1, letterSpacing: "0em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-text-primary mb-8 sm:mb-12"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 60, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformPerspective: 800 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group block p-4 sm:p-5 md:p-6 rounded-xl bg-surface border border-border hover:border-accent/50 hover:shadow-[0_0_24px_rgba(217,119,6,0.1)] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base sm:text-lg font-mono font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-text-secondary">
                  {project.featured && (
                    <Star size={16} className="text-accent fill-accent" />
                  )}
                  <ExternalLink
                    size={16}
                    className="group-hover:text-accent transition-colors"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded bg-background text-text-secondary border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <a
            href="https://github.com/hasnain7abbas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors font-medium text-sm sm:text-base"
          >
            View All on GitHub &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}

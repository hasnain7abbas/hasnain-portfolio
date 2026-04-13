"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-12"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group block p-6 rounded-xl bg-surface border border-border hover:border-accent/50 hover:shadow-[0_0_20px_rgba(217,119,6,0.1)] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-mono font-semibold text-text-primary group-hover:text-accent transition-colors">
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
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/hasnain7abbas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors font-medium"
          >
            View All on GitHub &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}

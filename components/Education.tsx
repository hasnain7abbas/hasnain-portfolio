"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-12"
        >
          Education
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-surface border border-border"
            >
              <GraduationCap
                size={24}
                className="text-accent mb-4"
              />
              <h3 className="text-lg font-mono font-semibold text-text-primary mb-1">
                {edu.degree}
              </h3>
              <p className="text-sm text-text-secondary mb-2">
                {edu.institution}
              </p>
              <p className="text-sm text-accent font-mono">{edu.date}</p>
              {edu.note && (
                <p className="text-sm text-text-secondary mt-2">{edu.note}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

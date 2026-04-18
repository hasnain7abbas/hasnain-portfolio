"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/data";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease,
    },
  }),
};

export default function Education() {
  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading — scale from small with blur */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-text-primary mb-8 sm:mb-12"
        >
          Education
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              whileHover={{ y: -6 }}
              className="p-4 sm:p-5 md:p-6 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors duration-300"
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 12 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="mb-3 sm:mb-4"
              >
                {edu.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={edu.logo}
                    alt={edu.institution}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded"
                  />
                ) : (
                  <GraduationCap size={24} className="text-accent" />
                )}
              </motion.div>
              <h3 className="text-sm sm:text-base md:text-lg font-mono font-semibold text-text-primary mb-1">
                {edu.degree}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mb-2">
                {edu.institution}
              </p>
              <p className="text-xs sm:text-sm text-accent font-mono">{edu.date}</p>
              {edu.note && (
                <p className="text-xs sm:text-sm text-text-secondary mt-2">{edu.note}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { physicsSkills, devSkills } from "@/lib/data";

/* Spring pop with slight rotation */
const pillVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -8 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

function SkillGroup({
  title,
  skills,
  delay,
}: {
  title: string;
  skills: string[];
  delay: number;
}) {
  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay * 0.5 }}
        className="text-lg sm:text-xl font-mono font-semibold text-text-primary mb-5 sm:mb-6"
      >
        {title}
      </motion.h3>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.04, delayChildren: delay }}
        className="flex flex-wrap gap-2 sm:gap-2.5"
      >
        {skills.map((skill) => (
          <motion.span
            key={skill}
            variants={pillVariants}
            whileHover={{ scale: 1.08, y: -2 }}
            className="px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full bg-surface border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingX = useTransform(scrollYProgress, [0, 0.3], [-30, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        {/* Heading — scroll-linked slide in */}
        <motion.h2
          style={{ x: headingX, opacity: headingOpacity }}
          className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-text-primary mb-8 sm:mb-12"
        >
          Skills
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <SkillGroup title="Physics & Lab" skills={physicsSkills} delay={0} />
          <SkillGroup title="Software & Dev" skills={devSkills} delay={0.2} />
        </div>
      </div>
    </section>
  );
}

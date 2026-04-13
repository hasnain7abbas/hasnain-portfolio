"use client";

import { motion } from "framer-motion";
import { physicsSkills, devSkills } from "@/lib/data";

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
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
      <h3 className="text-xl font-mono font-semibold text-text-primary mb-6">
        {title}
      </h3>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.04, delayChildren: delay }}
        className="flex flex-wrap gap-3"
      >
        {skills.map((skill) => (
          <motion.span
            key={skill}
            variants={pillVariants}
            transition={{ duration: 0.3 }}
            className="px-4 py-2 text-sm rounded-full bg-surface border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-12"
        >
          Skills
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <SkillGroup
            title="Physics & Lab"
            skills={physicsSkills}
            delay={0}
          />
          <SkillGroup
            title="Software & Dev"
            skills={devSkills}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}

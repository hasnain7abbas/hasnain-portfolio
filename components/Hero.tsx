"use client";

import { motion } from "framer-motion";
import { Mail, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { siteConfig } from "@/lib/data";
import ParticleBackground from "./ParticleBackground";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center z-10 px-6"
      >
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-mono font-bold text-text-primary mb-4"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-text-secondary mb-2 max-w-2xl mx-auto"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.p
          variants={item}
          className="text-sm text-text-secondary mb-8"
        >
          {siteConfig.shortBio}
        </motion.p>

        <motion.div variants={item} className="flex gap-4 justify-center mb-8">
          <a
            href="#projects"
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-white transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="flex gap-5 justify-center text-text-secondary"
        >
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={22} />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={22} />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 text-text-secondary hover:text-accent transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Mail, ChevronDown } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  RedditIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
} from "./icons";
import { siteConfig } from "@/lib/data";
import ParticleBackground from "./ParticleBackground";

/* ── Animation variants ── */

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

/* Name: dramatic blur-to-focus with scale */
const nameReveal = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(20px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease },
  },
};

/* Body text: blur + slide up */
const blurUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

/* Social icons: spring-based pop with stagger */
const socialContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      opacity: { duration: 0.3 },
    },
  },
};

const socialPop = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

const socials = [
  { href: siteConfig.github, icon: <GithubIcon size={22} />, label: "GitHub" },
  { href: siteConfig.linkedin, icon: <LinkedinIcon size={22} />, label: "LinkedIn" },
  { href: siteConfig.instagram, icon: <InstagramIcon size={22} />, label: "Instagram" },
  { href: siteConfig.reddit, icon: <RedditIcon size={22} />, label: "Reddit" },
  { href: siteConfig.facebook, icon: <FacebookIcon size={22} />, label: "Facebook" },
  { href: siteConfig.whatsapp, icon: <WhatsappIcon size={22} />, label: "WhatsApp" },
  { href: `mailto:${siteConfig.email}`, icon: <Mail size={22} />, label: "Email" },
];

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
        {/* Name — blur-to-focus reveal */}
        <motion.h1
          variants={nameReveal}
          className="text-3xl sm:text-5xl md:text-7xl font-mono font-bold text-text-primary mb-3 sm:mb-4"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          variants={blurUp}
          className="text-sm sm:text-lg md:text-xl text-text-secondary mb-1.5 sm:mb-2 max-w-2xl mx-auto"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.p
          variants={blurUp}
          className="text-xs sm:text-sm text-text-secondary mb-6 sm:mb-8"
        >
          {siteConfig.shortBio}
        </motion.p>

        {/* CTA buttons — stack on very small screens */}
        <motion.div
          variants={blurUp}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 w-full max-w-sm sm:max-w-none mx-auto"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 sm:px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors text-center text-sm sm:text-base"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#blog"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 sm:px-6 py-3 border border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-white transition-colors text-center text-sm sm:text-base"
          >
            Read Blog
          </motion.a>
        </motion.div>

        {/* Social icons — spring pop stagger */}
        <motion.div
          variants={socialContainer}
          className="flex flex-wrap gap-4 sm:gap-5 justify-center text-text-secondary"
        >
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={
                social.href.startsWith("mailto:") ? undefined : "_blank"
              }
              rel={
                social.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              variants={socialPop}
              whileHover={{ scale: 1.2, y: -2 }}
              className="hover:text-accent transition-colors p-1"
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — delayed appearance */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 text-text-secondary hover:text-accent transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.a>
    </section>
  );
}

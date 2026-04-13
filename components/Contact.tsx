"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { siteConfig } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-surface/50">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-4"
        >
          Get in Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary mb-12 max-w-lg mx-auto"
        >
          Whether you want to discuss physics, collaborate on a project, or just
          say hello — I&apos;d love to hear from you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-surface border border-border hover:border-accent transition-colors group"
            >
              <Mail
                size={20}
                className="text-accent"
              />
              <span className="text-text-secondary group-hover:text-text-primary transition-colors">
                {siteConfig.email}
              </span>
            </a>

            <div className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-surface border border-border">
              <MapPin size={20} className="text-accent" />
              <span className="text-text-secondary">{siteConfig.location}</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-surface border border-border hover:border-accent text-text-secondary hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={22} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-surface border border-border hover:border-accent text-text-secondary hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={22} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="p-3 rounded-lg bg-surface border border-border hover:border-accent text-text-secondary hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

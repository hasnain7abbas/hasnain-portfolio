"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, MessageCircle, CheckCircle, ArrowRight } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  RedditIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
} from "./icons";
import { siteConfig } from "@/lib/data";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<"email" | "whatsapp" | null>(null);

  const handleEmailSend = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const subject = name.trim()
      ? `Message from ${name.trim()} via Portfolio`
      : "Message via Portfolio";
    const body = [
      name.trim() ? `From: ${name.trim()}` : "",
      email.trim() ? `Reply to: ${email.trim()}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent("email");
    setTimeout(() => setSent(null), 3000);
  };

  const handleWhatsAppSend = () => {
    if (!message.trim()) return;

    const parts = [
      name.trim() ? `Hi, I'm ${name.trim()}.` : "",
      email.trim() ? `(Email: ${email.trim()})` : "",
      message,
    ]
      .filter(Boolean)
      .join(" ");
    const phone = siteConfig.whatsapp.replace("https://wa.me/", "");
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(parts)}`,
      "_blank"
    );
    setSent("whatsapp");
    setTimeout(() => setSent(null), 3000);
  };

  const socialLinks = [
    { href: siteConfig.github, icon: <GithubIcon size={20} />, label: "GitHub" },
    { href: siteConfig.linkedin, icon: <LinkedinIcon size={20} />, label: "LinkedIn" },
    { href: siteConfig.instagram, icon: <InstagramIcon size={20} />, label: "Instagram" },
    { href: siteConfig.reddit, icon: <RedditIcon size={20} />, label: "Reddit" },
    { href: siteConfig.facebook, icon: <FacebookIcon size={20} />, label: "Facebook" },
    { href: siteConfig.whatsapp, icon: <WhatsappIcon size={20} />, label: "WhatsApp" },
    { href: `mailto:${siteConfig.email}`, icon: <Mail size={20} />, label: "Email" },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface/50">
      <div className="max-w-4xl mx-auto">
        {/* Heading — fade up with blur */}
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-text-primary mb-3 sm:mb-4 text-center"
        >
          Get in Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm sm:text-base text-text-secondary mb-8 sm:mb-12 max-w-lg mx-auto text-center"
        >
          Have something to say? Drop me a message — it goes straight to my
          email or WhatsApp.
        </motion.p>

        {/* ── Two-column layout: form + info ── */}
        <div className="grid md:grid-cols-5 gap-6 sm:gap-8">
          {/* Left: Message Form (takes 3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-3 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-surface border border-border"
          >
            <form onSubmit={handleEmailSend} className="space-y-4 sm:space-y-5">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs sm:text-sm font-medium text-text-secondary mb-1.5 sm:mb-2"
                  >
                    Your Name{" "}
                    <span className="text-text-secondary/50">(optional)</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-background border border-border text-text-primary text-sm placeholder:text-text-secondary/40 outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(217,119,6,0.12)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs sm:text-sm font-medium text-text-secondary mb-1.5 sm:mb-2"
                  >
                    Your Email{" "}
                    <span className="text-text-secondary/50">(optional)</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-background border border-border text-text-primary text-sm placeholder:text-text-secondary/40 outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(217,119,6,0.12)]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs sm:text-sm font-medium text-text-secondary mb-1.5 sm:mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows={5}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-background border border-border text-text-primary text-sm placeholder:text-text-secondary/40 resize-none outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(217,119,6,0.12)]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors cursor-pointer"
                >
                  <Send size={16} />
                  Send via Email
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleWhatsAppSend}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-[#25D366] text-white font-medium text-sm hover:bg-[#20BD5A] transition-colors cursor-pointer"
                >
                  <MessageCircle size={16} />
                  Send via WhatsApp
                </motion.button>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center justify-center gap-2 text-xs sm:text-sm text-accent"
                  >
                    <CheckCircle size={14} />
                    {sent === "email"
                      ? "Opening your email client..."
                      : "Opening WhatsApp..."}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right: Contact info + socials (takes 2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-2 flex flex-col gap-4 sm:gap-5"
          >
            {/* Email card */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center gap-3 p-4 sm:p-5 rounded-xl bg-surface border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-text-secondary mb-0.5">Email</p>
                <p className="text-sm text-text-primary group-hover:text-accent transition-colors truncate">
                  {siteConfig.email}
                </p>
              </div>
              <ArrowRight size={14} className="text-text-secondary/40 group-hover:text-accent transition-colors ml-auto shrink-0" />
            </a>

            {/* Location card */}
            <div className="flex items-center gap-3 p-4 sm:p-5 rounded-xl bg-surface border border-border">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-text-secondary mb-0.5">Location</p>
                <p className="text-sm text-text-primary">
                  {siteConfig.location}
                </p>
              </div>
            </div>

            {/* WhatsApp direct card */}
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-4 sm:p-5 rounded-xl bg-surface border border-border hover:border-[#25D366]/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <WhatsappIcon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-text-secondary mb-0.5">WhatsApp</p>
                <p className="text-sm text-text-primary group-hover:text-[#25D366] transition-colors">
                  Chat directly
                </p>
              </div>
              <ArrowRight size={14} className="text-text-secondary/40 group-hover:text-[#25D366] transition-colors ml-auto shrink-0" />
            </a>

            {/* Social icons grid */}
            <div className="pt-2">
              <p className="text-xs text-text-secondary mb-3">Find me on</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social, i) => (
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
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.35 + i * 0.05,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    whileHover={{ scale: 1.15, y: -2 }}
                    className="p-2.5 rounded-lg bg-background border border-border hover:border-accent text-text-secondary hover:text-accent transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { blogPosts, siteConfig } from "@/lib/data";

const postVariants = {
  hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Blog() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<"email" | "whatsapp" | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEmailSend = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const subject = name.trim()
      ? `Blog comment from ${name.trim()}`
      : "Blog comment via Portfolio";
    const body = name.trim()
      ? `From: ${name.trim()}\n\n${message}`
      : message;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent("email");
    setTimeout(() => setSent(null), 3000);
  };

  const handleWhatsAppSend = () => {
    if (!message.trim()) return;

    const text = name.trim()
      ? `Hi, I'm ${name.trim()}. Blog comment: ${message}`
      : `Blog comment: ${message}`;
    const phone = siteConfig.whatsapp.replace("https://wa.me/", "");
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setSent("whatsapp");
    setTimeout(() => setSent(null), 3000);
  };

  return (
    <section id="blog" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading — horizontal line expand */}
        <motion.h2
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-text-primary mb-3 sm:mb-4"
        >
          Blog
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm sm:text-base text-text-secondary mb-8 sm:mb-12 max-w-2xl"
        >
          Thoughts on physics, code, and everything in between.
        </motion.p>

        {/* Blog posts — staggered slide from left */}
        <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              custom={i}
              variants={postVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              className="group rounded-xl sm:rounded-2xl bg-surface border border-border hover:border-accent/40 transition-colors duration-300 overflow-hidden"
            >
              <div className="p-4 sm:p-5 md:p-6">
                {/* Date + tags row */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 text-xs text-text-secondary">
                    <Calendar size={12} className="opacity-60" />
                    {post.date}
                  </span>
                  <span className="text-border">|</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedId === post.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 sm:pt-4 border-t border-border/50 mt-3 sm:mt-4">
                        <p className="text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed">
                          {post.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Read more toggle */}
                <button
                  onClick={() => toggleExpand(post.id)}
                  className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-xs sm:text-sm text-accent hover:text-accent-hover transition-colors cursor-pointer min-h-[44px]"
                >
                  {expandedId === post.id ? (
                    <>
                      Read less <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      Read more <ChevronDown size={14} />
                    </>
                  )}
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Comment / Message form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h3 className="text-lg sm:text-xl font-mono font-semibold text-text-primary mb-2">
            Leave a Comment
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary mb-4 sm:mb-6">
            Your message goes straight to my inbox or WhatsApp.
          </p>

          <div className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-surface border border-border">
            <form onSubmit={handleEmailSend} className="space-y-3 sm:space-y-4">
              <div>
                <label
                  htmlFor="blog-name"
                  className="block text-xs sm:text-sm font-medium text-text-secondary mb-1.5"
                >
                  Name{" "}
                  <span className="text-text-secondary/50">(optional)</span>
                </label>
                <input
                  id="blog-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-background border border-border text-text-primary text-sm placeholder:text-text-secondary/40 outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(217,119,6,0.12)]"
                />
              </div>

              <div>
                <label
                  htmlFor="blog-message"
                  className="block text-xs sm:text-sm font-medium text-text-secondary mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="blog-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-background border border-border text-text-primary text-sm placeholder:text-text-secondary/40 resize-none outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(217,119,6,0.12)]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors cursor-pointer"
                >
                  <Send size={15} />
                  Send via Email
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleWhatsAppSend}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-[#25D366] text-white font-medium text-sm hover:bg-[#20BD5A] transition-colors cursor-pointer"
                >
                  <MessageCircle size={15} />
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}

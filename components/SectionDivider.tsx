"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="flex justify-center py-2">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 64, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
    </div>
  );
}

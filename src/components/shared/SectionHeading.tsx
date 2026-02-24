"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-neon-cyan whitespace-nowrap">
        {title}
      </h2>
      <div className="h-[1px] w-full bg-gradient-to-r from-neon-cyan/50 to-transparent" />
    </motion.div>
  );
}

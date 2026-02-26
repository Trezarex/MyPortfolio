"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Experience() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <SectionHeading title="Experience" />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-purple opacity-30" />

        <div className="space-y-12">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-8 ${
                  // On mobile: always left-aligned. On desktop: alternating.
                  "md:flex-row"
                }`}
              >
                {/* Desktop: left side content */}
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  {isLeft && <TimelineCard exp={exp} />}
                </div>

                {/* Dot on the line */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-night-900 border-2 border-neon-cyan box-glow-cyan" />
                </div>

                {/* Desktop: right side content */}
                <div className="hidden md:block w-1/2 pl-12">
                  {!isLeft && <TimelineCard exp={exp} />}
                </div>

                {/* Mobile: always show on right of line */}
                <div className="md:hidden pl-12">
                  <TimelineCard exp={exp} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TimelineCard({ exp }: { exp: (typeof experiences)[0] }) {
  return (
    <div className="glass rounded-2xl p-5 md:p-6 border border-white/5 hover:border-neon-cyan/20 transition-all duration-300 text-left">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-neon-cyan font-heading font-bold text-lg">
          {exp.company}
        </span>
        <span className="px-2 py-0.5 text-[10px] font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded-full">
          {exp.type}
        </span>
      </div>

      <p className="text-text-primary font-heading font-medium">{exp.role}</p>

      <p className="text-text-muted text-xs font-mono mt-1">
        {exp.startDate} — {exp.endDate} &middot; {exp.location}
      </p>

      <ul className="mt-3 space-y-1.5">
        {exp.description.map((desc, i) => (
          <li key={i} className="text-text-secondary text-sm flex gap-2">
            <span className="text-neon-cyan mt-1.5 shrink-0">&#9656;</span>
            <span>{desc}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-4">
        {exp.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-[10px] font-mono bg-neon-purple/10 text-neon-purple border border-neon-purple/20 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

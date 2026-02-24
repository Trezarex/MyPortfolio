"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Tree silhouette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] md:h-[400px] opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 400 350"
          fill="currentColor"
          className="w-full h-full text-neon-cyan/30"
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Trunk */}
          <rect x="190" y="200" width="20" height="150" fill="currentColor" />
          {/* Canopy layers */}
          <polygon points="200,20 120,160 280,160" />
          <polygon points="200,60 100,200 300,200" />
          <polygon points="200,100 80,240 320,240" />
          {/* Ground */}
          <ellipse cx="200" cy="348" rx="180" ry="8" opacity="0.3" />
        </svg>
      </div>

      {/* Fog gradient at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-night-900 via-night-900/60 to-transparent pointer-events-none z-10" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-20 text-center space-y-6"
      >
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-text-secondary font-mono text-sm md:text-base tracking-widest uppercase"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.05, delayChildren: 0.5 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-neon-cyan text-glow-cyan"
        >
          {personalInfo.name.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              transition={{ duration: 0.4 }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Title with shimmer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl font-heading text-shimmer"
        >
          {personalInfo.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-text-secondary text-base md:text-lg max-w-md mx-auto"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-neon-cyan/50 text-neon-cyan rounded-lg font-mono text-sm tracking-wider uppercase hover:bg-neon-cyan/10 hover:box-glow-cyan active:scale-95 transition-all duration-300"
          >
            View Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan rounded-lg font-mono text-sm tracking-wider uppercase hover:bg-neon-cyan/20 active:scale-95 transition-all duration-300"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="flex items-center justify-center gap-4 pt-2"
        >
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-neon-cyan hover:scale-110 transition-all duration-300"
          >
            <FaGithub size={22} />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-neon-cyan hover:scale-110 transition-all duration-300"
          >
            <FaLinkedin size={22} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-12 z-20 text-neon-cyan/40 hover:text-neon-cyan transition-colors"
        aria-label="Scroll down"
      >
        <HiArrowDown size={24} />
      </motion.button>
    </div>
  );
}

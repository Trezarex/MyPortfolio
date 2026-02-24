"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <SectionHeading title="Projects" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-6"
      >
        {/* Featured projects — larger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <TiltCard project={project} featured />
            </motion.div>
          ))}
        </div>

        {/* Other projects */}
        {other.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {other.map((project) => (
              <motion.div key={project.id} variants={cardVariants}>
                <TiltCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function TiltCard({
  project,
  featured = false,
}: {
  project: (typeof projects)[0];
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -5;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovering(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        handleMouseMove(e);
        setHovering(true);
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovering ? "none" : "transform 0.4s ease-out",
      }}
      className={`glass rounded-2xl border border-white/5 hover:border-neon-cyan/30 transition-colors duration-300 ${
        featured ? "p-6 md:p-8" : "p-5 md:p-6"
      }`}
    >
      {/* Spotlight gradient */}
      {hovering && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-10"
          style={{
            background: `radial-gradient(circle at ${
              ((tilt.y + 5) / 10) * 100
            }% ${((tilt.x + 5) / 10) * 100}%, rgba(0,240,255,0.4), transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3
            className={`font-heading font-bold text-text-primary ${
              featured ? "text-xl md:text-2xl" : "text-lg"
            }`}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub`}
              className="text-text-muted hover:text-neon-cyan transition-colors p-1"
            >
              <FaGithub size={18} />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} demo`}
                className="text-text-muted hover:text-neon-cyan transition-colors p-1"
              >
                <FaExternalLinkAlt size={14} />
              </a>
            )}
          </div>
        </div>

        <p
          className={`text-text-secondary leading-relaxed ${
            featured ? "text-sm md:text-base" : "text-sm"
          }`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

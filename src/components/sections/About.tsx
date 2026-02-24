"use client";

import { motion } from "framer-motion";
import { personalInfo, achievements } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaTrophy,
  FaGithub,
  FaBriefcase,
  FaQuoteLeft,
} from "react-icons/fa";
import { testimonial } from "@/lib/data";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className={`glass rounded-2xl p-5 md:p-6 border border-white/5 hover:border-neon-cyan/20 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <SectionHeading title="About Me" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5"
      >
        {/* Bio card — large */}
        <GlassCard className="md:col-span-2 md:row-span-2">
          <p className="text-text-primary leading-relaxed text-sm md:text-base">
            {personalInfo.bio}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Python", "React", "Node.js", "AWS", "Docker", "PostgreSQL"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded-full"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </GlassCard>

        {/* Location */}
        <GlassCard>
          <FaMapMarkerAlt className="text-neon-magenta mb-3" size={20} />
          <p className="text-text-muted text-xs font-mono uppercase tracking-wider">
            Location
          </p>
          <p className="text-text-primary font-heading text-lg mt-1">
            {personalInfo.location}
          </p>
        </GlassCard>

        {/* Current Role */}
        <GlassCard>
          <FaBriefcase className="text-neon-green mb-3" size={20} />
          <p className="text-text-muted text-xs font-mono uppercase tracking-wider">
            Current Role
          </p>
          <p className="text-text-primary font-heading text-lg mt-1">
            Full-Stack Dev
          </p>
          <p className="text-text-secondary text-xs mt-1">@ Inside The Box</p>
        </GlassCard>

        {/* Education */}
        <GlassCard>
          <FaGraduationCap className="text-neon-gold mb-3" size={20} />
          <p className="text-text-muted text-xs font-mono uppercase tracking-wider">
            Education
          </p>
          <p className="text-text-primary font-heading text-lg mt-1">
            B.Sc. Data Science
          </p>
          <p className="text-text-secondary text-xs mt-1">
            Sharda University &middot; 8.65 CGPA
          </p>
        </GlassCard>

        {/* GitHub */}
        <GlassCard>
          <FaGithub className="text-neon-cyan mb-3" size={20} />
          <p className="text-text-muted text-xs font-mono uppercase tracking-wider">
            GitHub
          </p>
          <p className="text-neon-cyan font-heading text-3xl font-bold mt-1">
            366+
          </p>
          <p className="text-text-secondary text-xs mt-1">
            contributions last year
          </p>
        </GlassCard>

        {/* Achievements */}
        <GlassCard className="md:col-span-2">
          <FaTrophy className="text-neon-gold mb-3" size={20} />
          <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-3">
            Competitive Programming
          </p>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((a) => (
              <div key={a.label}>
                <p className="text-neon-cyan font-heading text-xl font-bold">
                  {a.value}
                </p>
                <p className="text-text-secondary text-xs">
                  {a.label} &middot; {a.year}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Testimonial */}
        <GlassCard className="md:col-span-2">
          <FaQuoteLeft className="text-neon-purple mb-3 opacity-50" size={18} />
          <p className="text-text-secondary text-sm italic leading-relaxed">
            &ldquo;{testimonial.text}&rdquo;
          </p>
          <div className="mt-3">
            <p className="text-text-primary text-sm font-heading">
              {testimonial.name}
            </p>
            <p className="text-text-muted text-xs">{testimonial.role}</p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

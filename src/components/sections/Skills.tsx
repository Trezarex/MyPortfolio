"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  FaCode,
  FaPalette,
  FaServer,
  FaDatabase,
  FaCloud,
  FaChartBar,
  FaBrain,
  FaSpider,
} from "react-icons/fa";
import { cn } from "@/lib/utils";

interface CategoryStyle {
  icon: React.ReactNode;
  iconClass: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  badgeHover: string;
}

const categoryStyles: Record<string, CategoryStyle> = {
  Languages: {
    icon: <FaCode />,
    iconClass: "text-neon-cyan",
    badgeBg: "bg-neon-cyan/10",
    badgeText: "text-neon-cyan",
    badgeBorder: "border-neon-cyan/20",
    badgeHover: "hover:bg-neon-cyan/20",
  },
  Frontend: {
    icon: <FaPalette />,
    iconClass: "text-neon-magenta",
    badgeBg: "bg-neon-magenta/10",
    badgeText: "text-neon-magenta",
    badgeBorder: "border-neon-magenta/20",
    badgeHover: "hover:bg-neon-magenta/20",
  },
  Backend: {
    icon: <FaServer />,
    iconClass: "text-neon-green",
    badgeBg: "bg-neon-green/10",
    badgeText: "text-neon-green",
    badgeBorder: "border-neon-green/20",
    badgeHover: "hover:bg-neon-green/20",
  },
  Databases: {
    icon: <FaDatabase />,
    iconClass: "text-neon-gold",
    badgeBg: "bg-neon-gold/10",
    badgeText: "text-neon-gold",
    badgeBorder: "border-neon-gold/20",
    badgeHover: "hover:bg-neon-gold/20",
  },
  "Cloud & DevOps": {
    icon: <FaCloud />,
    iconClass: "text-neon-purple",
    badgeBg: "bg-neon-purple/10",
    badgeText: "text-neon-purple",
    badgeBorder: "border-neon-purple/20",
    badgeHover: "hover:bg-neon-purple/20",
  },
  "Big Data": {
    icon: <FaChartBar />,
    iconClass: "text-neon-cyan",
    badgeBg: "bg-neon-cyan/10",
    badgeText: "text-neon-cyan",
    badgeBorder: "border-neon-cyan/20",
    badgeHover: "hover:bg-neon-cyan/20",
  },
  "AI / ML": {
    icon: <FaBrain />,
    iconClass: "text-neon-magenta",
    badgeBg: "bg-neon-magenta/10",
    badgeText: "text-neon-magenta",
    badgeBorder: "border-neon-magenta/20",
    badgeHover: "hover:bg-neon-magenta/20",
  },
  Scraping: {
    icon: <FaSpider />,
    iconClass: "text-neon-green",
    badgeBg: "bg-neon-green/10",
    badgeText: "text-neon-green",
    badgeBorder: "border-neon-green/20",
    badgeHover: "hover:bg-neon-green/20",
  },
};

const defaultStyle: CategoryStyle = {
  icon: <FaCode />,
  iconClass: "text-neon-cyan",
  badgeBg: "bg-neon-cyan/10",
  badgeText: "text-neon-cyan",
  badgeBorder: "border-neon-cyan/20",
  badgeHover: "hover:bg-neon-cyan/20",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function Skills() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <SectionHeading title="Skills" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {skills.map((cat) => {
          const style = categoryStyles[cat.category] || defaultStyle;
          return (
            <motion.div
              key={cat.category}
              variants={itemVariants}
              className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={cn("text-lg", style.iconClass)}>
                  {style.icon}
                </span>
                <h3 className="font-heading font-semibold text-text-primary text-sm">
                  {cat.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className={cn(
                      "px-2.5 py-1 text-xs font-mono rounded-lg border transition-colors cursor-default",
                      style.badgeBg,
                      style.badgeText,
                      style.badgeBorder,
                      style.badgeHover
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

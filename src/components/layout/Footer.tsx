import { personalInfo } from "@/lib/data";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const socialIcons = [
  { icon: FaGithub, href: personalInfo.social.github, label: "GitHub" },
  { icon: FaLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
  { icon: FaTwitter, href: personalInfo.social.twitter, label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm font-mono">
          Built by{" "}
          <span className="text-neon-cyan">{personalInfo.name}</span>
        </p>
        <div className="flex items-center gap-4">
          {socialIcons.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted hover:text-neon-cyan transition-colors duration-300"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

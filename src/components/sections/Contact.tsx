"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const socialLinks = [
  { icon: FaGithub, href: personalInfo.social.github, label: "GitHub" },
  { icon: FaLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
  { icon: FaTwitter, href: personalInfo.social.twitter, label: "Twitter" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbyuR8My5ZL-kkX-G3HlUqGEffJlmHdWww-5g5KMmnZdgAW7REBc2iCOXh7hP68lhS4M-Q/exec", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status !== 200) throw new Error(data.message);

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <SectionHeading title="Contact" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 md:p-8 border border-white/5 space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-text-secondary text-sm font-mono mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 transition-all duration-300 font-body text-sm"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-text-secondary text-sm font-mono mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 transition-all duration-300 font-body text-sm"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-text-secondary text-sm font-mono mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 transition-all duration-300 font-body text-sm resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 flex items-center justify-center gap-2 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan rounded-lg font-mono text-sm uppercase tracking-wider hover:bg-neon-cyan/20 hover:box-glow-cyan active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane size={14} />
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Sent!"
              : status === "error"
              ? "Try Again"
              : "Send Message"}
          </button>
        </motion.form>

        {/* Info side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">
              Let&apos;s build something
              <span className="text-shimmer"> amazing</span> together.
            </h3>
            <p className="text-text-secondary leading-relaxed text-sm">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision. Feel free to reach out!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-neon-cyan/20 flex items-center justify-center text-neon-cyan shrink-0">
                <FaEnvelope size={16} />
              </div>
              <div>
                <p className="text-text-muted text-xs font-mono">Email</p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-text-primary text-sm hover:text-neon-cyan transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-neon-cyan/20 flex items-center justify-center text-neon-cyan shrink-0">
                <FaMapMarkerAlt size={16} />
              </div>
              <div>
                <p className="text-text-muted text-xs font-mono">Location</p>
                <p className="text-text-primary text-sm">
                  {personalInfo.location}
                </p>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div>
            <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-3">
              Find me on
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:border-neon-cyan hover:text-neon-cyan hover:box-glow-cyan transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

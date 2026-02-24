"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const handleMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!visible) setVisible(true);
  }, [visible]);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isTouchDevice, handleMove]);

  useEffect(() => {
    if (isTouchDevice) return;

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    const addListeners = () => {
      document
        .querySelectorAll('a, button, [role="button"], input, textarea')
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    // Run initially and on DOM changes
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed w-2 h-2 bg-neon-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "tween", duration: 0 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed w-8 h-8 border border-neon-cyan/40 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: hovering ? 1.8 : 1,
          opacity: visible ? 0.8 : 0,
          borderColor: hovering
            ? "rgba(0, 240, 255, 0.6)"
            : "rgba(0, 240, 255, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </>
  );
}

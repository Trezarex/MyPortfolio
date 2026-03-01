"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const W = 60;
const H = 60;
const GRIP_X = 30;
const GRIP_Y = 56;

type Smash = { id: number; x: number; y: number };

const SPARK_DIRS = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return { dx: Math.cos(a) * 48, dy: Math.sin(a) * 48 };
});

// Lightning bolt paths extending outward from the hammer head (SVG overflow:visible)
const BOLT_PATHS = [
  "M30 2 L27 -9 L31 -9 L25 -22",   // top-center
  "M6 10 L-1 4 L3 3 L-5 -7",        // top-left
  "M54 10 L61 4 L57 3 L65 -7",      // top-right
];

function Mjolnir({ lightningKey }: { lightningKey: number }) {
  return (
    <svg
      width={W}
      height={H}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      {/* Hammer head */}
      <rect x="3" y="2" width="54" height="22" rx="5" fill="#8B9299" stroke="#5A6270" strokeWidth="1.5" />
      {/* Head top highlight */}
      <rect x="5" y="4" width="50" height="7" rx="3" fill="rgba(255,255,255,0.16)" />
      {/* Center band on head */}
      <rect x="21" y="2" width="18" height="22" fill="#75808A" />
      {/* Gold lightning bolt engraving */}
      <path d="M33 6 L29 15 L32.5 15 L27 24 L34 12 L30.5 12 Z" fill="#FFD700" />
      {/* Neck / collar */}
      <rect x="23" y="23" width="14" height="6" rx="2" fill="#5A6270" stroke="#4B5563" strokeWidth="1" />
      {/* Handle */}
      <rect x="26" y="28" width="8" height="28" rx="3" fill="#7B4F2E" stroke="#4A2E1A" strokeWidth="1" />
      {/* Leather wraps */}
      <rect x="26" y="32" width="8" height="3" rx="1" fill="#9B6745" opacity="0.75" />
      <rect x="26" y="39" width="8" height="3" rx="1" fill="#9B6745" opacity="0.75" />
      <rect x="26" y="46" width="8" height="3" rx="1" fill="#9B6745" opacity="0.75" />
      {/* End cap */}
      <rect x="25" y="54" width="10" height="4" rx="2" fill="#5A3520" />

      {/* Electric lightning arcs — flicker in/out */}
      {lightningKey > 0 && (
        <motion.g
          key={lightningKey}
          stroke="#7DF9FF"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.3, 1, 0.05, 0.9, 0] }}
          transition={{
            duration: 0.5,
            times: [0, 0.1, 0.28, 0.45, 0.6, 0.78, 1],
            ease: "easeOut",
          }}
        >
          {BOLT_PATHS.map((d, i) => (
            <path key={i} d={d} />
          ))}
          {/* Glow dots at bolt origins */}
          <circle cx="30" cy="2" r="2" fill="#7DF9FF" opacity="0.8" />
          <circle cx="6"  cy="10" r="1.5" fill="#7DF9FF" opacity="0.7" />
          <circle cx="54" cy="10" r="1.5" fill="#7DF9FF" opacity="0.7" />
        </motion.g>
      )}
    </svg>
  );
}

export default function Cursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [visible, setVisible] = useState(false);
  const [smashes, setSmashes] = useState<Smash[]>([]);
  const [lightningKey, setLightningKey] = useState(0);
  const [glowing, setGlowing] = useState(false);

  const visibleRef = useRef(false);
  const prevPos = useRef({ x: 0, y: 0 });
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const sx = useSpring(rawX, { stiffness: 200, damping: 26 });
  const sy = useSpring(rawY, { stiffness: 200, damping: 26 });

  const hammerX = useTransform(sx, (v) => v - GRIP_X);
  const hammerY = useTransform(sy, (v) => v - GRIP_Y);

  const targetRot = useMotionValue(0);
  const rotation = useSpring(targetRot, { stiffness: 80, damping: 10 });

  const triggerLightning = () => {
    setLightningKey((k) => k + 1);
    setGlowing(true);
    setTimeout(() => setGlowing(false), 520);
  };

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    document.body.style.cursor = "none";
    return () => { document.body.style.cursor = ""; };
  }, [isTouchDevice]);

  // Random idle lightning every 2–5 seconds
  useEffect(() => {
    if (isTouchDevice) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        triggerLightning();
        schedule();
      }, 2000 + Math.random() * 3000);
    };
    schedule();
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;
    const move = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      rawX.set(e.clientX);
      rawY.set(e.clientY);

      if (speed > 4) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        targetRot.set(angle + 90);
        if (resetTimer.current) clearTimeout(resetTimer.current);
      } else {
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => targetRot.set(0), 220);
      }

      prevPos.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isTouchDevice, rawX, rawY, targetRot]);

  useEffect(() => {
    if (isTouchDevice) return;
    const down = (e: MouseEvent) => {
      const id = Date.now();
      setSmashes((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setSmashes((prev) => prev.filter((s) => s.id !== id)), 700);

      // Slam + lightning on every click
      triggerLightning();
      targetRot.set(targetRot.get() + 65);
      setTimeout(() => targetRot.set(0), 280);
    };
    window.addEventListener("mousedown", down);
    return () => window.removeEventListener("mousedown", down);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouchDevice, targetRot]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Smash effects */}
      {smashes.map((s) => (
        <motion.div
          key={s.id}
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{ x: s.x, y: s.y }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 24,
              height: 24,
              x: -12,
              y: -12,
              border: "2px solid rgba(255, 215, 0, 0.95)",
              boxShadow: "0 0 8px rgba(255,215,0,0.6)",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 5, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {SPARK_DIRS.map((dir, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: i % 2 === 0 ? "#FFD700" : "#7DF9FF" }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: dir.dx, y: dir.dy, opacity: 0, scale: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.012 }}
            />
          ))}
        </motion.div>
      ))}

      {/* Mjolnir */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: hammerX,
          y: hammerY,
          rotate: rotation,
          transformOrigin: `${GRIP_X}px ${GRIP_Y}px`,
          width: W,
          height: H,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          filter: glowing
            ? "drop-shadow(0 0 10px rgba(125,249,255,0.9)) drop-shadow(0 0 4px rgba(255,215,0,0.5))"
            : "drop-shadow(0 0 4px rgba(255,215,0,0.35))",
        }}
        transition={{
          opacity: { duration: 0.3 },
          filter: { duration: 0.15 },
        }}
      >
        <Mjolnir lightningKey={lightningKey} />
      </motion.div>
    </>
  );
}

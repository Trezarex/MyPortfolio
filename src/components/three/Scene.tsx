"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import StarField from "./StarField";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Scene() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={isMobile ? 1 : 1.5}
      >
        <Suspense fallback={null}>
          <StarField count={isMobile ? 1500 : 4000} />
          <ambientLight intensity={0.1} />
        </Suspense>
      </Canvas>

      {/* Nebula gradient overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_50%_20%,rgba(181,55,242,0.15),transparent_60%),radial-gradient(ellipse_at_80%_60%,rgba(0,240,255,0.08),transparent_50%)]" />
    </div>
  );
}

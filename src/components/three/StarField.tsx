"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function StarField({ count = 4000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Random position inside a sphere
      const r = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Slight color variation (blue-white-warm)
      const temp = Math.random();
      if (temp < 0.6) {
        // White-ish
        col[i * 3] = 0.85 + Math.random() * 0.15;
        col[i * 3 + 1] = 0.85 + Math.random() * 0.15;
        col[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      } else if (temp < 0.85) {
        // Blue-ish
        col[i * 3] = 0.5 + Math.random() * 0.3;
        col[i * 3 + 1] = 0.6 + Math.random() * 0.3;
        col[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      } else {
        // Warm (gold/yellow)
        col[i * 3] = 0.9 + Math.random() * 0.1;
        col[i * 3 + 1] = 0.7 + Math.random() * 0.2;
        col[i * 3 + 2] = 0.3 + Math.random() * 0.3;
      }

      sz[i] = Math.random() * 1.5 + 0.3;
    }

    return [pos, col, sz];
  }, [count]);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015;
      ref.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

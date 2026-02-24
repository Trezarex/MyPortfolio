"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});

export default function SceneWrapper() {
  return <Scene />;
}

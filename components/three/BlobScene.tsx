"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import { GlowBlob } from "./GlowBlob";
import { FloatingParticles } from "./FloatingParticles";
import { VaporPostFX } from "./VaporPostFX";

export function BlobScene({ scrollProgress }: { scrollProgress: number }) {
  const [isVisible, setIsVisible] = useState(true);

  // Optimisation: stop rendering when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-10 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ background: "var(--color-bg-primary)" }}
      >
        <Suspense fallback={null}>
          <CameraRig scrollProgress={scrollProgress} />
          
          <ambientLight intensity={0.1} />
          <pointLight position={[3, 3, 3]} color="#ff3366" intensity={4} />
          <pointLight position={[-4, -2, 2]} color="#cc88ff" intensity={2} />
          <pointLight position={[0, -3, 4]} color="#ff99cc" intensity={3} />
          
          <GlowBlob scrollProgress={scrollProgress} />
          <FloatingParticles />
          
          <VaporPostFX />
        </Suspense>
      </Canvas>
    </div>
  );
}

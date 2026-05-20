"use client";

import { useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, HueSaturation } from "@react-three/postprocessing";

export function VaporPostFX() {
  const { gl } = useThree();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const isMobile = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPower = gl.capabilities.maxTextureSize < 4096;

    if (isMobile || prefersReducedMotion || isLowPower) {
      setEnabled(false);
    }
  }, [gl]);

  const offset = useMemo(() => new THREE.Vector2(0.0008, 0.0008), []);

  if (!enabled) return null;

  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={1.4}
        mipmapBlur={true}
        radius={0.8}
      />
      <ChromaticAberration
        offset={offset}
        radialModulation={true}
        modulationOffset={0.5}
      />
      <Vignette
        offset={0.3}
        darkness={0.7}
        eskil={false}
      />
      <HueSaturation
        hue={0.02}
        saturation={0.15}
      />
    </EffectComposer>
  );
}

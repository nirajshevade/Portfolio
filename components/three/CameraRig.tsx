"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  useFrame((state) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      state.camera.position.set(0, 0, 5);
      state.camera.lookAt(0, 0, 0);
      return;
    }

    const t = state.clock.elapsedTime;

    // Slow orbital drift
    state.camera.position.x += (Math.sin(t * 0.12) * 1.2 - state.camera.position.x) * 0.02;
    state.camera.position.y += (Math.cos(t * 0.09) * 0.6 - state.camera.position.y) * 0.02;

    // Scroll-driven push
    const zOffset = THREE.MathUtils.lerp(6.0, 4.5, isNaN(scrollProgress) ? 0 : scrollProgress);
    const targetZ = zOffset + Math.sin(t * 0.07) * 0.4;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.02;

    // Always look at origin
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Detect mobile performance cap
  const isMobile = typeof navigator !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);
  const count = isMobile ? 120 : 200;

  const { positions, speeds, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Randomly distributed in a sphere of radius 6
      const r = 6 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      spd[i] = 0.01 + Math.random() * 0.02; // speed
      phs[i] = Math.random() * Math.PI * 2; // phase
    }

    return { positions: pos, speeds: spd, phases: phs };
  }, [count]);

  useFrame((state) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Float upward
      positions[i3 + 1] += speeds[i];
      if (positions[i3 + 1] > 4) {
        positions[i3 + 1] = -4;
      }

      // Gentle x/z drift
      positions[i3 + 0] += Math.sin(t + phases[i]) * 0.005;
      positions[i3 + 2] += Math.cos(t + phases[i]) * 0.005;

      // Repelled from center (aura effect)
      const dist = Math.sqrt(
        positions[i3 + 0] ** 2 + 
        positions[i3 + 1] ** 2 + 
        positions[i3 + 2] ** 2
      );
      
      if (dist < 2.5 && dist > 0.01) {
        const force = (2.5 - dist) * 0.01;
        positions[i3 + 0] += (positions[i3 + 0] / dist) * force;
        positions[i3 + 1] += (positions[i3 + 1] / dist) * force;
        positions[i3 + 2] += (positions[i3 + 2] / dist) * force;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffaacc"
        transparent={true}
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}

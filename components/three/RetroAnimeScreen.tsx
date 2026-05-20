"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function RetroAnimeScreen({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const lastUpdate = useRef(0);
  const currentFrame = useRef(0);

  // Image sequence refs
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const FRAME_COUNT = 59; // 00 to 58
  const FRAME_DELAY = 0.066; // ~15fps

  // Setup canvas
  useMemo(() => {
    if (typeof window === "undefined") return;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    canvasRef.current = canvas;
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    textureRef.current = tex;

    // Preload sequence
    const loadImages = () => {
      const imgs: HTMLImageElement[] = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const indexStr = i.toString().padStart(2, "0");
        img.src = `/animation/frame_${indexStr}_delay-0.066s.webp`;
        imgs.push(img);
      }
      imagesRef.current = imgs;
    };
    
    loadImages();
  }, []);

  useFrame((state) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Update according to frame delay
    if (state.clock.elapsedTime - lastUpdate.current < FRAME_DELAY) return;
    lastUpdate.current = state.clock.elapsedTime;

    const canvas = canvasRef.current;
    const tex = textureRef.current;
    const images = imagesRef.current;
    if (!canvas || !tex || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[currentFrame.current];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      currentFrame.current = (currentFrame.current + 1) % FRAME_COUNT;
      tex.needsUpdate = true;
    }

    if (groupRef.current) {
      const t = Math.min(scrollProgress / 0.3, 1.0);
      const targetScale = THREE.MathUtils.lerp(0.4, 1.0, isNaN(t) ? 0 : t);
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating Hologram Animation */}
      <mesh position={[0, 0.1, 1.6]}>
        <planeGeometry args={[1.8, 1.8]} />
        {textureRef.current && (
          <meshBasicMaterial 
            map={textureRef.current} 
            side={THREE.DoubleSide} 
            transparent={true}
            depthWrite={false}
          />
        )}
      </mesh>
    </group>
  );
}

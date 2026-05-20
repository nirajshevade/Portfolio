"use client";

import { useRef, useEffect, useCallback } from "react";
import { useScrollFrame } from "./useScrollFrame";
import { useImagePreloader } from "./useImagePreloader";
import { useMotionValueEvent } from "framer-motion";
import { ScrollContext } from "./ScrollContext";

export function ScrollyCanvas({ 
  children,
  frameCount = 120,
  pathResolver,
  containerHeight = "500vh",
  className = "w-full bg-[var(--color-canvas-match)]",
  stickyClassName = "h-screen",
  canvasClassName = "absolute inset-0 w-full h-full"
}: { 
  children?: React.ReactNode;
  frameCount?: number;
  pathResolver?: (index: number) => string;
  containerHeight?: string;
  className?: string;
  stickyClassName?: string;
  canvasClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const defaultPathResolver = useCallback((index: number) => {
    return `/sequences/frame_${index.toString().padStart(3, "0")}_delay-0.066s.webp`;
  }, []);

  const resolvePath = pathResolver || defaultPathResolver;

  const { images, isReady, loadProgress } = useImagePreloader(frameCount, resolvePath);
  const { frameIndex, scrollProgress } = useScrollFrame(containerRef, frameCount);

  const draw = useCallback((index: number) => {
    if (!isReady || !canvasRef.current || !images[index]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];

    // Handle devicePixelRatio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Scale context to ensure correct drawing operations
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Cover-fit logic
    const scale = Math.max(
      rect.width / img.naturalWidth,
      rect.height / img.naturalHeight
    );
    const x = (rect.width - img.naturalWidth * scale) / 2;
    const y = (rect.height - img.naturalHeight * scale) / 2;

    ctx.drawImage(
      img,
      x,
      y,
      img.naturalWidth * scale,
      img.naturalHeight * scale
    );
  }, [isReady, images]);

  // Redraw on frame index change
  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => draw(latest));
  });

  // Redraw on window resize via ResizeObserver
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(() => draw(frameIndex.get()));
    });
    
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [draw, frameIndex]);

  // Initial draw once ready
  useEffect(() => {
    if (isReady) {
      requestAnimationFrame(() => draw(frameIndex.get()));
    }
  }, [isReady, draw, frameIndex]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: containerHeight }}>
      <div className={`sticky top-0 w-full overflow-hidden ${stickyClassName}`}>
        {/* Loading Progress Bar */}
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-[var(--color-bg-primary)]">
            <div className="w-64 h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--color-accent)] transition-all duration-300 ease-out"
                style={{ width: `${loadProgress * 100}%` }}
              />
            </div>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className={`${canvasClassName} will-change-transform`}
          style={{ 
            backgroundColor: "var(--color-canvas-match)",
          }}
        />
        
        {/* Overlay Content */}
        <ScrollContext.Provider value={scrollProgress}>
          {children}
        </ScrollContext.Provider>
      </div>
    </div>
  );
}

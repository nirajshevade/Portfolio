"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring configuration for lag follow (outer ring)
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device has a fine pointer (desktop)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      if (mediaQuery.matches) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseover", handleMouseOver);
      }
    };
  }, [mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <>
      <style>{`
        body, body * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[var(--color-accent)] rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Outer lag ring */}
      <motion.div
        className="fixed top-0 left-0 border border-[var(--color-accent)] rounded-full pointer-events-none z-[99]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
    </>
  );
}

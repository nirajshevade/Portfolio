"use client";

import { motion, useTransform } from "framer-motion";
import { useCanvasScroll } from "../canvas/ScrollContext";
import { cn } from "@/lib/utils";

interface OverlaySectionProps {
  visibleRange: [number, number];
  exitRange?: [number, number];
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  className?: string;
  animateX?: [number, number];
  animateY?: [number, number];
}

export function OverlaySection({
  visibleRange,
  exitRange,
  align = "center",
  children,
  className,
  animateX,
  animateY,
}: OverlaySectionProps) {
  const scrollProgress = useCanvasScroll();

  const startEnter = visibleRange[0];
  const endEnter = visibleRange[1];
  // Default exit is shortly after enter if not explicitly provided
  const startExit = exitRange ? exitRange[0] : endEnter + 0.1;
  const endExit = exitRange ? exitRange[1] : startExit + 0.1;

  const opacity = useTransform(
    scrollProgress,
    [startEnter, endEnter, startExit, endExit],
    [0, 1, 1, 0]
  );

  const x = useTransform(
    scrollProgress, 
    [startEnter, endEnter], 
    animateX || [0, 0]
  );

  const y = useTransform(
    scrollProgress, 
    [startExit, endExit], 
    animateY || [0, 0]
  );

  const alignClass = {
    left: "items-start text-left justify-end pb-32 pl-8 md:pl-24", // lower third left
    center: "items-center justify-center text-center", // full center
    right: "items-end text-right justify-start pt-32 pr-8 md:pr-24", // upper third right
  }[align];

  return (
    <motion.div
      style={{ opacity, x, y }}
      className={cn(
        "absolute inset-0 flex flex-col pointer-events-none",
        alignClass,
        className
      )}
    >
      <div className="pointer-events-auto max-w-4xl w-full">
        {children}
      </div>
    </motion.div>
  );
}

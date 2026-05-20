"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

export function useScrollFrame(
  containerRef: RefObject<HTMLElement | null>,
  frameCount: number
) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex: MotionValue<number> = useTransform(
    scrollYProgress,
    (latest: number) => {
      // Ensure we are strictly between 0 and 1
      const clamped = Math.max(0, Math.min(1, latest));
      // Map to frame index and floor it
      const frame = Math.floor(clamped * (frameCount - 1));
      return Math.min(frameCount - 1, Math.max(0, frame));
    }
  );

  return {
    frameIndex,
    scrollProgress: scrollYProgress,
  };
}

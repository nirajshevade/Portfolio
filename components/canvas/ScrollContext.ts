"use client";

import { createContext, useContext } from "react";
import { MotionValue } from "framer-motion";

export const ScrollContext = createContext<MotionValue<number> | null>(null);

export function useCanvasScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useCanvasScroll must be used within ScrollyCanvas");
  }
  return context;
}

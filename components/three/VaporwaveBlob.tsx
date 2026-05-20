"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { BlobScene } from "./BlobScene";
import { GrainOverlay } from "./GrainOverlay";
import { SectionLabel } from "../ui/SectionLabel";

export default function VaporwaveBlob() {
  const containerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[200vh] bg-[var(--color-bg-primary)]"
      aria-label="Outro"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[var(--color-bg-primary)] flex items-center justify-center">
        {/* Z-index 1: 3D Scene */}
        <BlobScene scrollProgress={progress} />

        {/* Z-index 2: Grain Overlay */}
        <GrainOverlay />

        {/* Z-index 3: Oversized Faded Type */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-[3]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(8rem, 20vw, 18rem)",
            color: "rgba(240, 240, 240, 0.04)",
            letterSpacing: "0.3em",
          }}
        >
          N I R A J
        </div>

        {/* Z-index 4: Section Label */}
        <div className="absolute top-12 left-6 md:left-24 z-[4] pointer-events-none">
          <SectionLabel num="∞" text="SIGNAL" />
        </div>
      </div>
    </section>
  );
}

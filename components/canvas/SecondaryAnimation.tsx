"use client";

import { useCallback } from "react";
import { ScrollyCanvas } from "./ScrollyCanvas";
import { SectionLabel } from "../ui/SectionLabel";

export function SecondaryAnimation() {
  const pathResolver = useCallback((index: number) => {
    return `/animation/frame_${index.toString().padStart(2, "0")}_delay-0.066s.webp`;
  }, []);

  return (
    <section className="relative z-10 bg-[var(--color-bg-primary)] py-24 md:py-32 rounded-t-[2.5rem] mt-[-2.5rem] md:rounded-t-[4rem] md:mt-[-4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex justify-center">
          <SectionLabel num="01" text="PROCESS" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-display font-light mb-16 tracking-tight text-center max-w-2xl mx-auto text-[var(--color-text-primary)]">
          Fluid Iterations
        </h2>

        <div className="max-w-5xl mx-auto relative px-2">
          <ScrollyCanvas 
            frameCount={59}
            pathResolver={pathResolver}
            containerHeight="150vh"
            className="w-full"
            stickyClassName="top-24 aspect-[4/5] md:aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,0,0,0.1)] bg-[#050505]"
            canvasClassName="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

import { OverlaySection } from "./OverlaySection";
import { ArrowDown } from "lucide-react";

export function Overlay() {
  return (
    <>
      {/* SECTION 1 - 0% to 25% */}
      <OverlaySection
        align="center"
        visibleRange={[0, 0.08]}
        exitRange={[0.18, 0.25]}
        animateY={[0, -40]}
      >
        <h1 className="font-display text-[length:var(--text-hero)] font-bold tracking-[-0.02em] leading-[0.9]">
          Niraj Shevade.
        </h1>
        <p className="inline-flex items-center gap-3 font-body text-[length:var(--text-xl)] text-[var(--color-text-primary)] mt-6 font-medium px-5 py-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Full-Stack. DevOps. AI.
        </p>
      </OverlaySection>

      {/* SECTION 2 - 28% to 52% */}
      <OverlaySection
        align="left"
        visibleRange={[0.28, 0.36]}
        exitRange={[0.44, 0.52]}
        animateX={[-60, 0]}
      >
        <h2 className="font-display text-[length:var(--text-2xl)] mb-4">
          I build systems that scale.
        </h2>
        <p className="font-body text-[var(--text-lg)] text-[var(--color-text-secondary)] leading-relaxed">
          <span className="border-b border-[var(--color-accent)] pb-1 text-[var(--color-text-primary)]">
            40% reliability gains.
          </span>
          <br className="mt-4 block content-['']" />
          <span className="border-b border-[var(--color-accent)] pb-1 text-[var(--color-text-primary)] mt-4">
            60% less manual work.
          </span>
        </p>
      </OverlaySection>

      {/* SECTION 3 - 55% to 82% */}
      <OverlaySection
        align="right"
        visibleRange={[0.55, 0.63]}
        exitRange={[0.74, 0.82]}
        animateX={[60, 0]}
      >
        <h2 
          className="font-display text-[length:var(--text-2xl)] mb-4 font-bold"
          style={{
            WebkitTextStroke: "1px rgba(240, 240, 240, 0.4)",
            color: "transparent"
          }}
        >
          Bridging design<br />and engineering.
        </h2>
        <p className="font-body text-[var(--text-lg)] text-[var(--color-text-secondary)]">
          From NLP pipelines to pixel-perfect interfaces.
        </p>
      </OverlaySection>

      {/* SECTION 4 - 85% to 100% */}
      <OverlaySection
        align="center"
        visibleRange={[0.85, 0.92]}
        exitRange={[0.99, 1.0]}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-accent-dim)] border border-[var(--color-border-hover)] text-[var(--color-accent)] font-ui text-[var(--text-sm)] tracking-wide shadow-[0_0_16px_var(--color-accent-dim)] backdrop-blur-md">
            <span>See the work</span>
            <ArrowDown size={16} className="animate-bounce" />
          </div>
        </div>
      </OverlaySection>
    </>
  );
}

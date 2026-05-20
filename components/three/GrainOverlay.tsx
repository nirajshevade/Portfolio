"use client";

export function GrainOverlay() {
  return (
    <div className="grain-overlay" aria-hidden="true">
      <style>{`
        .grain-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E");
          animation: grain-shift 0.12s steps(1) infinite;
        }
        @keyframes grain-shift {
          0%   { transform: translate(0px, 0px) }
          25%  { transform: translate(-2px, 2px) }
          50%  { transform: translate(1px, -1px) }
          75%  { transform: translate(2px, 1px) }
          100% { transform: translate(0px, 0px) }
        }
        @media (prefers-reduced-motion: reduce) {
          .grain-overlay { animation: none; }
        }
      `}</style>
    </div>
  );
}

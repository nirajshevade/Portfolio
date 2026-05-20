import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <article
      className={cn(
        "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-8",
        "transition-all duration-300",
        "hover:border-[var(--color-border-hover)] hover:shadow-[0_0_32px_var(--color-accent-dim)] hover:-translate-y-1",
        className
      )}
      style={{
        backdropFilter: "blur(var(--blur-glass))",
        WebkitBackdropFilter: "blur(var(--blur-glass))",
        transitionTimingFunction: "var(--transition-snappy)",
      }}
    >
      {children}
    </article>
  );
}

export function SectionLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="mb-16 flex flex-col items-start">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-body text-[var(--text-sm)] text-[var(--color-accent)]">
          {num}
        </span>
        <h2 className="font-display text-[var(--text-2xl)] font-bold tracking-tight">
          {text}
        </h2>
      </div>
      <div className="w-24 h-[2px] bg-[var(--color-border)] relative">
        <div className="absolute top-0 left-0 w-8 h-full bg-[var(--color-accent)]"></div>
      </div>
    </div>
  );
}

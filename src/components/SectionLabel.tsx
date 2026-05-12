import { cn } from '@/lib/utils';

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

/** Decorative section header: [01] ── LABEL TEXT */
export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="font-mono text-[10px] text-safety tracking-widest">{index}</span>
      <div className="h-px w-8 bg-safety/35" />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

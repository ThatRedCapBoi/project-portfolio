import { cn } from '@/lib/utils';

interface HalftoneOverlayProps {
  className?: string;
  // dot opacity 0-1 (default 0.10)
  opacity?: number;
  // grid spacing in px (default 20)
  spacing?: number;
}

/**
 * Ben-Day dot halftone pattern as an absolutely-positioned overlay.
 * Place this as the first child of a `relative` container.
 */
export function HalftoneOverlay({
  className,
  opacity = 0.10,
  spacing = 20,
}: HalftoneOverlayProps) {
  const color = `rgba(255, 95, 0, ${opacity})`;

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-[1]', className)}
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(circle, ${color} 1.2px, transparent 1.2px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
      }}
    />
  );
}

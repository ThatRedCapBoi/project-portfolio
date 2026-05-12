import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center font-mono text-[10px] uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'border border-safety/25 text-safety/75 px-2 py-0.5',
        solid: 'bg-safety text-background px-2 py-0.5',
        ghost: 'text-muted-foreground px-0',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base: monospace caps, sharp corners, no focus ring gap
  'inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default:
          'bg-safety text-background hover:bg-safety/85 active:scale-[0.98]',
        outline:
          'border border-safety text-safety hover:bg-safety hover:text-background active:scale-[0.98]',
        ghost:
          'text-muted-foreground hover:text-foreground hover:bg-white/5',
        link: 'text-safety underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-10 px-6',
        sm: 'h-8 px-4 text-[10px]',
        lg: 'h-12 px-8 text-sm',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };

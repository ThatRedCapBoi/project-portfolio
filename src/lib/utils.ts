import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Required by every shadcn/ui component: merges Tailwind classes safely.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

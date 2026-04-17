import { tv } from 'tailwind-variants';

export const skeletonStyles = tv({
  base: 'block bg-skeleton cursor-progress',
  variants: {
    animation: {
      pulse: 'animate-pulse',
      wave: 'animate-wave',
      false: 'animate-none',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      base: 'rounded-base',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
});

import { tv } from 'tailwind-variants';

export const skeletonStyles = tv({
  base: 'block bg-skeleton cursor-progress rounded-md',
  variants: {
    animation: {
      pulse: 'animate-pulse',
      wave: 'animate-wave',
    },
    radius: {
      none: 'rounded-none',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
});

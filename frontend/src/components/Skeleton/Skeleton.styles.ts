import { tv } from 'tailwind-variants';

export const skeletonStyles = tv({
  base: 'block bg-skeleton cursor-progress ',
  variants: {
    animation: {
      pulse: 'animate-pulse',
      wave: 'animate-wave',
    },
    width: {
      full: 'w-full',
    },
    height: {
      full: 'h-full',
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

import { tv } from 'tailwind-variants';

export const infoBoxStyles = tv({
  base: [
    'flex items-center',
    'gap-3',
    'px-5 py-2.5',
    'border',
    'rounded',
    'text-sm',
    'font-normal',
  ],
  variants: {
    variant: {
      info: 'bg-bg-info border-outline-info text-text-info',
      error: 'bg-bg-error border-outline-error text-text-error',
      warning: 'bg-bg-warning border-outline-warning text-text-warning',
      success: 'bg-bg-success border-outline-success text-text-success',
    },
  },
});

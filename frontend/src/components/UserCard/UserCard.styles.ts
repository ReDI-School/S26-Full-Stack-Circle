import { tv } from 'tailwind-variants';

export const UserCardStyles = tv({
  base: [
    'bg-primary text-text-main',
    'p-4',
    'rounded-xl border border-grey-200',
    'flex items-center gap-4',
    'shadow-sm',
    'transition-shadow duration-200',
    'hover:shadow-md',
    'box-border w-full max-w-[400px]',
  ],
  variants: {
    stretch: {
      true: 'w-full',
    },
  },
});

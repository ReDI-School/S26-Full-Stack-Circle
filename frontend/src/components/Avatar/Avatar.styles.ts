import { tv } from 'tailwind-variants';

export const avatarStyles = tv({
  base: [
    'flex',
    'items-center',
    'justify-center',
    'rounded-full',
    'bg-[var(--color-info)]',
    'text-[var(--color-text-inverse)]',
  ],
  variants: {
    size: {
      sm: 'size-8 --text-sm',
      md: 'size-10 --text-base',
      lg: 'size-16  --text-lg',
    },
  },
});

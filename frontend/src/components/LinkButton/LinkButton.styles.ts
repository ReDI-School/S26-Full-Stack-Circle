import { tv } from 'tailwind-variants';

export const linkButtonStyles = tv({
  base: [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-1.5',
    'md:gap-2.5',
    'w-fit',
    'text-base',
    'font-medium',
    'transition-colors',
    'duration-200',
    'hover:underline',
    'underline-offset-4',
    'cursor-pointer',
  ],
  variants: {
    color: {
      primary: ['text-button-primary', 'hover:text-button-primary-hovered'],
      secondary: ['text-button-secondary', 'hover:text-button-secondary-hovered'],
    },
  },
});

export const iconStyles = tv({
  base: ['text-base', 'md:text-lg', 'shrink-0'],
});

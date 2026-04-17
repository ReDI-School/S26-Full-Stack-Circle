import { tv } from 'tailwind-variants';

export const linkButtonStyles = tv({
  base: [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-1.5',
    'md:gap-2.5',
    'w-fit',
    'text-xs',
    'md:text-base',
    'font-medium',
    'text-button-secondary',
    'transition-colors',
    'duration-200',
    'hover:text-button-secondary-hovered',
    'hover:underline',
    'underline-offset-4',
    'cursor-pointer',
  ],
});

export const iconStyles = tv({
  base: ['text-xs', 'md:text-lg', 'shrink-0'],
});

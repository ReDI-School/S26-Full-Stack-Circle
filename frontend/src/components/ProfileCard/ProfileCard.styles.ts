import { tv } from 'tailwind-variants';

export const profileCardStyles = tv({
  base: [
    'w-full',
    'text-text-tertiary',
    'heading-text-tertiary',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'gap-5',

    // Desktop behavior
    'text-center',
    'md:flex-row',
    'md:gap-7',
    'md:text-left',
  ],
});

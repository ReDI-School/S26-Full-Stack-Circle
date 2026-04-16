import { tv } from 'tailwind-variants';

export const profileCardStyles = tv({
  base: [
    'w-full',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'gap-5',
    'text-center',

    // Desktop behavior
    'md:flex-row',
    'md:items-center',
    'md:justify-start',
    'md:gap-7',
    'md:text-left',
  ],
});

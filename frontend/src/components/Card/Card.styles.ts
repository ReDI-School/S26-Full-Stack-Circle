import { tv } from 'tailwind-variants';

export const cardStyles = tv({
  base: [
    'p-4 md:p-6',
    'rounded-xl md:rounded-2xl',
    'bg-white',
    'shadow-sm',
    'overflow-hidden',
    'box-border',

    'border border-transparent',
  ],
  variants: {
    interactive: {
      true: [
        'cursor-pointer',

        'transition-all duration-200',

        'hover:border-gray-200 hover:shadow-md',

        'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-400',
      ],
      false: [],
    },
  },
  defaultVariants: {
    interactive: false,
  },
});

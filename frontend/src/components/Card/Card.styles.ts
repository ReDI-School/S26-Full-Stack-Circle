import { tv } from 'tailwind-variants';

export const cardStyles = tv({
  base: [
    'rounded-base',
    'p-7.5',
    'bg-white',
    'shadow-[0px_1px_2px_0px_#00000026]',
    'overflow-hidden',
    'box-border',
    'border border-transparent',
    'transition-all duration-200',
    'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-400',
  ],
  variants: {
    interactive: {
      true: [
        'cursor-pointer',
        'hover:border-[#CBCBCB]',
        'hover:shadow-[0px_2px_4px_0px_#00000026]',
      ],
      false: [],
    },
    variant: {
      default: [],
      danger: ['bg-[#FFE6E6]', 'border-[#FF8989]'],
    },
  },
  defaultVariants: {
    interactive: false,
    variant: 'default',
  },
});

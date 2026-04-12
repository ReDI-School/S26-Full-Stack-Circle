import { tv } from 'tailwind-variants';

export const profileCardStyles = tv({
  base: [
    'rounded-base',
    'box-border',
    'bg-white',
    'shadow-[0px_1px_2px_0px_#00000026]',
    'border border-transparent',
    'transition-all duration-200',
    'w-full',
  ],
  variants: {
    layout: {
      desktop: ['flex flex-row items-center justify-start', 'p-7', 'gap-7', 'text-left'],
      mobile: ['flex flex-col items-center justify-center text-center', 'p-5', 'gap-5'],
    },
  },
});

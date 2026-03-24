import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: [
    'bg-primary text-text-inverse',
    'py-3 px-6',
    'rounded-base',
    'border-none cursor-pointer',
    'font-sans font-medium text-base leading-[24px]',
    'transition-all duration-[250ms] ease-in-out',
    'h-10 w-fit',
    'flex flex-col items-center justify-center',
    'gap-4',
    'box-border',
    'hover:bg-primary-dark',
    'disabled:bg-grey-300 disabled:text-grey-500 disabled:cursor-not-allowed disabled:opacity-60',
  ],
  variants: {
    stretch: {
      true: 'w-full',
    },
  },
});

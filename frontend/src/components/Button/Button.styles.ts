import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: 'rounded-base text-base font-semibold text-white',
  variants: {
    variant: {
      primary: 'bg-button-primary ',
      secondary: 'bg-button-secondary',
      idle: 'bg-button-idle ',
      positive: 'bg-button-positive ',
      negative: 'bg-button-negative ',
    },
    size: {
      small: 'w-[100px] h-[32px] text-sm',
      default: 'w-[200px] h-[50px]',
    },
    state: {
      default: '',
      disabled: 'opacity-50 cursor-not-allowed disabled:pointer-events-none',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      state: 'default',
      class: 'hover:bg-button-primary-hovered',
    },
    {
      variant: 'secondary',
      state: 'default',
      class: 'hover:bg-button-secondary-hovered',
    },
    {
      variant: 'idle',
      state: 'default',
      class: 'hover:bg-button-idle-hovered',
    },
    {
      variant: 'positive',
      state: 'default',
      class: 'hover:bg-button-positive-hovered',
    },
    {
      variant: 'negative',
      state: 'default',
      class: 'hover:bg-button-negative-hovered',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'default',
    state: 'default',
  },
});

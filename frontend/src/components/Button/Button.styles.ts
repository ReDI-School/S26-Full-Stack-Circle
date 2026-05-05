import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: [
    'rounded-base',
    'text-base',
    'font-semibold',
    'font-sans',
    'text-white',
    'focus-visible',
    'transition-all',
    'transition-all duration-300',
    'whitespace-nowrap',
  ],
  variants: {
    variant: {
      primary: 'bg-button-primary ',
      secondary: 'bg-button-secondary',
      idle: 'bg-button-idle ',
      positive: 'bg-button-positive ',
      negative: 'bg-button-negative ',
    },
    size: {
      small: 'min-w-25  text-sm py-2 px-4',
      default: 'min-w-50 text-base py-3 px-6',
    },
    state: {
      default: 'cursor-pointer',
      disabled: 'cursor-not-allowed disabled:opacity-60 cursor-not-allowed',
      loading: 'opacity-70 cursor-progress',
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

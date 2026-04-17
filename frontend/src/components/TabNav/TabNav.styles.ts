import { tv } from 'tailwind-variants';

export const tabStyles = tv({
  base: [
    'px-4',
    'py-2',
    'text-sm',
    'font-medium',
    'cursor-pointer',
    'bg-transparent',
    'border-b-2',
    'uppercase',
    'transition-[colors_opacity]',
    'duration-200',
    'focus:outline-none',
  ],
  variants: {
    active: {
      true: [
        'text-tabs-active',
        'hover:text-tabs-active-hover',
        'border-tabs-active',
        'focus:opacity-70',
      ],
      false: [
        'text-tabs-idle',
        'hover:text-tabs-idle-hover',
        'hover:border-tabs-idle-hover',
        'border-transparent',
        'focus:text-tabs-idle-hover',
        'focus:border-tabs-idle-hover',
      ],
    },
  },
});

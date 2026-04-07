import { tv } from 'tailwind-variants';
import type { ActiveColor } from './TabNav.types';

export const tabStyles = tv({
  base: [
    'px-4 py-2 text-sm font-medium cursor-pointer bg-transparent border-b-2 uppercase',
    'transition-colors duration-200 focus:outline-none',
  ],
  variants: {
    active: {
      false: 'text-gray-400 border-transparent hover:text-gray-600',
    },
    activeColor: {
      orange: '',
      teal: '',
      red: '',
    } satisfies Record<ActiveColor, string>,
  },
  compoundVariants: [
    { active: true, activeColor: 'orange', class: 'text-orange-500 border-orange-500' },
    { active: true, activeColor: 'teal', class: 'text-teal-500 border-teal-500' },
    { active: true, activeColor: 'red', class: 'text-red-500 border-red-500' },
  ],
  defaultVariants: {
    activeColor: 'orange',
  },
});

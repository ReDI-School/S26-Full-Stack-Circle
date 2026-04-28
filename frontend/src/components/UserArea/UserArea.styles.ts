import { tv } from 'tailwind-variants';

export const userArea = tv({
  slots: {
    wrapper: ['relative', 'inline-flex'],

    userArea: [
      'text-text-secondary',
      'flex',
      'justify-between',
      'items-center',
      'p-2',
      'rounded-full',
      'hover:bg-gray-100',
      'focus:outline-none',
      'cursor-pointer',
    ],

    dropdown: [
      'p-4',
      'flex',
      'flex-col',
      'gap-2',
      'w-30',
      'bg-white',
      'shadow-md',
      'rounded-md',
      'right-0',
      'mt-3',
      'top-full',
      'absolute',
    ],

    item: [
      'w-full',
      'flex',
      'items-center',
      'justify-end',
      'text-text-secondary',
      'bg-transparent',
      'border-none',
      'cursor-pointer',
      'hover:text-gray-700',
      'focus:outline-none',
      'focus:text-gray-700',
    ],

    icon: ['ml-2'],
  },
});

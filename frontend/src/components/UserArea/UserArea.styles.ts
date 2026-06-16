import { tv } from 'tailwind-variants';

export const userArea = tv({
  slots: {
    wrapper: ['relative', 'inline-flex'],
    userArea: [
      'flex',
      'items-center',
      'h-12.5',
      'px-1.5',
      'min-w-0',
      'gap-2',
      'sm:gap-4',
      'rounded-full',
      'cursor-pointer',
      'transition-colors',
      'duration-300',
      'text-text-secondary',
      'text-base',
      'hover:bg-gray-redi-hover',
    ],
    dropdown: [
      'absolute',
      'top-full',
      'right-0',
      'mt-3',
      'z-[60]',
      'flex',
      'flex-col',
      'w-34',
      'p-3.75',
      'gap-3.75',
      'bg-white',
      'rounded-base',
      'shadow-md',
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
  variants: {
    isExpanded: {
      true: {
        userArea: 'bg-gray-redi-hover',
      },
    },
  },
});

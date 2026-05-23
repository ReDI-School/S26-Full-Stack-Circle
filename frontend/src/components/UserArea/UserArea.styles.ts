import { tv } from 'tailwind-variants';

export const userArea = tv({
  slots: {
    wrapper: ['relative', 'inline-flex'],
    userArea: [
     'flex',
      'items-center',
      'h-[50px]',
      'px-[6px]',
      'gap-4',
      'bg-[#F9F9F9]',
      'rounded-full',
      'cursor-pointer',
      'transition-colors',
      'duration-300',
      'text-text-secondary',
      'font-sans',
      'text-base',
      'hover:bg-[#ECECEC]',
    ],
    dropdown: [
      'absolute',
      'top-full',
      'right-0',
      'mt-3',
      'flex',
      'flex-col',
      'w-[136px]',
      'p-[15px]',
      'gap-[15px]',
      'bg-white',
      'rounded-[4px]',
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
      'focus-visible:outline-none',
    ],
    icon: ['ml-2'],
  },
  variants: {
    isExpanded: {
      true: {
        userArea: 'bg-gray-100',
      },
    },
  },
});

import { tv } from 'tailwind-variants';

export const profileCardStyles = tv({
  slots: {
    base: [
      'w-full',
      'text-text-tertiary',
      'heading-text-tertiary',
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-5',

      // Desktop behavior
      'text-center',
      'md:flex-row',
      'md:gap-7',
      'md:text-left',
    ],
    TrashIconButton: [
      'p-2',
      'rounded-full',
      'border',
      'rounded-full',
      'border',
      'border-transparent',
      'text-gray-400',
      'hover:bg-gray-100',
      'hover:border-gray-400',
      'hover:text-gray-600',
      'active:bg-red-100',
      'active:border-red-500',
      'active:text-red-500',
      'transition-colors',
      'duration-150',
    ],
  },
});

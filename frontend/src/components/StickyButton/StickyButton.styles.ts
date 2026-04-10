import { tv } from 'tailwind-variants';

export const stickyButtonStyles = tv({
  slots: {
    base: [
      'fixed bottom-0 left-1/2 z-50 -translate-x-1/2',
      'flex items-center justify-center gap-2',
      'w-full box-border py-5 px-6',
      'font-sans text-sm font-semibold uppercase',
      'bg-button-idle text-text-inverse border-none rounded-t-lg',
      'cursor-pointer transition-all duration-[250ms] ease-in-out',
      'hover:bg-button-idle-hovered',
      'disabled:cursor-not-allowed disabled:bg-grey-300 disabled:text-grey-500 disabled:opacity-60',
      'sm:hidden',
    ],
    iconWrapper: 'block',
  },
});

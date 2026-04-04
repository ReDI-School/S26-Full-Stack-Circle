import { tv } from 'tailwind-variants';

export const stickyButtonStyles = tv({
  slots: {
    base: [
      'bg-[#75898C] text-text-inverse',
      'py-5 px-6',
      'border-none cursor-pointer',
      'font-sans font-semibold text-sm leading-[23px] tracking-[1px] uppercase',
      'transition-all duration-[250ms] ease-in-out',
      'flex items-center justify-center',
      'gap-2',
      'box-border',
      'hover:bg-[#516063]',
      'disabled:bg-grey-300 disabled:text-grey-500 disabled:cursor-not-allowed disabled:opacity-60',
      'fixed bottom-0 left-1/2 -translate-x-1/2 w-full rounded-t-base z-50',
      'sm:static sm:w-fit sm:rounded-base sm:translate-x-0',
    ],
    iconWrapper: 'block sm:hidden',
  },
});

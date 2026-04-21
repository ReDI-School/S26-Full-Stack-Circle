import { tv } from 'tailwind-variants';

export const publicLayoutStyles = tv({
  slots: {
    main: 'flex h-screen overflow-hidden',
    sidebar: 'hidden md:block w-[480px]',
    content: 'flex-1 bg-[#F5F5F5] relative flex items-center justify-center',
    mobileLogo: [
      'absolute',
      'top-[50px]',
      'left-[43px]',
      'md:hidden',
      'flex',
      'items-center',
      'justify-between',
      'w-[259px]',
      'h-[33.22px]',
      'pt-[2px]',
      'pr-[6px]',
      'pb-[2px]',
      'pl-[6px]',
    ].join(' '),
  },
});

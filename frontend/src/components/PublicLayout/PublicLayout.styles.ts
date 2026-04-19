import { tv } from 'tailwind-variants';

export const publicLayoutStyles = tv({
  slots: {
    main: 'flex h-screen overflow-hidden',
    sidebar: 'hidden md:block w-[480px]',
    content: 'flex-1 bg-[#F5F5F5] flex flex-col',
    nav: 'w-full flex justify-end items-center gap-2 px-6 py-4',
    body: 'flex flex-1 items-center justify-center px-6',
  },
});

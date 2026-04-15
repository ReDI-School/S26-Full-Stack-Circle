import { tv } from 'tailwind-variants';

export const publicLayoutStyles = tv({
  slots: {
    main: 'flex h-screen overflow-hidden',
    sidebar: 'hidden md:block w-[480px]',
    content: 'flex-1 bg-[#F5F5F5] flex items-center justify-center',
  },
});

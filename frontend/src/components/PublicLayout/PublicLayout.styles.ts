import { tv } from 'tailwind-variants';

export const publicLayoutStyles = tv({
  slots: {
    main: 'flex h-screen overflow-hidden',
    sidebar: 'hidden lg:block w-[480px]',
    content: 'flex-1 flex items-center justify-center',
  },
});

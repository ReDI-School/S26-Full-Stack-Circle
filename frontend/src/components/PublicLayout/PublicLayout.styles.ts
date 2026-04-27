import { tv } from 'tailwind-variants';

export const publicLayoutStyles = tv({
  slots: {
    main: ['flex', 'flex-col', 'lg:flex-row', 'h-screen', 'overflow-hidden'],
    logoMobile: ['flex', 'lg:hidden', 'pt-7.5', 'items-center', 'justify-center'],
    sidebar: ['hidden', 'lg:block', 'w-[480px]'],
    content: ['flex-1', 'flex', 'items-center', 'justify-center', 'p-7.5', 'lg:p-12.5'],
  },
});

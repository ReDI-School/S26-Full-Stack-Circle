import { tv } from 'tailwind-variants';

export const publicLayoutStyles = tv({
  slots: {
    main: ['flex', 'flex-col', 'lg:flex-row', 'md:h-screen', 'min-h-screen', 'overflow-y-auto'],
    logoMobile: ['flex', 'lg:hidden', 'pt-7.5', 'items-center', 'justify-center'],
    sidebar: ['hidden', 'lg:block', 'w-120'],
    content: [
      'relative',
      'p-7.5',
      'lg:p-12.5',
      'size-full',
      'flex',
      'flex-1',
      'flex-col-reverse',
      'lg:flex-col',
      'gap-10',
      'items-center',
      'justify-center',
    ],
    navigBlock: [
      'lg:absolute',
      'top-12.5',
      'right-12.5',
      'w-full',
      'flex',
      'gap-1',
      'text-text-tertiary',
      'items-center',
      'justify-center',
      'lg:justify-end',
    ],
  },
});

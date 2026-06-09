import { tv } from 'tailwind-variants';

export const publicLayoutStyles = tv({
  slots: {
    main: ['flex', 'flex-col', 'lg:flex-row', 'min-h-dvh', 'lg:h-dvh', 'lg:overflow-hidden'],
    logoMobile: ['flex', 'lg:hidden', 'pt-7.5', 'items-center', 'justify-center'],
    sidebar: ['hidden', 'lg:block', 'w-120'],
    content: [
      'size-full',
      'overflow-y-auto',
      'p-7.5',
      'lg:p-12.5',
      'flex',
      'flex-1',
      'flex-col-reverse',
      'lg:flex-col',
      'gap-10',
      'items-center',
    ],
    navigBlock: [
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

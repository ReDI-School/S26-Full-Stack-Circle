import { tv } from 'tailwind-variants';

export const protectedLayoutStyles = tv({
  slots: {
    main: ['flex', 'flex-col', 'h-screen', 'overflow-hidden', 'bg-gray-50'],
    headerBar: [
      'min-h-16',
      'flex',
      'justify-between',
      'items-center',
      'px-7.5',
      'lg:px-12.5',
      'py-4',
    ],
    content: ['flex-1', 'overflow-y-auto', 'px-7.5', 'lg:px-12.5', 'py-4'],
  },
});

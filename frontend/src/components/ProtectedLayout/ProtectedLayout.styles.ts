import { tv } from 'tailwind-variants';

export const protectedLayoutStyles = tv({
  slots: {
    main: ['flex', 'flex-col', 'h-screen', 'overflow-hidden'],
    headerBar: [
      'sticky',
      'top-0',
      'left-0',
      'right-0',
      'min-h-16',
      'z-50',
      'flex',
      'justify-between',
      'items-center',
      'px-7.5',
      'lg:px-12.5',
      'py-4',
      'bg-white',
      'border-b',
      'border-gray-200',
    ],
    content: ['flex-1', 'overflow-y-auto'],
  },
});

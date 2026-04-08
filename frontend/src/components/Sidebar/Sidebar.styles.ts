import { tv } from 'tailwind-variants';

export const sidebarStyles = tv({
  slots: {
    container: [
      'bg-primary',
      'w-full',
      'min-h-screen',
      'flex',
      'items-end',
      'justify-center',
      'overflow-hidden',
    ],
    image: [
      'w-full',
      'max-w-full',
      'h-auto',
      'object-contain',
    ],
  },
});

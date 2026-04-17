import { tv } from 'tailwind-variants';

export const sidebarStyles = tv({
  slots: {
    container: [
      'bg-primary',
      'w-[480px]',
      'h-full',
      'flex',
      'flex-col',
      'gap-4',
      'overflow-hidden',
      'p-15',
      'bg-bottom',
      'bg-no-repeat',
      'bg-[length:100%_auto]',
    ],
    logo: [
      'w-fit',
      'text-text-inverse',
    ],
    tagline: [
      'w-fit',
      'text-text-inverse',
      'text-base',
      'font-light',
      'tracking-widest',
    ],
  },
});

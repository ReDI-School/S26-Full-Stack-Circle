import { tv } from 'tailwind-variants';

export const networkErrorStyles = tv({
  slots: {
    container: [
      'flex flex-col items-center justify-center gap-8',
      'max-w-[480px] text-center',
      'lg:items-start lg:text-left',
    ],
    textWrapper: ['flex flex-col gap-2'],
    title: ['font-normal text-[28px]', 'text-text-primary'],
    description: ['font-normal text-lg', 'text-ec-primary'],
  },
});

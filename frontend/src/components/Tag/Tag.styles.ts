import { tv } from 'tailwind-variants';

export const TagStyles = tv({
  base: [
    'flex',
    'items-center',
    'justify-center',
    'w-fit',
    'max-w-[145px]',
    'h-[36px]',
    'bg-tag-background',
    'rounded',
    'px-4',
    'py-2',
    'text-tag-text',
    'text-sm',
    'font-normal',
    'truncate',
  ],
});

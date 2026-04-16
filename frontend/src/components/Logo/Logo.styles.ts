import { tv } from 'tailwind-variants';

export const logoStyles = tv({
  base: ['inline-flex', 'items-center'],
  variants: {
    size: {
      full: '',
      compact: '',
    },
  },
});

export const logoLineStyles = tv({
  base: ['flex', 'justify-center', 'items-center', 'w-full'],
});

export const dashedBorderStyles = tv({
  base: ['border', 'border-dashed', 'dark:border-white', 'px-8', 'py-6'],
  variants: {
    size: {
      full: '',
      compact: '',
    },
  },
});

export const fullLogoContainerStyles = tv({
  base: ['flex', 'flex-col', 'items-start'],
});

export const mainTextStyles = tv({
  base: ['font-black', 'mt-6', 'mb-3', 'whitespace-nowrap'],
  variants: {
    size: {
      full: '',
      compact: '',
    },
  },
});

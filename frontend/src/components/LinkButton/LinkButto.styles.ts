import { tv } from 'tailwind-variants';

export const linkButtonStyles = tv({
  base: `
    flex items-center justify-center 
    gap-1.5 md:gap-2.5 
    w-fit 
    text-xs md:text-base 
    font-medium 
    text-[#ff5710]
    transition-colors duration-200
    hover:text-[#e14a07]
    hover:underline
    underline-offset-4
  `,
});

export const iconStyles = tv({
  base: `
    text-[14px] md:text-[20px] 
    shrink-0
  `,
});

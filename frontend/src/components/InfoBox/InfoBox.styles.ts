import { tv } from 'tailwind-variants';

export const infoBoxStyles = tv({
  base: [
    'flex items-center',
    'gap-3',
    'px-5 py-2.5',
    'border',
    'rounded',
    'text-sm',
    'font-normal',
  ],
  variants: {
    variant: {
      info: 'bg-[#DFF7FF] border-[#88C6FF] text-[#448CBB]',
      error: 'bg-[#FFDFDF] border-[#FF8989] text-[#D86666]',
      warning: 'bg-[#FFF6DF] border-[#FFCA4E] text-[#BB7844]',
      success: 'bg-[#E2FFC9] border-[#99C763] text-[#4F854C]',
    },
  },
});

import { tv } from 'tailwind-variants';

export const inputFieldStyles = tv({
  slots: {
    wrapper: 'flex flex-col gap-2.5 text-input-label relative',
    input: 'border rounded-base p-5 placeholder:text-input-placeholder',
    errorText: 'text-input-error text-xs',
    asterisk: 'text-input-error text-lg',
    faEye: 'absolute bottom-6 right-4',
  },
  variants: {
    hasError: {
      true: {
        input: 'border-input-warning',
        faEye: 'text-input-warning',
      },
    },
  },
});

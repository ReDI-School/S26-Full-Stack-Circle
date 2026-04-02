import { tv } from 'tailwind-variants';

export const inputFieldStyles = tv({
  slots: {
    wrapper: 'flex flex-col gap-2.5 text-input-label',
    inputContainer:'relative flex flex-col',
    input: 'border rounded-base px-5 py-3 placeholder:text-input-placeholder',
    errorText: 'text-input-error text-xs',
    asterisk: 'text-input-error text-lg',
    visibilityIcon: 'absolute bottom-3.5 right-4',
  },
  variants: {
    hasError: {
      true: {
        input: 'border-input-warning',
        visibilityIcon: 'text-input-warning',
      },
    },
  },
});

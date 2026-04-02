import { tv } from 'tailwind-variants';

export const inputFieldStyles = tv({
  slots: {
    wrapper: 'flex flex-col gap-2.5 text-input-secondary',
    inputContainer: 'relative flex flex-col',
    input:
      'border border-input-secondary rounded-base px-5 py-3  text-input-primary placeholder:text-input-tertiary',
    errorText: 'text-input-error text-xs',
    asterisk: 'text-input-error text-lg',
    visibilityIcon: 'absolute bottom-3.5 right-5 text-input-secondary',
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

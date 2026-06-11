import type { ButtonProps } from './Button.types';
import { buttonStyles } from './Button.styles';
import { twMerge } from 'tailwind-merge';

export default function Button({
  variant,
  size,
  state,
  children,
  className,
  ...rest
}: ButtonProps) {
  const isLoading = state === 'loading';

  return (
    <button
      className={twMerge(buttonStyles({ variant, size, state }), className)}
      disabled={state === 'disabled' || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading
        </span>
      ) : (
        children
      )}
    </button>
  );
}

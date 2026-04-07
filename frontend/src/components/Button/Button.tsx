import type { ButtonProps } from './Button.types';
import { buttonStyles } from './Button.styles';
import { Children } from 'react';

export default function Button({
  variant,
  size,
  state,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, state })}
      disabled={state === 'disabled'}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

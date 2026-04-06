import type { ButtonProps } from './Button.types';
import { buttonStyles } from './Button.styles';

export default function Button({ variant, size, state, children }: ButtonProps) {
  return <button className={buttonStyles({ variant, size, state })}>{children}</button>;
}

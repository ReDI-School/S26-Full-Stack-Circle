import type { ButtonProps } from './Button.types';
import { buttonStyles } from './Button.styles';

const Button = ({ children, onClick, stretch = false, disabled = false }: ButtonProps) => {
  return (
    <button
      className={buttonStyles({ stretch })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

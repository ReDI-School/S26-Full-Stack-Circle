import { tv } from 'tailwind-variants';
import type { ButtonProps } from './Button.types';

const button = tv({
  base: [
    'bg-primary-red text-text-primary',
    'py-3 px-6',
    'rounded-base',
    'border-none cursor-pointer',
    'font-sans font-medium text-base leading-[24px]',
    'transition-all duration-[250ms] ease-in-out',
    'h-10 w-fit',
    'flex flex-col items-center justify-center',
    'gap-4',
    'box-border',
    'hover:bg-secondary-red-200',
    'disabled:bg-grey-100 disabled:text-grey-200 disabled:cursor-not-allowed disabled:opacity-60',
  ],
  variants: {
    stretch: {
      true: 'w-full',
    },
  },
});

const Button = ({ children, onClick, stretch = false, disabled = false }: ButtonProps) => {
  return (
    <button
      className={button({ stretch })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

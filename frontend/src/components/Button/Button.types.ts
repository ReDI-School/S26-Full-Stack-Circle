interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'idle' | 'positive' | 'negative';
  size?: 'default' | 'small';
  state: 'default' | 'disabled' | 'loading';
  children: React.ReactNode;
  onClick?: () => void;
}

export type { ButtonProps };

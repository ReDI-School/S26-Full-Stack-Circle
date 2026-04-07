interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'idle' | 'positive' | 'negative';
  size?: 'default' | 'small';
  state: 'default' | 'disabled' | 'loading';
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export type { ButtonProps };

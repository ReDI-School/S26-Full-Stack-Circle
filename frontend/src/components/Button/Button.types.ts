interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button
   * @default primary
   */
  variant?: 'primary' | 'secondary' | 'idle' | 'positive' | 'negative';

  /**
   * The state of the button
   * @default: medium
   */
  size?: 'default' | 'small';

  /**
   * The state of the button
   * @default: default
   */
  state?: 'default' | 'disabled' | 'loading';

  children: React.ReactNode;
}

export type { ButtonProps };

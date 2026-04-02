interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the card should have interactive styles (e.g., hover effects)
   */

  interactive?: boolean;

  /**
   * The content to be displayed inside the card
   */
  children: React.ReactNode;

  className?: string;

  ref?: React.Ref<HTMLDivElement>;
}

export type { CardProps };

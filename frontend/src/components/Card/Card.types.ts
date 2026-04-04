interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the card should have interactive styles (e.g., hover effects)
   */

  interactive?: boolean;

  loading?: boolean;

  children: React.ReactNode;

  className?: string;

  ref?: React.Ref<HTMLDivElement>;
}

export type { CardProps };

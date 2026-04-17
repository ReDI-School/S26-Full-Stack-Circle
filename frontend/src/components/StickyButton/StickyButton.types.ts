interface StickyButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * Text displayed on the button
   */
  label: string;

  /**
   * Icon displayed before the text
   */
  icon?: React.ReactNode;
}

export type { StickyButtonProps };

interface StickyButtonProps {
  /**
   * The function to be called when the button is clicked
   */
  onClick?: () => void;

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

interface ButtonProps {
  /**
   * The label of the button
   */
  children: React.ReactNode;

  /**
   * The function to be called when the button is clicked
   */
  onClick?: () => void;

  /**
   * Whether the button should stretch to the width of its container
   */
  stretch?: boolean;

  /**
   * Whether the button should be disabled
   */
  disabled?: boolean;
}

export type { ButtonProps };

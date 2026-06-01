import { LinkProps } from 'next/link';

export interface LinkButtonProps extends LinkProps {
  /**
   * Icon displayed before the text
   */
  icon?: React.ReactNode;

  /**
   * Label displayed after the icon
   */
  children: React.ReactNode;

  /** Controls the text color. Defaults to 'primary'. */
  color?: 'primary' | 'secondary';
}

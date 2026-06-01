import type { LinkButtonProps } from './LinkButton.types';
import { iconStyles, linkButtonStyles } from './LinkButton.styles';

import Link from 'next/link';

const LinkButton = ({ icon, href, children, color = 'primary', ...props }: LinkButtonProps) => {
  return (
    <Link href={href} className={linkButtonStyles({ color })} {...props}>
      {icon && <span className={iconStyles()}>{icon}</span>}
      {children}
    </Link>
  );
};
export default LinkButton;

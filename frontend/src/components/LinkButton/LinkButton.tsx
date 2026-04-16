import type { LinkButtonProps } from './LinkButton.types';
import { iconStyles, linkButtonStyles } from './LinkButto.styles';

const LinkButton = ({ label, icon, href }: LinkButtonProps) => {
  return (
    <a href={href} className={linkButtonStyles()}>
      {icon && <span className={iconStyles()}>{icon}</span>}
      {label}
    </a>
  );
};
export default LinkButton;

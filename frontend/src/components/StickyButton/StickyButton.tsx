import type { StickyButtonProps } from './StickyButton.types';
import { stickyButtonStyles } from './StickyButton.styles';

const StickyButton = ({ label, icon, ...props }: StickyButtonProps) => {
  const { base, iconWrapper } = stickyButtonStyles(props);

  return (
    <button className={base()}>
      {icon && <span className={iconWrapper()}>{icon}</span>}
      {label}
    </button>
  );
};

export default StickyButton;

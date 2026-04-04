import type { StickyButtonProps } from './StickyButton.types';
import { stickyButtonStyles } from './StickyButton.styles';

const StickyButton = ({ label, icon, onClick, ...props }: StickyButtonProps) => {
  const { base, iconWrapper } = stickyButtonStyles(props);

  return (
    <button className={base()} onClick={onClick}>
      {icon && <span className={iconWrapper()}>{icon}</span>}
      {label}
    </button>
  );
};

export default StickyButton;

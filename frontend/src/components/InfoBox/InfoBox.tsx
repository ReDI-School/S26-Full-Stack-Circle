import { InfoBoxProps, InfoBoxVariant, VariantConfig } from './InfoBox.types';
import { infoBoxStyles } from './InfoBox.styles';
import { WarningIcon, CheckCircleIcon, InfoIcon } from '@phosphor-icons/react';

const VARIANT_CONFIG: Record<InfoBoxVariant, VariantConfig> = {
  info: {
    icon: <InfoIcon size={16} />,
  },
  error: {
    icon: <WarningIcon size={18} />,
    role: 'alert',
  },
  warning: {
    icon: <WarningIcon size={18} />,
    role: 'alert',
  },
  success: {
    icon: <CheckCircleIcon size={16} />,
  },
};

export const InfoBox = ({ variant = "info", message }: InfoBoxProps) => {
  const config = VARIANT_CONFIG[variant];

  return (
    <div role={config.role} className={infoBoxStyles({ variant })}>
      <div>{config.icon}</div>
      <p>{message}</p>
    </div>
  );
};

import { InfoBoxProps, InfoBoxVariant } from './InfoBox.types';

import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

type VariantConfig = {
  icon: React.ReactNode;
  className: string;
  role?: 'alert';
};

const VARIANT_CONFIG: Record<InfoBoxVariant, VariantConfig> = {
  info: {
    icon: <Info size={16} />,
    className: 'bg-[#DFF7FF] border-[#88C6FF] text-[#448CBB]',
  },
  error: {
    icon: <AlertTriangle size={18} />,
    className: 'bg-[#FFDFDF] border-[#FF8989] text-[#D86666]',
    role: 'alert',
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    className: 'bg-[#FFF6DF] border-[#FFCA4E] text-[#BB7844]',
    role: 'alert',
  },
  success: {
    icon: <CheckCircle2 size={16} />,
    className: 'bg-[#E2FFC9] border-[#99C763] text-[#4F854C]',
  },
};

export const InfoBox = ({ variant, message }: InfoBoxProps) => {
  const config = VARIANT_CONFIG[variant];

  return (
    <div
      role={config.role}
      className={`flex items-start gap-3 rounded-md px-5 py-2.5 border text-[14px] line-[16px] ${config.className}`}
    >
      <div className="mt-[2px]">{config.icon}</div>
      <p className="">{message}</p>
    </div>
  );
};

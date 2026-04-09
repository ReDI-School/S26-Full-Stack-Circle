import type { LinkButtonProps } from './LinkButton.types';

const LinkButton = ({ label, icon, href }: LinkButtonProps) => {
  return (
    <a
      href={href}
      className="flex items-center justify-center gap-1.5 md:gap-2.5 w-fit px-2 py-3 md:px-3 md:py-4 text-[10px] md:text-[16px] font-medium text-[#ff5710]"
    >
      {icon && <span className="text-[14px] md:text-[20px] shrink-0">{icon}</span>}
      {label}
    </a>
  );
};
export default LinkButton;

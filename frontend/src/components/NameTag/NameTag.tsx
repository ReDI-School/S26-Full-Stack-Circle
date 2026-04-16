import type { NameTagProps } from './NameTag.types';
import { NameTagStyles } from './NameTag.styles';

const NameTag = ({ Name }: NameTagProps) => {
  return (
    <div className={NameTagStyles()}>
      <span className="truncate w-full text-center py-1" title={Name}>
        {Name}
      </span>
    </div>
  );
};

export default NameTag;

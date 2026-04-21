import type { TagProps } from './Tag.types';
import { TagStyles } from './Tag.styles';

const Tag = ({ label }: TagProps) => {
  return (
    <div className={TagStyles()}>
      <span className="truncate w-full text-center py-1" title={label}>
        {label}
      </span>
    </div>
  );
};

export default Tag;

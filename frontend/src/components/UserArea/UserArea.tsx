import { UserAreaProps } from './UserArea.types';
import { Avatar } from '../Avatar';
import { CaretDownIcon } from '@phosphor-icons/react';

const UserArea = ({ userName, avatarInitials }: UserAreaProps) => {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full bg-surface px-3 py-2 cursor-pointer hover:bg-gray-100">
      <div className="shrink-0">
        <Avatar size="md" initials={avatarInitials} />
      </div>
      <div className="text-base font-medium text-[#707070]">{userName}</div>
      <CaretDownIcon size={18} className="text-[#707070]" />
    </div>
  );
};

export default UserArea;

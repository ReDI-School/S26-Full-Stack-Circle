import { UserAreaProps } from './UserArea.types';
import { Avatar } from '../Avatar';

const UserArea = ({ userName, avatarInitials }: UserAreaProps) => {
  return (
    <div>
      <div>
        <Avatar size="md" initials={avatarInitials} />
      </div>
      <div>{userName}</div>
    </div>
  );
};

export default UserArea;

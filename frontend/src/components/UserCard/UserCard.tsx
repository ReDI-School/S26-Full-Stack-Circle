import type { UserCardProps } from './UserCard.types';
import { UserCardStyles } from './UserCard.styles';

const UserCard = ({ name, email, avatarUrl, selected = false, onClick }: UserCardProps) => {
  return (
    <div className={UserCardStyles({ selected })} onClick={onClick}>
      <img
        src={avatarUrl || 'https://i.pravatar.cc'}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex flex-col">
        <span className="font-medium text-sm">{name}</span>
        <span className="text-xs text-grey-500">{email}</span>
      </div>
    </div>
  );
};

export default UserCard;

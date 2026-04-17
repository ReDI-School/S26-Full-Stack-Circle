import { AvatarProps } from './Avatar.types';
import { avatarStyles } from './Avatar.styles';

const Avatar = ({ initials, size = 'md' }: AvatarProps) => {
  return <div className={avatarStyles({ size })}>{initials}</div>;
};

export default Avatar;

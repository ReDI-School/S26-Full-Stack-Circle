import { UserAreaProps } from './UserArea.types';
import { Avatar } from '../Avatar';
import { CaretDownIcon, UserIcon, SignOutIcon } from '@phosphor-icons/react';
import {
  userAreaStyles,
  userAreaProfileStyles,
  dropDownStyles,
  iconStyles,
} from './UserArea.styles';
import { useState, useEffect, useRef } from 'react';

const UserArea = ({ userName, avatarInitials, onProfile, onSignOut }: UserAreaProps) => {
  const [isExpanded, setIsExpended] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsExpended(false);
      }
    };
    document.body.addEventListener('click', closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown);
  }, []);

  return (
    <div className="flex">
      <div
        ref={ref}
        className={userAreaStyles.base.join(' ')}
        onClick={() => setIsExpended((prev) => !prev)}
        aria-haspopup={true}
        aria-expanded={isExpanded}
      >
        <Avatar size="md" initials={avatarInitials} />
        <div className="mx-3">{userName}</div>
        <CaretDownIcon />
        {isExpanded && (
          <div className={userAreaProfileStyles.base.join(' ')}>
            <div className={dropDownStyles.base.join(' ')}>
              <span>Profile</span>
              <UserIcon className={iconStyles.base.join(' ')} onClick={onProfile} />
            </div>
            <div className={dropDownStyles.base.join(' ')}>
              <span>Sign Out</span>
              <SignOutIcon className={iconStyles.base.join(' ')} onClick={onSignOut} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserArea;

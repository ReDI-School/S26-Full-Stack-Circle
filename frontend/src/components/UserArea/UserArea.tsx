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
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeDropdown = (e: PointerEvent) => {
      const target = e.target as Node;
      const clickedTrigger = buttonRef.current?.contains(target);
      const clickedMenu = menuRef.current?.contains(target);

      if (!clickedTrigger && !clickedMenu) {
        setIsExpended(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpended(false);
      }
    };

    document.addEventListener('pointerdown', closeDropdown, true);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', closeDropdown, true);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="relative inline-flex">
      <button
        ref={buttonRef}
        type="button"
        className={userAreaStyles.base.join(' ')}
        onClick={() => {
          setIsExpended((prev) => !prev);
        }}
        aria-haspopup="menu"
        aria-expanded={isExpanded}
      >
        <Avatar size="md" initials={avatarInitials} />
        <div className="mx-3">{userName}</div>
        <CaretDownIcon />
      </button>
      {isExpanded && (
        <div
          ref={menuRef}
          className={userAreaProfileStyles.base.join(' ')}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={dropDownStyles.base.join(' ')}
            onClick={() => {
              onProfile();
              setIsExpended(false);
            }}
          >
            <span>Profile</span>
            <UserIcon className={iconStyles.base.join(' ')} />
          </div>
          <div
            className={dropDownStyles.base.join(' ')}
            onClick={() => {
              onSignOut();
              setIsExpended(false);
            }}
          >
            <span>Sign Out</span>
            <SignOutIcon className={iconStyles.base.join(' ')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserArea;

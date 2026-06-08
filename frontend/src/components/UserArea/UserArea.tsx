'use client';

import { UserAreaProps } from './UserArea.types';
import { Avatar } from '../Avatar';
import { CaretDownIcon, UserIcon, SignOutIcon } from '@phosphor-icons/react';
import { userArea } from './UserArea.styles';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '../LanguageSwitcher';

const UserArea = ({ userName, avatarInitials, onProfile, onSignOut }: UserAreaProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const styles = userArea();
  const t = useTranslations('userArea');

  useEffect(() => {
    const closeDropdown = (e: PointerEvent) => {
      const target = e.target as Node;
      const clickedTrigger = buttonRef.current?.contains(target);
      const clickedMenu = menuRef.current?.contains(target);

      if (!clickedTrigger && !clickedMenu) {
        setIsExpanded(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
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
    <div className={styles.wrapper()}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.userArea({ isExpanded })}
        onClick={() => {
          setIsExpanded((prev) => !prev);
        }}
        aria-haspopup="menu"
        aria-expanded={isExpanded}
      >
        <Avatar size="md" initials={avatarInitials} />
        {userName && <span className="min-w-0 truncate hidden sm:block">{userName}</span>}
        <CaretDownIcon aria-hidden="true" focusable="false" />
      </button>
      {isExpanded && (
        <div ref={menuRef} className={styles.dropdown()} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={styles.item()}
            onClick={() => {
              onProfile();
              setIsExpanded(false);
            }}
          >
            <span>{t('profile')}</span>
            <UserIcon className={styles.icon()} aria-hidden="true" focusable="false" />
          </button>

          <LanguageSwitcher />

          <button
            type="button"
            className={styles.item()}
            onClick={() => {
              onSignOut();
              setIsExpanded(false);
            }}
          >
            <span>{t('signOut')}</span>
            <SignOutIcon className={styles.icon()} aria-hidden="true" focusable="false" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserArea;

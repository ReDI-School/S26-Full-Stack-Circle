'use client';

import { UserAreaProps } from './UserArea.types';
import { Avatar } from '../Avatar';
import { CaretDownIcon, UserIcon, SignOutIcon, TranslateIcon } from '@phosphor-icons/react';
import { userArea } from './UserArea.styles';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from '../IntlProvider';
import { locales, type Locale } from '../../i18n/locales';

const UserArea = ({ userName, avatarInitials, onProfile, onSignOut }: UserAreaProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLangExpanded, setIsLangExpanded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const styles = userArea();
  const t = useTranslations('userArea');
  const tLang = useTranslations('languages');
  const { locale, setLocale } = useLocale();

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
        onClick={() => setIsExpanded((prev) => !prev)}
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

          {/* Language switcher */}
          <button
            type="button"
            className={styles.item()}
            onClick={() => setIsLangExpanded((prev) => !prev)}
          >
            <span>{tLang(locale)}</span>
            <TranslateIcon className={styles.icon()} aria-hidden="true" focusable="false" />
          </button>
          {isLangExpanded && (
            <div className="flex flex-col gap-1.5">
              {locales.filter((lang) => lang !== locale).map((lang) => (
                <label key={lang} className={styles.item() + ' cursor-pointer'}>
                  <span>{tLang(lang)}</span>
                  <input
                    type="radio"
                    name="language"
                    value={lang}
                    checked={locale === lang}
                    onChange={() => {
                      setLocale(lang as Locale);
                      setIsLangExpanded(false);
                    }}
                    className="ml-2 accent-current"
                  />
                </label>
              ))}
            </div>
          )}

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

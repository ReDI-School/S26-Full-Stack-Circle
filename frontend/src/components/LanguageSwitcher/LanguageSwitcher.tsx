'use client';

import { useState } from 'react';
import { TranslateIcon } from '@phosphor-icons/react';
import { locales, localeNames, type Locale } from '../../i18n/locales';
import { useLocale } from '../IntlProvider';
import { userArea } from '../UserArea/UserArea.styles';

const LanguageSwitcher = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { locale, setLocale } = useLocale();
  const styles = userArea();

  return (
    <>
      <button
        type="button"
        className={styles.item()}
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
      >
        <span>{localeNames[locale]}</span>
        <TranslateIcon className={styles.icon()} aria-hidden="true" focusable="false" />
      </button>
      {isExpanded && (
        <div className="flex flex-col gap-1.5">
          {locales.filter((lang) => lang !== locale).map((lang) => (
            <label key={lang} className={styles.item() + ' cursor-pointer'}>
              <span>{localeNames[lang]}</span>
              <input
                type="radio"
                name="language"
                value={lang}
                checked={locale === lang}
                onChange={() => {
                  setLocale(lang as Locale);
                  setIsExpanded(false);
                }}
                className="ml-2 accent-current"
              />
            </label>
          ))}
        </div>
      )}
    </>
  );
};

export default LanguageSwitcher;

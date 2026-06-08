'use client';

import { createContext, useContext, useState } from 'react';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { type Locale } from '../../i18n/locales';
import en from '../../../messages/en.json';
import de from '../../../messages/de.json';

const STORAGE_KEY = 'locale';
const messageMap: Record<Locale, AbstractIntlMessages> = { en, de };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);

export const IntlProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    return saved === 'en' || saved === 'de' ? saved : 'en';
  });

  const setLocale = (next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messageMap[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
};

'use client';

import { createContext, useContext, type ReactNode } from 'react';

type Locale = 'fr' | 'en' | 'ar' | 'es';

const LocaleContext = createContext<Locale>('fr');

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocaleContext(): Locale {
  return useContext(LocaleContext);
}
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { AppLayout } from '@/components/layout';
import { Suspense } from 'react';

const VALID_LOCALES = ['fr', 'en', 'ar', 'es'];

interface Props { children: React.ReactNode; params: Promise<{ locale: string }> }

export default async function LocaleLayout({ children, params }: Props) {
  let locale = 'fr';

  try {
    const resolved = await params;
    locale = resolved?.locale || 'fr';
  } catch {
    locale = 'fr';
  }

  if (!VALID_LOCALES.includes(locale)) {
    notFound();
  }

  let messages = {};
  try {
    messages = await getMessages();
  } catch {
    try {
      const mod = await import(`../../messages/${locale}.json`);
      messages = mod.default || {};
    } catch {
      const mod = await import('../../messages/fr.json');
      messages = mod.default || {};
    }
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <AppLayout>
        <Suspense fallback={
          <div className="p-4">
            <div className="h-8 bg-[#1A1A1A] rounded animate-pulse mb-4" />
            <div className="h-48 bg-[#1A1A1A] rounded animate-pulse" />
          </div>
        }>
          {children}
        </Suspense>
      </AppLayout>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}
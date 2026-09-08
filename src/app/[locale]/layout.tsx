import { Suspense } from 'react';
import { LocaleProvider } from '@/components/layout/localeprovider';
import { AppLayout } from '@/components/layout/applayout';

const VALID_LOCALES = ['fr', 'en', 'ar', 'es'] as const;
type Locale = typeof VALID_LOCALES[number];

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  let locale: Locale = 'fr';
  try {
    const resolved = await params;
    if (resolved?.locale && (VALID_LOCALES as readonly string[]).includes(resolved.locale)) {
      locale = resolved.locale as Locale;
    }
  } catch {}

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <LocaleProvider locale={locale}>
        <Suspense fallback={<div className="p-8 text-center" style={{ color: 'var(--text-3)' }}>Loading...</div>}>
          <AppLayout>{children}</AppLayout>
        </Suspense>
      </LocaleProvider>
    </div>
  );
}

export function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}
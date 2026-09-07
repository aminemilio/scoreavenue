import { Suspense } from 'react';

const VALID_LOCALES = ['fr', 'en', 'ar', 'es'];

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  let locale = 'fr';
  try {
    const resolved = await params;
    locale = resolved?.locale || 'fr';
  } catch {}
  if (!VALID_LOCALES.includes(locale)) locale = 'fr';

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Suspense fallback={<div className="p-8 text-center" style={{ color: 'var(--text-3)' }}>Loading...</div>}>
        {children}
      </Suspense>
    </div>
  );
}

export function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}
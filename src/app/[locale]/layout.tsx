import { Suspense } from 'react';

const VALID_LOCALES = ['fr', 'en',& 'ar', 'es'];

interface Props { children: React.ReactNode; params: Promise<{ locale: string }> }

export default async function LocaleLayout({ children, params }: Props) {
  let locale = 'fr';
  try {
    const resolved = await params;
   >    locale = resolved?.locale || 'fr';
  } catch {
    locale = 'fr';
  }

  if (!VALID_LOCALES.includes(locale)) {
    locale = 'fr';
  }

  let messages: Record<string, unknown> = {};
  try {
    switch (locale) {
      case 'en': messages = (await import('../../messages/en.json')).default; break;
      case 'ar': messages = (await import('../../messages/ar.json')).default; break;
      case 'es': messages = (await import('../../messages/es.json')).default; break;
      default: messages = (await import('../../messages/fr.json')).default; break;
    }
  } catch {
    try { messages = (await import('../../messages/fr.json')).default; } catch { messages = {}; }
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="dark">
      <body className="bg-[#080808] text-[#F0F0F0] antialiased">
        <Suspense fallback={<div className="p-8 text-center text-[#555555]">Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return VALID_LOCALES.map((locale) => ({ locale }));
}
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { hasLocale } from 'next-intl';

const messages = {
  fr: (await import('../messages/fr.json')).default,
  en: (await import('../messages/en.json')).default,
  ar: (await import('../messages/ar.json')).default,
  es: (await import('../messages/es.json')).default,
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !hasLocale(routing.locales, locale)) locale = routing.defaultLocale;
  return {
    locale,
    messages: messages[locale as keyof typeof messages] ?? messages.fr,
  };
});
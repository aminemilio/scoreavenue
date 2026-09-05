import fr from '../../messages/fr.json';
import en from '../../messages/en.json';
import ar from '../../messages/ar.json';
import es from '../../messages/es.json';

const allMessages: Record<string, any> = { fr, en, ar, es };

function getNestedValue(obj: any, key: string): string {
  const parts = key.split('.');
  let result = obj;
  for (const part of parts) {
    result = result?.[part];
  }
  return typeof result === 'string' ? result : key;
}

export function useTranslations(namespace?: string) {
  const locale = (typeof window !== 'undefined' && localStorage.getItem('sa_locale')) || 'fr';
  const messages = allMessages[locale] || allMessages.fr;

  return function t(key: string): string {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return getNestedValue(messages, fullKey);
  };
}

export function useLocale() {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('sa_locale') as any) || 'fr';
  }
  return 'fr';
}
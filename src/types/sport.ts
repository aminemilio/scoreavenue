export const SPORT_SLUGS = {
  FOOTBALL: 'football',
  BASKETBALL: 'basketball',
  TENNIS: 'tennis',
  CRICKET: 'cricket',
  RUGBY: 'rugby',
  HANDBALL: 'handball',
  VOLLEYBALL: 'volleyball',
  FORMULA1: 'formula1',
  MOTOGP: 'motogp',
  ATHLETICS: 'athletics',
  BOXING: 'boxing',
  MMA: 'mma',
  CYCLING: 'cycling',
  GOLF: 'golf',
  AMERICAN_FOOTBALL: 'american_football',
  BASEBALL: 'baseball',
  ICE_HOCKEY: 'ice_hockey',
  TABLE_TENNIS: 'table_tennis',
  BADMINTON: 'badminton',
  SWIMMING: 'swimming',
  ESPORTS: 'esports',
  FIELD_HOCKEY: 'field_hockey',
  NETBALL: 'netball',
  AFL: 'afl',
  GAELIC: 'gaelic',
  SNOOKER: 'snooker',
  padel: 'padel',
  DARTS: 'darts',
} as const;

export type SportSlug = (typeof SPORT_SLUGS)[keyof typeof SPORT_SLUGS];

export interface SportConfig {
  slug: SportSlug;
  label: Record<'en' | 'fr' | 'ar' | 'es', string>;
  icon: string;
  color: string;
  apiSportId?: number;
}

export type Locale = 'en' | 'fr' | 'ar' | 'es';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'fr', 'ar', 'es'];
export const DEFAULT_LOCALE: Locale = 'en';
export type Locale = 'fr' | 'en' | 'ar' | 'es';
export const SUPPORTED_LOCALES: Locale[] = ['fr', 'en', 'ar', 'es'];
export const DEFAULT_LOCALE: Locale = 'fr';
export const RTL_LOCALES: Locale[] = ['ar'];
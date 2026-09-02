export type SportSlug = 'football' | 'basketball' | 'tennis' | 'cricket' | 'rugby' | 'handball' | 'volleyball' | 'formula1' | 'motogp' | 'athletics' | 'boxing' | 'mma' | 'cycling' | 'golf' | 'american_football' | 'baseball' | 'ice_hockey' | 'table_tennis' | 'badminton' | 'swimming' | 'esports' | 'padel';

export interface FeaturedLeague { id: number; name: string; nameAr: string; sport: SportSlug; }

export interface CountryConfig {
  code: string;
  flag: string;
  name: string;
  sportPriority: SportSlug[];
  featuredLeagues: FeaturedLeague[];
}

function c(code: string, flag: string, name: string, sports: SportSlug[], leagues: FeaturedLeague[] = []): CountryConfig {
  return { code, flag, name, sportPriority: sports, featuredLeagues: leagues };
}

export const COUNTRY_SPORTS_MAP: Record<string, CountryConfig> = {
  FR: c('FR', '🇫🇷', 'France', ['football','handball','basketball','tennis','rugby','cycling','formula1'], [
    { id: 61, name: 'Ligue 1', nameAr: 'الدوري الفرنسي', sport: 'football' },
    { id: 62, name: 'Ligue 2', nameAr: 'الدرجة الثانية', sport: 'football' },
  ]),
  GB: c('GB', '🇬🇧', 'United Kingdom', ['football','cricket','rugby','tennis','formula1','boxing'], [
    { id: 39, name: 'Premier League', nameAr: 'الدوري الإنجليزي', sport: 'football' },
    { id: 40, name: 'Championship', nameAr: 'الدرجة الأولى', sport: 'football' },
  ]),
  ES: c('ES', '🇪🇸', 'Spain', ['football','basketball','tennis','handball','cycling','motogp','formula1','padel'], [
    { id: 140, name: 'La Liga', nameAr: 'الدوري الإسباني', sport: 'football' },
    { id: 141, name: 'Segunda División', nameAr: 'الدرجة الثانية', sport: 'football' },
  ]),
  DE: c('DE', '🇩🇪', 'Germany', ['football','handball','basketball','formula1','tennis','ice_hockey'], [
    { id: 78, name: 'Bundesliga', nameAr: 'الدوري الألماني', sport: 'football' },
  ]),
  IT: c('IT', '🇮🇹', 'Italy', ['football','basketball','volleyball','formula1','motogp','tennis','cycling'], [
    { id: 135, name: 'Serie A', nameAr: 'الدوري الإيطالي', sport: 'football' },
  ]),
  PT: c('PT', '🇵🇹', 'Portugal', ['football','handball','basketball','motogp','cycling'], [
    { id: 94, name: 'Primeira Liga', nameAr: 'الدوري البرتغالي', sport: 'football' },
  ]),
  SA: c('SA', '🇸🇦', 'Saudi Arabia', ['football','basketball','volleyball','handball','tennis','formula1'], [
    { id: 307, name: 'Saudi Pro League', nameAr: 'دوري روشن', sport: 'football' },
  ]),
  EG: c('EG', '🇪🇬', 'Egypt', ['football','handball','basketball','volleyball','boxing','tennis'], [
    { id: 233, name: 'Egyptian PL', nameAr: 'الدوري المصري', sport: 'football' },
  ]),
  MA: c('MA', '🇲🇦', 'Morocco', ['football','handball','basketball','athletics','tennis','boxing'], [
    { id: 200, name: 'Botola Pro', nameAr: 'البطولة الاحترافية', sport: 'football' },
  ]),
  DZ: c('DZ', '🇩🇿', 'Algeria', ['football','handball','basketball','volleyball','athletics','boxing'], [
    { id: 180, name: 'Ligue 1', nameAr: 'الرابطة الأولى', sport: 'football' },
  ]),
  TN: c('TN', '🇹🇳', 'Tunisia', ['football','handball','basketball','volleyball','athletics','tennis'], [
    { id: 170, name: 'Ligue 1', nameAr: 'الرابطة الأولى', sport: 'football' },
  ]),
  AE: c('AE', '🇦🇪', 'UAE', ['football','cricket','basketball','handball','formula1','tennis','golf'], [
    { id: 300, name: 'UAE Pro League', nameAr: 'دوري الإمارات', sport: 'football' },
  ]),
  US: c('US', '🇺🇸', 'United States', ['american_football','basketball','baseball','ice_hockey','football','mma','boxing','tennis','golf'], [
    { id: 253, name: 'MLS', nameAr: 'الدوري الأمريكي', sport: 'football' },
  ]),
  BR: c('BR', '🇧🇷', 'Brazil', ['football','volleyball','basketball','mma','formula1','motogp','tennis'], [
    { id: 71, name: 'Serie A', nameAr: 'الدوري البرازيلي', sport: 'football' },
  ]),
  AR: c('AR', '🇦🇷', 'Argentina', ['football','basketball','rugby','handball','volleyball','tennis','motogp','formula1','boxing','padel'], [
    { id: 128, name: 'Liga Profesional', nameAr: 'الدوري الأرجنتيني', sport: 'football' },
  ]),
  MX: c('MX', '🇲🇽', 'Mexico', ['football','baseball','basketball','boxing','formula1','mma','padel'], [
    { id: 262, name: 'Liga MX', nameAr: 'الدوري المكسيكي', sport: 'football' },
  ]),
  JP: c('JP', '🇯🇵', 'Japan', ['baseball','football','basketball','volleyball','formula1','tennis','golf'], [
    { id: 98, name: 'J1 League', nameAr: 'الدوري الياباني', sport: 'football' },
  ]),
  KR: c('KR', '🇰🇷', 'South Korea', ['football','baseball','basketball','volleyball','esports','tennis'], [
    { id: 292, name: 'K League 1', nameAr: 'الدوري الكوري', sport: 'football' },
  ]),
  IN: c('IN', '🇮🇳', 'India', ['cricket','football','badminton','table_tennis','athletics','boxing'], [
    { id: 323, name: 'Indian Super League', nameAr: 'الدوري الهندي', sport: 'football' },
  ]),
  AU: c('AU', '🇦🇺', 'Australia', ['cricket','rugby','football','basketball','tennis','swimming','formula1'], [
    { id: 188, name: 'A-League', nameAr: 'الدوري الأسترالي', sport: 'football' },
  ]),
  NO: c('NO', '🇳🇴', 'Norway', ['football','handball','ice_hockey','skiing','athletics'], [
    { id: 103, name: 'Eliteserien', nameAr: 'الدوري النرويجي', sport: 'football' },
  ]),
  SE: c('SE', '🇸🇪', 'Sweden', ['football','ice_hockey','handball','athletics'], [
    { id: 113, name: 'Allsvenskan', nameAr: 'الدوري السويدي', sport: 'football' },
  ]),
  TR: c('TR', '🇹🇷', 'Turkey', ['football','basketball','volleyball','handball','athletics','boxing','tennis'], [
    { id: 203, name: 'Süper Lig', nameAr: 'الدوري التركي', sport: 'football' },
  ]),
  DEFAULT: c('DEFAULT', '🌍', 'International', ['football','basketball','tennis','formula1','cricket','rugby','athletics','boxing','mma','volleyball'], [
    { id: 2, name: 'Champions League', nameAr: 'دوري أبطال أوروبا', sport: 'football' },
    { id: 3, name: 'Europa League', nameAr: 'الدوري الأوروبي', sport: 'football' },
    { id: 39, name: 'Premier League', nameAr: 'الدوري الإنجليزي', sport: 'football' },
    { id: 140, name: 'La Liga', nameAr: 'الدوري الإسباني', sport: 'football' },
  ]),
};

const TZ_MAP: Record<string, string> = {
  'Europe/Paris': 'FR', 'Europe/London': 'GB', 'Europe/Madrid': 'ES', 'Europe/Berlin': 'DE',
  'Europe/Rome': 'IT', 'Europe/Lisbon': 'PT', 'Europe/Amsterdam': 'NL', 'Europe/Brussels': 'BE',
  'Europe/Stockholm': 'SE', 'Europe/Oslo': 'NO', 'Europe/Copenhagen': 'DK', 'Europe/Warsaw': 'PL',
  'Europe/Istanbul': 'TR', 'Europe/Moscow': 'RU', 'Europe/Athens': 'GR',
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Los_Angeles': 'US',
  'America/Toronto': 'CA', 'America/Mexico_City': 'MX', 'America/Sao_Paulo': 'BR',
  'America/Buenos_Aires': 'AR', 'Asia/Tokyo': 'JP', 'Asia/Seoul': 'KR',
  'Asia/Shanghai': 'CN', 'Asia/Kolkata': 'IN', 'Asia/Dubai': 'AE',
  'Asia/Riyadh': 'SA', 'Asia/Qatar': 'QA', 'Africa/Cairo': 'EG',
  'Africa/Casablanca': 'MA', 'Africa/Algiers': 'DZ', 'Africa/Tunis': 'TN',
  'Africa/Lagos': 'NG', 'Africa/Johannesburg': 'ZA', 'Australia/Sydney': 'AU',
};

export function getCountryConfig(code: string): CountryConfig {
  return COUNTRY_SPORTS_MAP[code.toUpperCase()] ?? COUNTRY_SPORTS_MAP.DEFAULT;
}

export function getSportPriority(code: string): SportSlug[] {
  return getCountryConfig(code).sportPriority;
}

export function getFeaturedLeagues(code: string): FeaturedLeague[] {
  return getCountryConfig(code).featuredLeagues;
}

export function detectCountryFromTimezone(): string {
  try { const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; return TZ_MAP[tz] ?? 'DEFAULT'; }
  catch { return 'DEFAULT'; }
}

export function getAllCountryCodes(): string[] {
  return Object.keys(COUNTRY_SPORTS_MAP).filter(k => k !== 'DEFAULT');
}
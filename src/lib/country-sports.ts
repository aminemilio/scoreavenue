import { Sport } from '@/types'

export interface SportOption {
  id: Sport
  label: string
  emoji: string
}

export const SPORT_CATALOG: SportOption[] = [
  { id: 'football', label: 'Football', emoji: '⚽' },
  { id: 'basketball', label: 'Basketball', emoji: '🏀' },
  { id: 'tennis', label: 'Tennis', emoji: '🎾' },
  { id: 'hockey', label: 'Hockey', emoji: '🏒' },
  { id: 'baseball', label: 'Baseball', emoji: '⚾' },
  { id: 'cricket', label: 'Cricket', emoji: '🏏' },
  { id: 'rugby', label: 'Rugby', emoji: '🏉' },
  { id: 'volleyball', label: 'Volleyball', emoji: '🏐' },
  { id: 'cycling', label: 'Cycling', emoji: '🚴' },
  { id: 'boxing', label: 'Boxing', emoji: '🥊' },
  { id: 'handball', label: 'Handball', emoji: '🤾' },
  { id: 'athletics', label: 'Athletics', emoji: '🏃' },
  { id: 'swimming', label: 'Swimming', emoji: '🏊' },
  { id: 'skiing', label: 'Skiing', emoji: '⛷️' },
  { id: 'golf', label: 'Golf', emoji: '⛳' },
  { id: 'mma', label: 'MMA', emoji: '🥋' },
  { id: 'badminton', label: 'Badminton', emoji: '🏸' },
  { id: 'kabaddi', label: 'Kabaddi', emoji: '🤼' },
  { id: 'sumo', label: 'Sumo', emoji: '🈴' },
  { id: 'esports', label: 'Esports', emoji: '🎮' },
  { id: 'futsal', label: 'Futsal', emoji: '⚽' },
  { id: 'polo', label: 'Polo', emoji: '🐎' },
  { id: 'squash', label: 'Squash', emoji: '🎾' },
  { id: 'netball', label: 'Netball', emoji: '🏀' },
  { id: 'rally', label: 'Rally', emoji: '🏎️' },
  { id: 'muay thai', label: 'Muay Thai', emoji: '🥊' },
  { id: 'water polo', label: 'Water Polo', emoji: '🤽' },
  { id: 'gymnastics', label: 'Gymnastics', emoji: '🤸' },
  { id: 'wrestling', label: 'Wrestling', emoji: '🤼' },
]

export const COUNTRY_CODES = 'AF AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW'.split(' ')

export interface CountryProfile {
  name: string
  flag: string
  sports: Sport[]
  topLeagues: string[]
}

export const COUNTRY_PROFILES: Record<string, CountryProfile> = {
  ES: { name: 'Spain',       flag: '🇪🇸', sports: ['football','basketball','tennis'],        topLeagues: ['La Liga','Copa del Rey'] },
  GB: { name: 'England',     flag: '🏴', sports: ['football','cricket','rugby','tennis'],    topLeagues: ['Premier League','FA Cup'] },
  FR: { name: 'France',      flag: '🇫🇷', sports: ['football','rugby','tennis','basketball'],topLeagues: ['Ligue 1','Top 14'] },
  DE: { name: 'Germany',     flag: '🇩🇪', sports: ['football','basketball','tennis'],        topLeagues: ['Bundesliga','DFB-Pokal'] },
  IT: { name: 'Italy',       flag: '🇮🇹', sports: ['football','basketball','volleyball'],    topLeagues: ['Serie A','Coppa Italia'] },
  PT: { name: 'Portugal',    flag: '🇵🇹', sports: ['football','basketball'],                 topLeagues: ['Primeira Liga'] },
  NL: { name: 'Netherlands', flag: '🇳🇱', sports: ['football','hockey','tennis'],            topLeagues: ['Eredivisie'] },
  BE: { name: 'Belgium',     flag: '🇧🇪', sports: ['football','cycling','tennis'],           topLeagues: ['Pro League'] },
  TR: { name: 'Turkey',      flag: '🇹🇷', sports: ['football','basketball','volleyball'],    topLeagues: ['Süper Lig'] },
  RU: { name: 'Russia',      flag: '🇷🇺', sports: ['football','hockey','basketball'],        topLeagues: ['Premier League Russia'] },
  US: { name: 'USA',         flag: '🇺🇸', sports: ['basketball','baseball','football','hockey','tennis'], topLeagues: ['NFL','NBA','MLB','NHL'] },
  BR: { name: 'Brazil',      flag: '🇧🇷', sports: ['football','basketball','volleyball'],    topLeagues: ['Brasileirão','Copa do Brasil'] },
  MX: { name: 'Mexico',      flag: '🇲🇽', sports: ['football','baseball','boxing'],          topLeagues: ['Liga MX'] },
  AR: { name: 'Argentina',   flag: '🇦🇷', sports: ['football','basketball','tennis','rugby'],topLeagues: ['Liga Profesional'] },
  CA: { name: 'Canada',      flag: '🇨🇦', sports: ['hockey','basketball','football'],        topLeagues: ['NHL','NBA','CFL'] },
  DZ: { name: 'Algeria',     flag: '🇩🇿', sports: ['football','athletics','boxing','handball','basketball'], topLeagues: ['Ligue Professionnelle 1'] },
  MA: { name: 'Morocco',     flag: '🇲🇦', sports: ['football','athletics','boxing'],         topLeagues: ['Botola Pro'] },
  TN: { name: 'Tunisia',     flag: '🇹🇳', sports: ['football','handball','athletics'],       topLeagues: ['Ligue Pro 1 Tunisia'] },
  EG: { name: 'Egypt',       flag: '🇪🇬', sports: ['football','squash','boxing'],            topLeagues: ['Egyptian Premier League'] },
  SA: { name: 'Saudi Arabia',flag: '🇸🇦', sports: ['football','basketball'],                 topLeagues: ['Saudi Pro League'] },
  NG: { name: 'Nigeria',     flag: '🇳🇬', sports: ['football','athletics','boxing'],         topLeagues: ['NPFL'] },
  ZA: { name: 'South Africa',flag: '🇿🇦', sports: ['cricket','rugby','football'],            topLeagues: ['Premier Soccer League'] },
  JP: { name: 'Japan',       flag: '🇯🇵', sports: ['baseball','football','basketball'],      topLeagues: ['J1 League','NPB'] },
  CN: { name: 'China',       flag: '🇨🇳', sports: ['basketball','football','badminton'],     topLeagues: ['Chinese Super League','CBA'] },
  IN: { name: 'India',       flag: '🇮🇳', sports: ['cricket','football','badminton'],        topLeagues: ['IPL','ISL'] },
  KR: { name: 'South Korea', flag: '🇰🇷', sports: ['football','baseball','basketball'],      topLeagues: ['K League 1','KBO'] },
  AU: { name: 'Australia',   flag: '🇦🇺', sports: ['cricket','rugby','football','tennis'],   topLeagues: ['A-League','BBL'] },
  DEFAULT: { name: 'Global', flag: '🌍', sports: ['football','basketball','tennis','hockey','baseball'], topLeagues: ['Champions League','Premier League','NBA'] },
}

export async function detectCountry(): Promise<string> {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const timezoneCountry = TIMEZONE_TO_COUNTRY[timezone]
    if (timezoneCountry) return timezoneCountry

    const locale = Intl.DateTimeFormat().resolvedOptions().locale
    const localeRegion = new Intl.Locale(locale).region
    if (localeRegion && COUNTRY_CODES.includes(localeRegion)) return localeRegion
  } catch {
    // Fall through to the global profile when timezone detection is unavailable.
  }
  return 'DEFAULT'
}

export function getCountryProfile(code: string): CountryProfile {
  if (COUNTRY_PROFILES[code]) return COUNTRY_PROFILES[code]
  if (code && code !== 'DEFAULT') {
    const name = new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code
    return { name, flag: countryFlag(code), sports: COUNTRY_PROFILES.DEFAULT.sports, topLeagues: COUNTRY_PROFILES.DEFAULT.topLeagues }
  }
  return COUNTRY_PROFILES.DEFAULT
}

function countryFlag(code: string): string {
  return code.toUpperCase().replace(/[A-Z]/g, letter => String.fromCodePoint(letter.charCodeAt(0) + 127397))
}

export function getSportOrder(countryCode: string): Sport[] {
  const profile = getCountryProfile(countryCode)
  const allSports = SPORT_CATALOG.map(sport => sport.id)
  const preferred = profile.sports.filter(s => allSports.includes(s))
  const rest = allSports.filter(s => !preferred.includes(s))
  return [...preferred, ...rest]
}

const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  'Africa/Algiers': 'DZ', 'Africa/Casablanca': 'MA', 'Africa/Tunis': 'TN',
  'Africa/Cairo': 'EG', 'Africa/Lagos': 'NG', 'Africa/Johannesburg': 'ZA',
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Los_Angeles': 'US',
  'America/Sao_Paulo': 'BR', 'America/Argentina/Buenos_Aires': 'AR',
  'America/Mexico_City': 'MX', 'America/Toronto': 'CA',
  'Europe/London': 'GB', 'Europe/Paris': 'FR', 'Europe/Berlin': 'DE',
  'Europe/Madrid': 'ES', 'Europe/Rome': 'IT', 'Europe/Lisbon': 'PT',
  'Europe/Moscow': 'RU', 'Europe/Istanbul': 'TR',
  'Asia/Tokyo': 'JP', 'Asia/Shanghai': 'CN', 'Asia/Kolkata': 'IN',
  'Asia/Seoul': 'KR', 'Asia/Riyadh': 'SA',
  'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU',
}

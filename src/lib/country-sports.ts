import { Sport } from '@/types'

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
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) })
    const data = await res.json()
    return data.country_code || 'DEFAULT'
  } catch {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      return TIMEZONE_TO_COUNTRY[tz] || 'DEFAULT'
    } catch {
      return 'DEFAULT'
    }
  }
}

export function getCountryProfile(code: string): CountryProfile {
  return COUNTRY_PROFILES[code] || COUNTRY_PROFILES['DEFAULT']
}

export function getSportOrder(countryCode: string): Sport[] {
  const profile = getCountryProfile(countryCode)
  const allSports: Sport[] = ['football', 'basketball', 'tennis', 'hockey', 'baseball']
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

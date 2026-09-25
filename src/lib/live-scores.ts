import { LeagueGroup, Match, MatchStatus, Sport, Team } from '@/types'
import { rapidApiFetch } from '@/lib/rapidapi'

export type LiveStandingsRow = {
  team: string
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  points: number
  form: string[]
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const num = Number(value)
    if (!Number.isNaN(num)) return num
  }
  return null
}

function stableId(value: string): number {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash >>> 0) || 1
}

function normalizeStatus(raw: unknown): MatchStatus {
  const status = (typeof raw === 'object' && raw !== null) ? raw as Record<string, unknown> : {}
  const rawShort = String(status.short ?? status.code ?? status.type ?? raw ?? 'NS').toUpperCase()
  const short = rawShort === 'INPROGRESS' || rawShort === 'IN_PROGRESS' || rawShort === 'LIVE' || rawShort === 'PLAYING'
    ? 'LIVE'
    : rawShort === 'FINISHED' || rawShort === 'ENDED' || rawShort === 'COMPLETE'
      ? 'FT'
      : rawShort === 'NOTSTARTED' || rawShort === 'NOT_STARTED' || rawShort === 'SCHEDULED'
        ? 'NS'
        : rawShort
  const statusMap: Record<string, MatchStatus> = {
    '1H': { short: '1H', elapsed: 1, long: 'First Half' },
    '2H': { short: '2H', elapsed: 2, long: 'Second Half' },
    'HT': { short: 'HT', elapsed: 45, long: 'Half Time' },
    'FT': { short: 'FT', elapsed: 90, long: 'Match Finished' },
    'NS': { short: 'NS', elapsed: null, long: 'Not Started' },
    'LIVE': { short: 'LIVE', elapsed: null, long: 'Live' },
    'ET': { short: 'ET', elapsed: null, long: 'Extra Time' },
    'PEN': { short: 'PEN', elapsed: null, long: 'Penalties' },
    'AET': { short: 'AET', elapsed: null, long: 'After Extra Time' },
  }

  return statusMap[short] ?? {
    short: short || 'NS',
    elapsed: null,
    long: short || 'Not Started',
  }
}

function normalizeTeam(raw: unknown, fallbackName: string): Team {
  if (typeof raw === 'string' && raw.trim()) {
    return { id: stableId(raw), name: raw, shortName: raw.slice(0, 3).toUpperCase(), logo: '' }
  }
  const team = (typeof raw === 'object' && raw !== null) ? raw as Record<string, unknown> : {}
  const name = String(team.name ?? team.team_name ?? team.full_name ?? fallbackName)
  const shortName = String(team.shortName ?? team.short_name ?? team.abbreviation ?? name.slice(0, 3).toUpperCase())
  const id = toNumber(team.id ?? team.team_id) ?? stableId(name)
  const logo = String(team.logo ?? team.logo_url ?? team.badge ?? `https://api.sofascore.com/api/v1/team/${id}/image`)
  const color = typeof team.color === 'string' ? team.color : undefined
  return {
    id,
    name,
    shortName,
    logo,
    color,
  }
}

function normalizeLeague(raw: unknown): { id: number; name: string; country: string; flag: string; logo: string; season?: number } {
  if (typeof raw === 'string' && raw.trim()) {
    return { id: stableId(raw), name: raw, country: 'World', flag: '🌍', logo: '' }
  }
  const league = (typeof raw === 'object' && raw !== null) ? raw as Record<string, unknown> : {}
  return {
    id: toNumber(league.id ?? league.league_id) ?? stableId(String(league.name ?? league.league_name ?? 'League')),
    name: String(league.name ?? league.league_name ?? 'League'),
    country: String(league.country ?? league.country_name ?? 'World'),
    flag: String(league.flag ?? league.country_flag ?? '🌍'),
    logo: String(league.logo ?? league.logo_url ?? ''),
    season: toNumber(league.season) ?? undefined,
  }
}

function normalizeMatch(raw: unknown, fallbackSport: Sport = 'football'): Match | null {
  if (!raw || typeof raw !== 'object') return null

  const match = raw as Record<string, unknown>
  const fixture = (match.fixture && typeof match.fixture === 'object') ? match.fixture as Record<string, unknown> : {}
  const teams = (match.teams && typeof match.teams === 'object') ? match.teams as Record<string, unknown> : {}
  const goals = (match.goals && typeof match.goals === 'object') ? match.goals as Record<string, unknown> : {}
  const scoreData = (match.score && typeof match.score === 'object') ? match.score as Record<string, unknown> : {}
  const fullTimeScore = (scoreData.fulltime && typeof scoreData.fulltime === 'object') ? scoreData.fulltime as Record<string, unknown> : {}
  const home = normalizeTeam(match.homeTeam ?? match.home_team ?? match.home ?? match.localTeam ?? match.home_team_data ?? teams.home ?? match.HomeTeam, 'Home')
  const away = normalizeTeam(match.awayTeam ?? match.away_team ?? match.away ?? match.visitorTeam ?? match.away_team_data ?? teams.away ?? match.AwayTeam, 'Away')
  const league = normalizeLeague(match.league ?? match.tournament ?? match.competition ?? match.leagueData ?? match.league_info ?? match.League)
  const homeScore = (typeof match.homeScore === 'object' && match.homeScore !== null)
    ? (match.homeScore as Record<string, unknown>).current ?? (match.homeScore as Record<string, unknown>).normaltime
    : match.homeScore
  const awayScore = (typeof match.awayScore === 'object' && match.awayScore !== null)
    ? (match.awayScore as Record<string, unknown>).current ?? (match.awayScore as Record<string, unknown>).normaltime
    : match.awayScore
  const score = {
    home: toNumber(scoreData.home ?? fullTimeScore.home ?? homeScore ?? match.home_score ?? match.goalsHomeTeam ?? match.homeGoals ?? match.score_home ?? goals.home ?? match.HomeTeamScore) ?? null,
    away: toNumber(scoreData.away ?? fullTimeScore.away ?? awayScore ?? match.away_score ?? match.goalsAwayTeam ?? match.awayGoals ?? match.score_away ?? goals.away ?? match.AwayTeamScore) ?? null,
  }

  const sport = String(match.sport ?? match.category ?? match.Sport ?? fallbackSport) as Sport
  const timestamp = toNumber(match.startTimestamp ?? match.start_timestamp ?? fixture.timestamp)
  const date = timestamp ? new Date(timestamp * 1000).toISOString() : String(match.date ?? match.start ?? match.start_time ?? match.fixture_time ?? fixture.date ?? match.DateTime ?? new Date().toISOString())
  const venue = (typeof fixture.venue === 'object' && fixture.venue !== null)
    ? String((fixture.venue as Record<string, unknown>).name ?? '')
    : String(match.venue ?? match.venue_name ?? '')

  return {
    id: toNumber(match.id ?? match.match_id ?? match.fixture_id ?? fixture.id ?? match.GameID) ?? stableId(`${home.name}-${away.name}-${date}`),
    homeTeam: home,
    awayTeam: away,
    score,
    status: normalizeStatus(match.status ?? match.status_short ?? match.statusText ?? match.live_status ?? fixture.status),
    league,
    date,
    venue: venue || undefined,
    sport,
    events: Array.isArray(match.events) ? match.events.map((event) => {
      const eventPayload = event as Record<string, unknown>
      const eventType = String(eventPayload.type ?? 'goal') as 'goal' | 'yellow' | 'red' | 'sub'
      return {
        time: toNumber(eventPayload.time ?? eventPayload.minute) ?? 0,
        team: String(eventPayload.team ?? 'home') === 'away' ? 'away' : 'home',
        type: eventType,
        player: typeof eventPayload.player === 'string' ? eventPayload.player : undefined,
      }
    }) : undefined,
    stats: Array.isArray(match.stats) ? match.stats.map((stat) => {
      const statPayload = stat as Record<string, unknown>
      const homeValue = statPayload.home ?? 0
      const awayValue = statPayload.away ?? 0
      return {
        label: String(statPayload.label ?? 'Stat'),
        home: typeof homeValue === 'number' || typeof homeValue === 'string' ? homeValue : 0,
        away: typeof awayValue === 'number' || typeof awayValue === 'string' ? awayValue : 0,
      }
    }) : undefined
  }
}

function normalizeLeagueGroups(raw: unknown, fallbackSport: Sport = 'football'): LeagueGroup[] {
  if (!raw) return []

  const list: unknown[] = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as any)?.events)
      ? (raw as any).events
    : Array.isArray((raw as any)?.data)
      ? (raw as any).data
      : Array.isArray((raw as any)?.response)
        ? (raw as any).response
        : Array.isArray((raw as any)?.results)
          ? (raw as any).results
          : []

  const groups: LeagueGroup[] = []

  for (const item of list) {
    if (!item || typeof item !== 'object') continue

    const matchObject = item as Record<string, unknown>
      if (Array.isArray(matchObject.matches)) {
        const league = normalizeLeague(matchObject.league ?? matchObject.competition)
        const matches = matchObject.matches
          .map((entry) => normalizeMatch(entry, String(matchObject.sport ?? fallbackSport) as Sport))
        .filter(Boolean) as Match[]

      if (matches.length > 0) {
        groups.push({ league, matches })
      }
      continue
    }

    const match = normalizeMatch(item, fallbackSport)
    if (!match) continue

    const league = match.league
    const existing = groups.find((group) => group.league.id === league.id)
    if (existing) existing.matches.push(match)
    else groups.push({ league, matches: [match] })
  }

  return groups
}

function getFreeSportsApiSport(sport: Sport): string | null {
  const map: Record<Sport, string> = {
    football: 'soccer',
    basketball: 'basketball',
    tennis: 'tennis',
    hockey: 'hockey',
    baseball: 'baseball',
    rugby: 'rugby',
    cricket: 'cricket',
    volleyball: 'volleyball',
    cycling: 'cycling',
    boxing: 'boxing',
    handball: 'handball',
    athletics: 'athletics',
    swimming: 'swimming',
    skiing: 'skiing',
    golf: 'golf',
    mma: 'mma',
    badminton: 'badminton',
    kabaddi: 'kabaddi',
    sumo: 'sumo',
    esports: 'esports',
    futsal: 'soccer',
    polo: 'polo',
    squash: 'squash',
    netball: 'netball',
    rally: 'rally',
    'muay thai': 'muay-thai',
    'water polo': 'water-polo',
    gymnastics: 'gymnastics',
    wrestling: 'wrestling',
    formula1: 'f1',
    padel: 'padel',
  }

  return map[sport] ?? null
}

function getFreeSportsMajorLeaguePaths(sport: Sport): string[] {
  switch (sport) {
    case 'football':
      return ['soccer/eng.1', 'soccer/esp.1', 'soccer/ita.1', 'soccer/ger.1', 'soccer/fra.1', 'soccer/ned.1', 'soccer/uefa.champions']
    case 'basketball':
      return ['basketball/nba', 'basketball/euroleague']
    case 'handball':
      return ['handball/ehf.champions']
    case 'tennis':
      return ['tennis/atp', 'tennis/wta']
    case 'volleyball':
      return ['volleyball/international']
    case 'boxing':
      return ['boxing']
    case 'mma':
      return ['mma/ufc']
    case 'esports':
      return ['esports/lol', 'esports/cs']
    case 'formula1':
      return ['f1']
    case 'padel':
      return ['padel']
    default:
      return []
  }
}

function normalizeEspnStatus(rawType: unknown): MatchStatus {
  const type = (typeof rawType === 'object' && rawType !== null) ? rawType as Record<string, unknown> : {}
  const state = String(type.state ?? type.name ?? type.shortDetail ?? 'pre').toLowerCase()
  const detail = String(type.shortDetail ?? type.detail ?? '').toLowerCase()

  if (state === 'pre' || state === 'scheduled' || detail.includes('scheduled') || detail.includes('not started')) {
    return { short: 'NS', elapsed: null, long: 'Not Started' }
  }

  if (state === 'in' || state === 'live' || detail.includes('half') || detail.includes('live')) {
    return { short: 'LIVE', elapsed: null, long: 'Live' }
  }

  if (state === 'post' || state === 'final' || state === 'complete' || detail.includes('final') || detail.includes('full time')) {
    return { short: 'FT', elapsed: 90, long: 'Match Finished' }
  }

  if (detail.includes('1st half') || detail.includes('1st')) {
    return { short: '1H', elapsed: 1, long: 'First Half' }
  }

  if (detail.includes('2nd half') || detail.includes('2nd')) {
    return { short: '2H', elapsed: 2, long: 'Second Half' }
  }

  return { short: 'NS', elapsed: null, long: 'Not Started' }
}

function normalizeEspnMatch(raw: unknown, fallbackSport: Sport = 'football'): Match | null {
  if (!raw || typeof raw !== 'object') return null

  const event = raw as Record<string, unknown>
  const competitions = Array.isArray(event.competitions) ? event.competitions as Record<string, unknown>[] : []
  const competition = competitions[0] ?? {}
  const competitors = Array.isArray(competition.competitors) ? competition.competitors as Record<string, unknown>[] : []
  if (competitors.length < 2) return null

  const homeCompetitor = competitors.find((competitor) => String(competitor.homeAway ?? '').toLowerCase() === 'home') ?? competitors[0]
  const awayCompetitor = competitors.find((competitor) => String(competitor.homeAway ?? '').toLowerCase() === 'away') ?? competitors[1]

  const homeTeam = (homeCompetitor.team && typeof homeCompetitor.team === 'object') ? homeCompetitor.team as Record<string, unknown> : {}
  const awayTeam = (awayCompetitor.team && typeof awayCompetitor.team === 'object') ? awayCompetitor.team as Record<string, unknown> : {}
  const leagueInfo = (competition.league && typeof competition.league === 'object') ? competition.league as Record<string, unknown> : {}
  const statusInfo = (competition.status && typeof competition.status === 'object') ? competition.status as Record<string, unknown> : {}
  const eventStatusInfo = (event.status && typeof event.status === 'object') ? event.status as Record<string, unknown> : {}

  const homeLogos = Array.isArray(homeTeam.logos) ? (homeTeam.logos as Array<Record<string, unknown>>) : []
  const awayLogos = Array.isArray(awayTeam.logos) ? (awayTeam.logos as Array<Record<string, unknown>>) : []
  const leagueLogos = Array.isArray(leagueInfo.logos) ? (leagueInfo.logos as Array<Record<string, unknown>>) : []
  const homeLogoHref = typeof homeLogos[0] === 'object' && homeLogos[0] !== null ? String(homeLogos[0].href ?? '') : ''
  const awayLogoHref = typeof awayLogos[0] === 'object' && awayLogos[0] !== null ? String(awayLogos[0].href ?? '') : ''
  const leagueLogoHref = typeof leagueLogos[0] === 'object' && leagueLogos[0] !== null ? String(leagueLogos[0].href ?? '') : ''

  const homeName = String(homeTeam.displayName ?? homeTeam.name ?? 'Home')
  const awayName = String(awayTeam.displayName ?? awayTeam.name ?? 'Away')
  const sport = (String((event.sport && typeof event.sport === 'object' ? (event.sport as Record<string, unknown>).name : fallbackSport) ?? fallbackSport) as Sport)
  const date = String(event.date ?? competition.date ?? '')
  const matchKey = `${sport}|${homeName}|${awayName}|${date}`

  return {
    id: toNumber(event.id ?? competition.id) ?? stableId(matchKey),
    homeTeam: {
      id: toNumber(homeTeam.id) ?? stableId(`${sport}|${homeName}`),
      name: homeName,
      shortName: String(homeTeam.shortName ?? homeName.slice(0, 3).toUpperCase()),
      logo: homeLogoHref || String(homeTeam.logo ?? '')
    },
    awayTeam: {
      id: toNumber(awayTeam.id) ?? stableId(`${sport}|${awayName}`),
      name: awayName,
      shortName: String(awayTeam.shortName ?? awayName.slice(0, 3).toUpperCase()),
      logo: awayLogoHref || String(awayTeam.logo ?? '')
    },
    score: {
      home: toNumber(homeCompetitor.score ?? homeCompetitor.points) ?? null,
      away: toNumber(awayCompetitor.score ?? awayCompetitor.points) ?? null,
    },
    status: normalizeEspnStatus(statusInfo.type ?? eventStatusInfo.type ?? {}),
    league: {
      id: toNumber(leagueInfo.id ?? competition.id) ?? stableId(String(leagueInfo.name ?? competition.name ?? 'League')),
      name: String(leagueInfo.name ?? competition.name ?? 'League'),
      country: String(leagueInfo.location ?? 'World'),
      flag: '🌍',
      logo: leagueLogoHref
    },
    date: date || new Date().toISOString(),
    venue: typeof competition.venue === 'object' && competition.venue !== null ? String((competition.venue as Record<string, unknown>).fullName ?? '') : undefined,
    sport,
  }
}

function normalizeEspnGroups(raw: unknown, fallbackSport: Sport = 'football'): LeagueGroup[] {
  if (!raw || typeof raw !== 'object') return []

  const events = Array.isArray((raw as Record<string, unknown>).events)
    ? ((raw as Record<string, unknown>).events as unknown[])
    : []

  const groups: LeagueGroup[] = []

  for (const event of events) {
    const match = normalizeEspnMatch(event, fallbackSport)
    if (!match) continue

    const existing = groups.find((group) => group.league.name === match.league.name)
    if (existing) existing.matches.push(match)
    else groups.push({ league: match.league, matches: [match] })
  }

  return groups
}

const providerSport = (sport: Sport) => sport === 'hockey' ? 'ice-hockey' : sport

type ProviderResult = { response: Response; source: string }

async function fetchJson(url: string, init: RequestInit, source: string): Promise<ProviderResult | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  const abortRequest = () => controller.abort()
  init.signal?.addEventListener('abort', abortRequest, { once: true })
  try {
    const response = await fetch(url, { ...init, cache: 'no-store', signal: controller.signal })
    return response.ok ? { response, source } : null
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
    init.signal?.removeEventListener('abort', abortRequest)
  }
}

function addProviderRequests(requests: Promise<ProviderResult | null>[], sport: Sport) {
  const majorLeaguePaths = getFreeSportsMajorLeaguePaths(sport)
  for (const leaguePath of majorLeaguePaths) {
    requests.push(
      fetchJson(`https://site.api.espn.com/apis/site/v2/sports/${leaguePath}/scoreboard`, {
        headers: { Accept: 'application/json' },
      }, `ESPN ${leaguePath}`)
    )
  }

  const espnSport = getFreeSportsApiSport(sport)
  if (espnSport) {
    const variants = Array.from(new Set([
      espnSport,
      espnSport.replace(/-/g, ' '),
      espnSport.replace(/-/g, ''),
      sport,
      sport.replace(/\s+/g, '-'),
      sport.replace(/\s+/g, ''),
    ])).filter(Boolean)

    for (const variant of variants) {
      requests.push(
        fetchJson(`https://site.api.espn.com/apis/site/v2/sports/${encodeURIComponent(variant)}/scoreboard`, {
          headers: { Accept: 'application/json' },
        }, `ESPN ${variant}`)
      )
    }
  }

  const rapidApiHost = process.env.RAPIDAPI_HOST
  const rapidApiKey = process.env.RAPIDAPI_KEY
  if (rapidApiHost && rapidApiKey) {
    for (const [path, label] of [
      [`/api/v1/sport/${providerSport(sport)}/events/live`, 'live'],
      [`/api/v1/sport/${providerSport(sport)}/events/last/0`, 'recent'],
      [`/api/v1/sport/${providerSport(sport)}/events/next/0`, 'upcoming'],
    ] as const) {
      requests.push(
        rapidApiFetch(path)
          .then(response => response.ok ? { response, source: `RapidAPI ${label}` } : null)
          .catch(() => null)
      )
    }
  }

  const highlightlyKey = process.env.HIGHLIGHTLY_API_KEY ?? process.env.HIGHLIGHTLY_KEY
  if (highlightlyKey) {
    const configuredUrl = process.env.HIGHLIGHTLY_LIVE_URL
    const url = sport === 'football' && configuredUrl
      ? configuredUrl
      : `https://api.highlightly.net/${sport}/events/live`
    requests.push(fetchJson(url, { headers: { 'x-rapidapi-key': highlightlyKey } }, 'Highlightly'))
  }

  const apiFootballKey = process.env.APIFOOTBALL_KEY ?? process.env.API_FOOTBALL_KEY
  if (apiFootballKey && sport === 'football') {
    const headers = { headers: { 'x-apisports-key': apiFootballKey } }
    requests.push(fetchJson(
      process.env.APIFOOTBALL_LIVE_URL ?? 'https://v3.football.api-sports.io/fixtures?live=all',
      headers,
      'API-Football live'
    ))

    const dates = [-1, 0, 1].map(offset => {
      const date = new Date()
      date.setUTCDate(date.getUTCDate() + offset)
      return date.toISOString().slice(0, 10)
    })
    for (const date of dates) {
      requests.push(fetchJson(
        `https://v3.football.api-sports.io/fixtures?date=${date}`,
        headers,
        `API-Football ${date}`
      ))
    }
  }

  const sportsDataKey = process.env.SPORTSDATAIO_KEY ?? process.env.SPORTSDATA_KEY
  if (sportsDataKey) {
    const sportsDataSport = sport === 'football' ? 'soccer' : sport === 'hockey' ? 'nhl' : sport === 'baseball' ? 'mlb' : sport === 'basketball' ? 'nba' : sport === 'golf' ? 'pga' : null
    if (sportsDataSport) {
      const url = process.env.SPORTSDATAIO_LIVE_URL ?? `https://api.sportsdata.io/v3/${sportsDataSport}/scores/json/LiveGames`
      requests.push(fetchJson(url, { headers: { 'Ocp-Apim-Subscription-Key': sportsDataKey } }, 'SportsDataIO'))
    }
  }
}

function mergeProviderGroups(results: Array<{ groups: LeagueGroup[]; source: string }>, countryCode?: string, preferredLeagues: string[] = []): LeagueGroup[] {
  const merged: LeagueGroup[] = []
  const matchKeys = new Set<string>()

  for (const result of results) {
    for (const group of result.groups) {
      let target = merged.find(item => item.league.name === group.league.name)
      if (!target) {
        target = { league: group.league, matches: [] }
        merged.push(target)
      }

      for (const match of group.matches) {
        const day = match.date.slice(0, 10)
        const key = `${match.homeTeam.name.toLowerCase()}|${match.awayTeam.name.toLowerCase()}|${day}`
        if (!matchKeys.has(key)) {
          matchKeys.add(key)
            target.matches.push({ ...match, source: match.source ?? result.source })
        }
      }
    }
  }

  const country = countryCode?.toUpperCase()
  return merged
    .filter(group => group.matches.length > 0)
    .sort((a, b) => {
      const aPreferred = preferredLeagues.some(name => a.league.name.toLowerCase().includes(name.toLowerCase()))
      const bPreferred = preferredLeagues.some(name => b.league.name.toLowerCase().includes(name.toLowerCase()))
      if (aPreferred !== bPreferred) return aPreferred ? -1 : 1
      if (country) {
        const aLocal = a.league.country.toUpperCase() === country
        const bLocal = b.league.country.toUpperCase() === country
        if (aLocal !== bLocal) return aLocal ? -1 : 1
      }
      return a.league.name.localeCompare(b.league.name)
    })
}

export async function fetchLiveMatches(sport: Sport = 'football', options: { countryCode?: string; preferredLeagues?: string[] } = {}): Promise<LeagueGroup[]> {
  const configuredEndpoint = process.env.LIVE_SCORES_API_URL
  const publicEndpoint = process.env.NEXT_PUBLIC_LIVE_SCORES_API_URL
  const requests: Promise<ProviderResult | null>[] = []

  if (configuredEndpoint ?? publicEndpoint) {
    const customKey = process.env.LIVE_SCORES_API_KEY ?? process.env.NEXT_PUBLIC_LIVE_SCORES_API_KEY
    const headers: HeadersInit = { Accept: 'application/json' }
    if (customKey) {
      headers['Authorization'] = `Bearer ${customKey}`
      headers['x-api-key'] = customKey
    }
    requests.push(fetchJson(configuredEndpoint ?? publicEndpoint!, { method: 'GET', headers }, 'Custom'))
  }
  addProviderRequests(requests, sport)

  if (!requests.length) return []

  const responses = await Promise.all(requests)
  const providerGroups: Array<{ groups: LeagueGroup[]; source: string }> = []
  for (const result of responses) {
    if (!result) continue
    try {
      const payload = await result.response.json()
      const groups = result.source.startsWith('ESPN')
        ? normalizeEspnGroups(payload, sport)
        : normalizeLeagueGroups(payload, sport)
      providerGroups.push({ groups, source: result.source })
    } catch {
      // A failing provider must not prevent the other feeds from rendering.
    }
  }

    return mergeProviderGroups(providerGroups, options.countryCode, options.preferredLeagues)
}

export async function getAllMatches(sport: Sport = 'football'): Promise<LeagueGroup[]> {
  return fetchLiveMatches(sport)
}

export async function getStandings(): Promise<Record<string, LiveStandingsRow[]>> {
  const matches = await getAllMatches()
  const table: Record<string, LiveStandingsRow[]> = {}

  for (const group of matches) {
    const map = new Map<string, LiveStandingsRow>()

    for (const match of group.matches) {
      const home = match.homeTeam.name
      const away = match.awayTeam.name
      const homeScore = match.score.home ?? 0
      const awayScore = match.score.away ?? 0

      const addTeam = (teamName: string, goalsFor: number, goalsAgainst: number, win: boolean, draw: boolean, loss: boolean) => {
        const existing = map.get(teamName) ?? {
          team: teamName,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
          form: [],
        }

        existing.played += 1
        existing.goalsFor += goalsFor
        existing.goalsAgainst += goalsAgainst

        if (win) {
          existing.wins += 1
          existing.points += 3
          existing.form.push('W')
        } else if (draw) {
          existing.draws += 1
          existing.points += 1
          existing.form.push('D')
        } else if (loss) {
          existing.losses += 1
          existing.form.push('L')
        }

        map.set(teamName, existing)
      }

      addTeam(home, homeScore, awayScore, homeScore > awayScore, homeScore === awayScore, homeScore < awayScore)
      addTeam(away, awayScore, homeScore, awayScore > homeScore, awayScore === homeScore, awayScore < homeScore)
    }

    table[group.league.name] = Array.from(map.values()).sort((a, b) => b.points - a.points || b.goalsFor - a.goalsAgainst)
  }

  return table
}

import { LeagueGroup, Match, MatchStatus, Sport, Team } from '@/types'

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

function normalizeStatus(raw: unknown): MatchStatus {
  const status = (typeof raw === 'object' && raw !== null) ? raw as Record<string, unknown> : {}
  const short = String(status.short ?? status.code ?? status.type ?? raw ?? 'NS')
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
  const team = (typeof raw === 'object' && raw !== null) ? raw as Record<string, unknown> : {}
  const name = String(team.name ?? team.team_name ?? team.full_name ?? fallbackName)
  const shortName = String(team.shortName ?? team.short_name ?? team.abbreviation ?? name.slice(0, 3).toUpperCase())
  const logo = String(team.logo ?? team.logo_url ?? team.badge ?? '')
  const color = typeof team.color === 'string' ? team.color : undefined
  return {
    id: toNumber(team.id ?? team.team_id) ?? Math.random() * 100000,
    name,
    shortName,
    logo,
    color,
  }
}

function normalizeLeague(raw: unknown): { id: number; name: string; country: string; flag: string; logo: string; season?: number } {
  const league = (typeof raw === 'object' && raw !== null) ? raw as Record<string, unknown> : {}
  return {
    id: toNumber(league.id ?? league.league_id) ?? Date.now(),
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
  const scoreData = (match.score && typeof match.score === 'object') ? match.score as Record<string, unknown> : {}
  const home = normalizeTeam(match.homeTeam ?? match.home_team ?? match.home ?? match.localTeam ?? match.home_team_data, 'Home')
  const away = normalizeTeam(match.awayTeam ?? match.away_team ?? match.away ?? match.visitorTeam ?? match.away_team_data, 'Away')
  const league = normalizeLeague(match.league ?? match.tournament ?? match.competition ?? match.leagueData ?? match.league_info)
  const homeScore = (typeof match.homeScore === 'object' && match.homeScore !== null)
    ? (match.homeScore as Record<string, unknown>).current ?? (match.homeScore as Record<string, unknown>).normaltime
    : match.homeScore
  const awayScore = (typeof match.awayScore === 'object' && match.awayScore !== null)
    ? (match.awayScore as Record<string, unknown>).current ?? (match.awayScore as Record<string, unknown>).normaltime
    : match.awayScore
  const score = {
    home: toNumber(scoreData.home ?? homeScore ?? match.home_score ?? match.goalsHomeTeam ?? match.homeGoals ?? match.score_home) ?? null,
    away: toNumber(scoreData.away ?? awayScore ?? match.away_score ?? match.goalsAwayTeam ?? match.awayGoals ?? match.score_away) ?? null,
  }

  const sport = String(match.sport ?? match.category ?? fallbackSport) as Sport
  const timestamp = toNumber(match.startTimestamp ?? match.start_timestamp)
  const date = timestamp ? new Date(timestamp * 1000).toISOString() : String(match.date ?? match.start ?? match.start_time ?? match.fixture_time ?? new Date().toISOString())

  return {
    id: toNumber(match.id ?? match.match_id ?? match.fixture_id) ?? Date.now(),
    homeTeam: home,
    awayTeam: away,
    score,
    status: normalizeStatus(match.status ?? match.status_short ?? match.statusText ?? match.live_status),
    league,
    date,
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

function normalizeLeagueGroups(raw: unknown): LeagueGroup[] {
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
        .map((entry) => normalizeMatch(entry, String(matchObject.sport ?? 'football') as Sport))
        .filter(Boolean) as Match[]

      if (matches.length > 0) {
        groups.push({ league, matches })
      }
      continue
    }

    const match = normalizeMatch(item)
    if (!match) continue

    const league = match.league
    const existing = groups.find((group) => group.league.id === league.id)
    if (existing) existing.matches.push(match)
    else groups.push({ league, matches: [match] })
  }

  return groups
}

const providerSport = (sport: Sport) => sport === 'hockey' ? 'ice-hockey' : sport

export async function fetchLiveMatches(sport: Sport = 'football'): Promise<LeagueGroup[]> {
  const configuredEndpoint = process.env.LIVE_SCORES_API_URL
  const rapidApiHost = process.env.RAPIDAPI_HOST
  const endpoint = configuredEndpoint ?? (rapidApiHost
    ? `https://${rapidApiHost}/api/v1/sport/${providerSport(sport)}/events/live`
    : process.env.NEXT_PUBLIC_LIVE_SCORES_API_URL)
  const apiKey = process.env.RAPIDAPI_KEY ?? process.env.LIVE_SCORES_API_KEY ?? process.env.NEXT_PUBLIC_LIVE_SCORES_API_KEY

  if (!endpoint) {
    return []
  }

  try {
    const headers: HeadersInit = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    if (apiKey) {
      if (rapidApiHost) {
        ;(headers as Record<string, string>)['x-rapidapi-key'] = String(apiKey)
        ;(headers as Record<string, string>)['x-rapidapi-host'] = rapidApiHost
      } else {
        ;(headers as Record<string, string>)['Authorization'] = `Bearer ${apiKey}`
        ;(headers as Record<string, string>)['x-api-key'] = String(apiKey)
      }
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
      cache: 'no-store',
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return normalizeLeagueGroups(data)
  } catch {
    return []
  }
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

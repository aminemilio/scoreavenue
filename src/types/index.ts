export type Sport = 'football' | 'basketball' | 'tennis' | 'hockey' | 'baseball' | 'rugby' | 'cricket' | 'cycling' | 'boxing' | 'volleyball' | 'handball' | 'athletics' | 'swimming' | 'skiing' | 'golf' | 'MMA' | 'badminton' | 'kabaddi' | 'sumo' | 'esports' | 'futsal' | 'polo' | 'squash' | 'netball' | 'rally' | 'muay thai' | 'water polo' | 'gymnastics' | 'wrestling'

export interface Team {
  id: number
  name: string
  shortName: string
  logo: string
  color?: string
}

export interface League {
  id: number
  name: string
  country: string
  flag: string
  logo: string
  season?: number
}

export interface Score {
  home: number | null
  away: number | null
}

export interface MatchStatus {
  short: string
  elapsed: number | null
  long: string
}

export interface Match {
  id: number
  homeTeam: Team
  awayTeam: Team
  score: Score
  status: MatchStatus
  league: League
  date: string
  venue?: string
  sport: Sport
  events?: MatchEvent[]
  stats?: MatchStat[]
}

export interface MatchEvent {
  time: number
  team: 'home' | 'away'
  type: 'goal' | 'yellow' | 'red' | 'sub'
  player?: string
}

export interface MatchStat {
  label: string
  home: string | number
  away: string | number
}

export interface LeagueGroup {
  league: League
  matches: Match[]
}

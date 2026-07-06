import { LeagueGroup } from '@/types'

export const MOCK_FOOTBALL: LeagueGroup[] = [
  {
    league: { id: 39, name: 'Premier League', country: 'England', flag: '🏴', logo: '', season: 2025 },
    matches: [
      {
        id: 1001,
        homeTeam: { id: 42, name: 'Arsenal', shortName: 'ARS', logo: '', color: '#EF0107' },
        awayTeam: { id: 50, name: 'Manchester City', shortName: 'MCI', logo: '', color: '#6CABDD' },
        score: { home: 2, away: 1 },
        status: { short: '2H', elapsed: 67, long: 'Second Half' },
        league: { id: 39, name: 'Premier League', country: 'England', flag: '🏴', logo: '' },
        date: new Date().toISOString(),
        sport: 'football',
        events: [
          { time: 23, team: 'home', type: 'goal', player: 'Saka' },
          { time: 61, team: 'home', type: 'goal', player: 'Martinelli' },
          { time: 65, team: 'away', type: 'goal', player: 'Haaland' },
        ],
        stats: [
          { label: 'Shots', home: 14, away: 9 },
          { label: 'Possession', home: 48, away: 52 },
          { label: 'Corners', home: 6, away: 4 },
        ]
      },
      {
        id: 1002,
        homeTeam: { id: 40, name: 'Liverpool', shortName: 'LIV', logo: '', color: '#C8102E' },
        awayTeam: { id: 49, name: 'Chelsea', shortName: 'CHE', logo: '', color: '#034694' },
        score: { home: 1, away: 1 },
        status: { short: 'HT', elapsed: 45, long: 'Half Time' },
        league: { id: 39, name: 'Premier League', country: 'England', flag: '🏴', logo: '' },
        date: new Date().toISOString(),
        sport: 'football',
        stats: [{ label: 'Shots', home: 7, away: 6 }]
      },
      {
        id: 1003,
        homeTeam: { id: 47, name: 'Tottenham', shortName: 'TOT', logo: '', color: '#132257' },
        awayTeam: { id: 33, name: 'Man United', shortName: 'MUN', logo: '', color: '#DA291C' },
        score: { home: 3, away: 0 },
        status: { short: 'FT', elapsed: 90, long: 'Match Finished' },
        league: { id: 39, name: 'Premier League', country: 'England', flag: '🏴', logo: '' },
        date: new Date().toISOString(),
        sport: 'football',
      },
      {
        id: 1004,
        homeTeam: { id: 45, name: 'Everton', shortName: 'EVE', logo: '', color: '#003399' },
        awayTeam: { id: 39, name: 'Wolves', shortName: 'WOL', logo: '', color: '#FDB913' },
        score: { home: null, away: null },
        status: { short: 'NS', elapsed: null, long: 'Not Started' },
        league: { id: 39, name: 'Premier League', country: 'England', flag: '🏴', logo: '' },
        date: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        sport: 'football',
      },
    ]
  },
  {
    league: { id: 2, name: 'UEFA Champions League', country: 'Europe', flag: '🇪🇺', logo: '', season: 2025 },
    matches: [
      {
        id: 2001,
        homeTeam: { id: 541, name: 'Real Madrid', shortName: 'RMA', logo: '', color: '#FEBE10' },
        awayTeam: { id: 157, name: 'Bayern Munich', shortName: 'BAY', logo: '', color: '#DC052D' },
        score: { home: 2, away: 2 },
        status: { short: '2H', elapsed: 81, long: 'Second Half' },
        league: { id: 2, name: 'UEFA Champions League', country: 'Europe', flag: '🇪🇺', logo: '' },
        date: new Date().toISOString(),
        sport: 'football',
        events: [{ time: 55, team: 'away', type: 'red', player: 'Kimmich' }],
        stats: [{ label: 'Shots', home: 11, away: 8 }]
      },
      {
        id: 2002,
        homeTeam: { id: 85, name: 'PSG', shortName: 'PSG', logo: '', color: '#004170' },
        awayTeam: { id: 165, name: 'Dortmund', shortName: 'BVB', logo: '', color: '#FDE100' },
        score: { home: null, away: null },
        status: { short: 'NS', elapsed: null, long: 'Not Started' },
        league: { id: 2, name: 'UEFA Champions League', country: 'Europe', flag: '🇪🇺', logo: '' },
        date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        sport: 'football',
      },
    ]
  },
  {
    league: { id: 140, name: 'La Liga', country: 'Spain', flag: '🇪🇸', logo: '', season: 2025 },
    matches: [
      {
        id: 3001,
        homeTeam: { id: 529, name: 'Barcelona', shortName: 'FCB', logo: '', color: '#A50044' },
        awayTeam: { id: 530, name: 'Atletico Madrid', shortName: 'ATM', logo: '', color: '#CB3524' },
        score: { home: 1, away: 0 },
        status: { short: 'FT', elapsed: 90, long: 'Match Finished' },
        league: { id: 140, name: 'La Liga', country: 'Spain', flag: '🇪🇸', logo: '' },
        date: new Date().toISOString(),
        sport: 'football',
      },
    ]
  },
  {
    league: { id: 61, name: 'Ligue 1', country: 'France', flag: '🇫🇷', logo: '', season: 2025 },
    matches: [
      {
        id: 4001,
        homeTeam: { id: 91, name: 'Monaco', shortName: 'MON', logo: '', color: '#D4000D' },
        awayTeam: { id: 80, name: 'Lyon', shortName: 'LYO', logo: '', color: '#003F8E' },
        score: { home: 0, away: 0 },
        status: { short: '1H', elapsed: 32, long: 'First Half' },
        league: { id: 61, name: 'Ligue 1', country: 'France', flag: '🇫🇷', logo: '' },
        date: new Date().toISOString(),
        sport: 'football',
        stats: [{ label: 'Shots', home: 4, away: 3 }]
      },
    ]
  },
]

export const MOCK_NBA: LeagueGroup[] = [
  {
    league: { id: 12, name: 'NBA', country: 'USA', flag: '🇺🇸', logo: '', season: 2025 },
    matches: [
      {
        id: 5001,
        homeTeam: { id: 1, name: 'Boston Celtics', shortName: 'BOS', logo: '', color: '#007A33' },
        awayTeam: { id: 14, name: 'LA Lakers', shortName: 'LAL', logo: '', color: '#552583' },
        score: { home: 98, away: 94 },
        status: { short: '2H', elapsed: null, long: 'Q4 3:12' },
        league: { id: 12, name: 'NBA', country: 'USA', flag: '🇺🇸', logo: '' },
        date: new Date().toISOString(),
        sport: 'basketball',
        stats: [
          { label: 'FG%', home: '48%', away: '43%' },
          { label: 'Rebounds', home: 44, away: 39 },
        ]
      },
      {
        id: 5002,
        homeTeam: { id: 11, name: 'Golden State', shortName: 'GSW', logo: '', color: '#1D428A' },
        awayTeam: { id: 7, name: 'Denver Nuggets', shortName: 'DEN', logo: '', color: '#0E2240' },
        score: { home: 102, away: 109 },
        status: { short: 'FT', elapsed: null, long: 'Final' },
        league: { id: 12, name: 'NBA', country: 'USA', flag: '🇺🇸', logo: '' },
        date: new Date().toISOString(),
        sport: 'basketball',
      },
    ]
  }
]

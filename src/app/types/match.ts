import type { SportSlug } from './sport';

export type MatchStatus =
  | 'live' | 'ht' | 'et' | 'pen' | 'ft' | 'aet' | 'p'
  | 'postp' | 'canc' | 'abnd' | 'awd' | 'wo'
  | 'upcoming' | 'ns';

export interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
}

export interface MatchEvent {
  type: string;
  minute: number;
  team: 'home' | 'away';
  player: { id: number; name: string };
  assist?: { id: number; name: string };
}

export interface MatchListItem {
  id: number;
  sport: SportSlug;
  leagueId: number;
  leagueName: string;
  leagueNameAr?: string;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    logo: string;
    primaryColor: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    logo: string;
    primaryColor: string;
  };
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  minute?: number;
  startTime: string;
  events?: MatchEvent[];
}
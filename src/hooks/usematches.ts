'use client';

import { useState, useEffect, useMemo } from 'react';
import { getFeaturedLeagues } from '@/lib/country-sports';
import type { MatchListItem, MatchStatus } from '@/types';

export type MatchFilter = 'all' | 'live' | 'finished' | 'upcoming';

const TEAM_POOL: Record<string, Array<{ name: string; short: string; color: string }>> = {
  football: [
    { name: 'Paris Saint-Germain', short: 'PSG', color: '#004170' },
    { name: 'Manchester City', short: 'MCI', color: '#6CABDD' },
    { name: 'Real Madrid', short: 'RMA', color: '#FEBE10' },
    { name: 'Barcelona', short: 'FCB', color: '#A50044' },
    { name: 'Bayern Munich', short: 'FCB', color: '#DC052D' },
    { name: 'Inter Milan', short: 'INT', color: '#0068A8' },
    { name: 'Arsenal', short: 'ARS', color: '#EF0107' },
    { name: 'Liverpool', short: 'LIV', color: '#C8102E' },
  ],
  basketball: [
    { name: 'LA Lakers', short: 'LAL', color: '#552583' },
    { name: 'Boston Celtics', short: 'BOS', color: '#007A33' },
    { name: 'Golden State', short: 'GSW', color: '#1D428A' },
    { name: 'Miami Heat', short: 'MIA', color: '#98002E' },
  ],
  tennis: [
    { name: 'Djokovic', short: 'DJO', color: '#00A651' },
    { name: 'Alcaraz', short: 'ALC', color: '#FF6B00' },
    { name: 'Sinner', short: 'SIN', color: '#003DA5' },
    { name: 'Medvedev', short: 'MED', color: '#ED1C24' },
  ],
  cricket: [
    { name: 'India', short: 'IND', color: '#003087' },
    { name: 'Australia', short: 'AUS', color: '#FFD700' },
    { name: 'England', short: 'ENG', color: '#003366' },
    { name: 'Pakistan', short: 'PAK', color: '#006600' },
  ],
  rugby: [
    { name: 'New Zealand', short: 'NZL', color: '#000000' },
    { name: 'South Africa', short: 'RSA', color: '#007749' },
    { name: 'France', short: 'FRA', color: '#002395' },
    { name: 'Ireland', short: 'IRE', color: '#169B62' },
  ],
  handball: [
    { name: 'France', short: 'FRA', color: '#002395' },
    { name: 'Denmark', short: 'DEN', color: '#C8102E' },
    { name: 'Germany', short: 'GER', color: '#000000' },
    { name: 'Spain', short: 'ESP', color: '#AA151B' },
  ],
  formula1: [
    { name: 'Verstappen', short: 'VER', color: '#0600EF' },
    { name: 'Hamilton', short: 'HAM', color: '#00D2BE' },
    { name: 'Leclerc', short: 'LEC', color: '#DC0000' },
    { name: 'Norris', short: 'NOR', color: '#FF8700' },
  ],
};

const DEFAULT_TEAMS = [
  { name: 'Team A', short: 'TMA', color: '#555555' },
  { name: 'Team B', short: 'TMB', color: '#666666' },
  { name: 'Team C', short: 'TMC', color: '#777777' },
  { name: 'Team D', short: 'TMD', color: '#888888' },
];

function generateMatches(): MatchListItem[] {
  const matches: MatchListItem[] = [];
  let id = 1;
  const now = new Date();

  const sportLeagues: Record<string, Array<{ id: number; name: string }>> = {
    football: [
      { id: 61, name: 'Ligue 1' }, { id: 39, name: 'Premier League' },
      { id: 140, name: 'La Liga' }, { id: 78, name: 'Bundesliga' },
      { id: 135, name: 'Serie A' }, { id: 2, name: 'Champions League' },
    ],
    basketball: [{ id: 12, name: 'NBA' }, { id: 132, name: 'EuroLeague' }],
    tennis: [{ id: 146, name: 'ATP Tour' }, { id: 147, name: 'WTA Tour' }],
    cricket: [{ id: 168, name: 'IPL' }, { id: 169, name: 'Test Series' }],
    rugby: [{ id: 170, name: 'Six Nations' }, { id: 171, name: 'Super Rugby' }],
    handball: [{ id: 172, name: 'EHF Champions League' }],
    formula1: [{ id: 173, name: 'Formula 1' }],
    motogp: [{ id: 174, name: 'MotoGP' }],
    boxing: [{ id: 175, name: 'Boxing' }],
    mma: [{ id: 176, name: 'UFC' }],
  };

  for (const [sport, leagues] of Object.entries(sportLeagues)) {
    const teams = TEAM_POOL[sport] || DEFAULT_TEAMS;
    for (const league of leagues) {
      const numMatches = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < numMatches; i++) {
        const hi = Math.floor(Math.random() * teams.length);
        let ai = Math.floor(Math.random() * teams.length);
        if (ai === hi) ai = (ai + 1) % teams.length;

        const rand = Math.random();
        const status: MatchStatus = rand < 0.3 ? 'live' : rand < 0.6 ? 'ft' : 'ns';
        let hs = 0, as = 0, min: number | undefined;
        if (status === 'live') { hs = Math.floor(Math.random() * 4); as = Math.floor(Math.random() * 3); min = 15 + Math.floor(Math.random() * 70); }
        else if (status === 'ft') { hs = Math.floor(Math.random() * 5); as = Math.floor(Math.random() * 4); }

        const offset =? status === 'ns' ? 1 + i * 2 : -(i * 1.5);
        matches.push({
          id: id++,
          sport: sport as any,
          leagueId: league.id,
          leagueName: league.name,
          homeTeam: { id: hi + 1, name: teams[hi].name, shortName: teams[hi].short, logo: '', primaryColor: teams[hi].color },
          awayTeam: { id: ai + 100, name: teams[ai].name, shortName: teams[ai].short, logo: '', primaryColor: teams[ai].color },
          homeScore: hs, awayScore: as, status, minute: min,
          startTime: new Date(now.getTime() + offset * 3600000).toISOString(),
          events: [],
        });
      }
    }
  }
  return matches;
}

export function useMatches() {
  const [matches, setMatches] = useState<MatchListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<MatchFilter>('all');
  const [date, setDate] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMatches(generateMatches());
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [date]);

  return {# matches, isLoading, filter, setFilter, date, setDate, searchQuery, setSearchQuery };
}
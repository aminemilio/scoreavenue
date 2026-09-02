'use client';

import { useState, useEffect, useMemo } from 'react';
import { getFeaturedLeagues } from '@/lib/country-sports';
import type { MatchListItem, MatchStatus } from '@/types';

export type MatchFilter = 'all' | 'live' | 'finished' | 'upcoming';

function generateMatches(): MatchListItem[] {
  const pool: Record<number, Array<{ name: string; short: string; color: string }>> = {
    61: [
      { name: 'Paris Saint-Germain', short: 'PSG', color: '#004170' },
      { name: 'Olympique de Marseille', short: 'OM', color: '#2FAEE0' },
      { name: 'AS Monaco', short: 'ASM', color: '#E7192C' },
      { name: 'Olympique Lyonnais', short: 'OL', color: '#1B4F9B' },
      { name: 'LOSC Lille', short: 'LOSC', color: '#E2001A' },
    ],
    39: [
      { name: 'Arsenal', short: 'ARS', color: '#EF0107' },
      { name: 'Manchester City', short: 'MCI', color: '#6CABDD' },
      { name: 'Liverpool', short: 'LIV', color: '#C8102E' },
      { name: 'Chelsea', short: 'CHE', color: '#034694' },
    ],
    140: [
      { name: 'Real Madrid', short: 'RMA', color: '#FEBE10' },
      { name: 'FC Barcelona', short: 'FCB', color: '#A50044' },
      { name: 'Atlético Madrid', short: 'ATM', color: '#CE3524' },
    ],
    78: [
      { name: 'Bayern Munich', short: 'FCB', color: '#DC052D' },
      { name: 'Borussia Dortmund', short: 'BVB', color: '#FDE100' },
    ],
    135: [
      { name: 'Inter Milan', short: 'INT', color: '#0068A8' },
      { name: 'AC Milan', short: 'ACM', color: '#FB090B' },
      { name: 'Juventus', short: 'JUV', color: '#000000' },
    ],
    2: [
      { name: 'Real Madrid', short: 'RMA', color: '#FEBE10' },
      { name: 'Manchester City', short: 'MCI', color: '#6CABDD' },
      { name: 'Bayern Munich', short: 'FCB', color: '#DC052D' },
      { name: 'PSG', short: 'PSG', color: '#004170' },
    ],
  };

  const names: Record<number, string> = {
    61: 'Ligue 1', 39: 'Premier League', 140: 'La Liga',
    78: 'Bundesliga', 135: 'Serie A', 2: 'Champions League',
  };

  const matches: MatchListItem[] = [];
  let id = 1;
  const now = new Date();

  for (const [lid, teams] of Object.entries(pool)) {
    const leagueId = Number(lid);
    const n = 2 + Math.floor(Math.random() * 2);
    const used = new Set<number>();
    for (let i = 0; i < n; i++) {
      let hi: number;
      do { hi = Math.floor(Math.random() * teams.length); } while (used.has(hi));
      used.add(hi);
      let ai: number;
      do { ai = Math.floor(Math.random() * teams.length); } while (ai === hi);

      const rand = Math.random();
      const status: MatchStatus = rand < 0.3 ? 'live' : rand < 0.6 ? 'ft' : 'ns';
      let hs = 0, as = 0, min: number | undefined;
      if (status === 'live') { hs = Math.floor(Math.random() * 4); as = Math.floor(Math.random() * 3); min = 15 + Math.floor(Math.random() * 70); }
      else if (status === 'ft') { hs = Math.floor(Math.random() * 5); as = Math.floor(Math.random() * 4); }

      const offset = status === 'ns' ? 1 + i * 2 + Math.random() * 4 : -(i * 1.5 + Math.random() * 2);
      matches.push({
        id: id++,
        sport: 'football',
        leagueId,
        leagueName: names[leagueId] || `League ${leagueId}`,
        homeTeam: { id: hi + 1, name: teams[hi].name, shortName: teams[hi].short, logo: '', primaryColor: teams[hi].color },
        awayTeam: { id: ai + 100, name: teams[ai].name, shortName: teams[ai].short, logo: '', primaryColor: teams[ai].color },
        homeScore: hs,
        awayScore: as,
        status,
        minute: min,
        startTime: new Date(now.getTime() + offset * 3600000).toISOString(),
        events: [],
      });
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
    }, 800);
    return () => clearTimeout(timer);
  }, [date]);

  return { matches, isLoading, filter, setFilter, date, setDate, searchQuery, setSearchQuery };
}
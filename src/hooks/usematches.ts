'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAppStore } from '@/stores/useappstore';
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
  motogp: [
    { name: 'Marquez', short: 'MRQ', color: '#EE0000' },
    { name: 'Bagnaia', short: 'BAG', color: '#DC0000' },
    { name: 'Bastianini', short: 'BST', color: '#00E5FF' },
    { name: 'Martin', short: 'MTN', color: '#000000' },
  ],
  boxing: [
    { name: 'Fury', short: 'FUR', color: '#8B0000' },
    { name: 'Usyk', short: 'USY', color: '#005BBB' },
    { name: 'Joshua', short: 'JOS', color: '#000000' },
    { name: 'Canelo', short: 'CAN', color: '#B8860B' },
  ],
  mma: [
    { name: 'Jones', short: 'JON', color: '#000000' },
    { name: 'Adesanya', short: 'ADE', color: '#000000' },
    { name: 'Makhachev', short: 'MAK', color: '#003DA5' },
    { name: 'Pereira', short: 'PER', color: '#009C3B' },
  ],
  volleyball: [
    { name: 'Brazil', short: 'BRA', color: '#009C3B' },
    { name: 'Italy', short: 'ITA', color: '#008C45' },
    { name: 'Poland', short: 'POL', color: '#DC143C' },
    { name: 'USA', short: 'USA', color: '#003087' },
  ],
  athletics: [
    { name: 'Lyles', short: 'LYL', color: '#003087' },
    { name: 'Duplantis', short: 'DUP', color: '#006AA7' },
    { name: 'Thompson', short: 'THO', color: '#00247D' },
    { name: 'Hassan', short: 'HAS', color: '#AE1C28' },
  ],
  golf: [
    { name: 'McIlroy', short: 'MCI', color: '#006633' },
    { name: 'Scheffler', short: 'SCH', color: '#BF0A30' },
    { name: 'Rahm', short: 'RAH', color: '#AA151B' },
    { name: 'Schauffele', short: 'SCF', color: '#003087' },
  ],
  cycling: [
    { name: 'Pogacar', short: 'POG', color: '#005DA4' },
    { name: 'Vingegaard', short: 'VIN', color: '#C8102E' },
    { name: 'Evenepoel', short: 'EVE', color: '#000000' },
    { name: 'Van der Poel', short: 'VDP', color: '#F36C21' },
  ],
  american_football: [
    { name: 'Chiefs', short: 'KC', color: '#E31837' },
    { name: 'Eagles', short: 'PHI', color: '#004C54' },
    { name: '49ers', short: 'SF', color: '#AA0000' },
    { name: 'Ravens', short: 'BAL', color: '#241773' },
  ],
  baseball: [
    { name: 'Yankees', short: 'NYY', color: '#003087' },
    { name: 'Dodgers', short: 'LAD', color: '#005A9C' },
    { name: 'Braves', short: 'ATL', color: '#CE1141' },
    { name: 'Astros', short: 'HOU', color: '#EB6E1F' },
  ],
  ice_hockey: [
    { name: 'Oilers', short: 'EDM', color: '#041E42' },
    { name: 'Rangers', short: 'NYR', color: '#0038A8' },
    { name: 'Avalanche', short: 'COL', color: '#6F263D' },
    { name: 'Panthers', short: 'FLA', color: '#041E42' },
  ],
  table_tennis: [
    { name: 'Fan Zhendong', short: 'FZD', color: '#DE2910' },
    { name: 'Ma Long', short: 'MAL', color: '#DE2910' },
    { name: 'Ovtcharov', short: 'OVT', color: '#000000' },
    { name: 'Lin Yun-Ju', short: 'LYJ', color: '#FE0000' },
  ],
  badminton: [
    { name: 'Axelsen', short: 'AXE', color: '#C8102E' },
    { name: 'Momota', short: 'MOM', color: '#BC002D' },
    { name: 'Chen Long', short: 'CHL', color: '#DE2910' },
    { name: 'Antonsen', short: 'ANT', color: '#C8102E' },
  ],
  swimming: [
    { name: 'Dressel', short: 'DRE', color: '#003087' },
    { name: 'Marchand', short: 'MAR', color: '#002395' },
    { name: 'Popovici', short: 'POP', color: '#002B7F' },
    { name: 'Wang Shun', short: 'WAS', color: '#DE2910' },
  ],
  esports: [
    { name: 'T1', short: 'T1', color: '#E2012D' },
    { name: 'G2 Esports', short: 'G2', color: '#000000' },
    { name: 'Fnatic', short: 'FNC', color: '#FF5900' },
    { name: 'Team Liquid', short: 'TL', color: '#001A2B' },
  ],
  padel: [
    { name: 'Galan', short: 'GAL', color: '#AA151B' },
    { name: 'Lebron', short: 'LEB', color: '#AA151B' },
    { name: 'Coello', short: 'COE', color: '#AA151B' },
    { name: 'Tapia', short: 'TAP', color: '#75AADB' },
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
    volleyball: [{ id: 180, name: 'FIVB World Championship' }, { id: 181, name: 'CEV Champions League' }],
    athletics: [{ id: 182, name: 'Diamond League' }],
    golf: [{ id: 183, name: 'PGA Tour' }],
    cycling: [{ id: 184, name: 'UCI World Tour' }],
    american_football: [{ id: 185, name: 'NFL' }],
    baseball: [{ id: 186, name: 'MLB' }],
    ice_hockey: [{ id: 187, name: 'NHL' }],
    table_tennis: [{ id: 188, name: 'ITTF World Tour' }],
    badminton: [{ id: 189, name: 'BWF World Tour' }],
    swimming: [{ id: 190, name: 'World Aquatics Championships' }],
    esports: [{ id: 191, name: 'ESL Pro League' }],
    padel: [{ id: 192, name: 'Premier Padel' }],
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

        const offset = status === 'ns' ? 1 + i * 2 : -(i * 1.5);
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

function isSameRelativeDay(iso: string, dateKey: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  const startOfDay = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const dayDiff = Math.round((startOfDay(d) - startOfDay(now)) / 86400000);
  if (dateKey === 'today') return dayDiff === 0;
  if (dateKey === 'yesterday') return dayDiff === -1;
  if (dateKey === 'tomorrow') return dayDiff === 1;
  return d.toISOString().split('T')[0] === dateKey;
}

export function useMatches() {
  const allMatches = useAppStore((s) => s.allMatches);
  const setAllMatches = useAppStore((s) => s.setAllMatches);
  const activeFilter = useAppStore((s) => s.activeFilter);
  const setActiveFilter = useAppStore((s) => s.setActiveFilter);
  const activeDate = useAppStore((s) => s.activeDate);
  const setActiveDate = useAppStore((s) => s.setActiveDate);
  const setLiveCount = useAppStore((s) => s.setLiveCount);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (allMatches.length === 0) {
      setAllMatches(generateMatches());
    }
  }, [allMatches.length, setAllMatches]);

  useEffect(() => {
    const count = allMatches.filter((m) => m.status === 'live' || m.status === 'ht').length;
    setLiveCount(count);
  }, [allMatches, setLiveCount]);

  const dateFiltered = useMemo(
    () => allMatches.filter((m) => isSameRelativeDay(m.startTime, activeDate)),
    [allMatches, activeDate]
  );

  const isLoading = allMatches.length === 0;

  return {
    matches: dateFiltered,
    allMatches,
    isLoading,
    filter: activeFilter as MatchFilter,
    setFilter: setActiveFilter,
    date: activeDate,
    setDate: setActiveDate,
    searchQuery,
    setSearchQuery,
  };
}
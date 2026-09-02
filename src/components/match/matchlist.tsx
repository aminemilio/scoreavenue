'use client';

import { useState, useMemo } from 'react';
import { useFavorites } from '@/hooks';
import { LeagueSection } from './leaguesection';
import type { MatchListItem } from '@/types';

interface Props {
  matches: MatchListItem[];
  showSearch?: boolean;
}

export function MatchList({ matches, showSearch = false }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return matches;
    const q = searchQuery.toLowerCase();
    return matches.filter(m =>
      m.homeTeam.name.toLowerCase().includes(q) ||
      m.awayTeam.name.toLowerCase().includes(q) ||
      m.leagueName.toLowerCase().includes(q)
    );
  }, [matches, searchQuery]);

  const grouped = useMemo(() => {
    const g = new Map<number, MatchListItem[]>();
    for (const m of filtered) {
      const existing = g.get(m.leagueId);
      if (existing) existing.push(m);
      else g.set(m.leagueId, [m]);
    }
    return g;
  }, [filtered]);

  return (
    <div>
      {showSearch && (
        <div className="px-4 pb-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams, matches..."
            className="w-full bg-[#111111] border border-[#1E1E1E] rounded-lg px-3 py-2 text-sm text-[#F0F0F0] placeholder:text-[#444444] outline-none focus:border-[#333333]"
          />
        </div>
      )}
      <div className="overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#555555]">
            <p className="text-sm">No matches found</p>
          </div>
        ) : (
          Array.from(grouped.entries()).map(([leagueId, leagueMatches]) => (
            <LeagueSection
              key={leagueId}
              leagueName={leagueMatches[0].leagueName}
              matches={leagueMatches}
            />
          ))
        )}
      </div>
    </div>
  );
}
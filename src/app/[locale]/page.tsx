'use client';

import { useTranslations } from '@/hooks/usetranslation';
import { useMatches } from '@/hooks';
import { MatchRow, LeagueSection } from '@/components/match';
import { useAppStore } from '@/stores/useappstore';
import { useState, useMemo } from 'react';

export default function HomePage() {
  const t = useTranslations();
  const { matches, isLoading, filter, setFilter, date, setDate } = useMatches();
  const activeSport = useAppStore(s => s.activeSport);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = matches.filter(m => m.sport === activeSport);
    if (filter === 'live') result = result.filter(m => m.status === 'live' || m.status === 'ht');
    else if (filter === 'finished') result = result.filter(m => m.status === 'ft' || m.status === 'aet');
    else if (filter === 'upcoming') result = result.filter(m => m.status === 'ns');
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(m => m.homeTeam.name.toLowerCase().includes(q) || m.awayTeam.name.toLowerCase().includes(q));
    }
    return result;
  }, [matches, filter, search, activeSport]);

  const grouped = useMemo(() => {
    const g: Record<number, typeof filtered> = {};
    for (const m of filtered) {
      if (!g[m.leagueId]) g[m.leagueId] = [];
      g[m.leagueId].push(m);
    }
    return g;
  }, [filtered]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-3 pb-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-3)] outline-none focus:border-[var(--border)]"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[var(--surface-2)]">
                <div className="w-10 h-4 bg-[var(--surface-2)] rounded animate-pulse" />
                <div className="flex-1 h-3.5 bg-[var(--surface-2)] rounded animate-pulse" />
                <div className="w-12 h-5 bg-[var(--surface-2)] rounded animate-pulse" />
                <div className="flex-1 h-3.5 bg-[var(--surface-2)] rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[var(--text-3)]">
            <p className="text-sm">{t('common.no_data')}</p>
          </div>
        ) : (
          Object.entries(grouped).map(([lid, lmatches]) => (
            <LeagueSection key={lid} leagueName={lmatches[0].leagueName} matches={lmatches} />
          ))
        )}
      </div>
    </div>
  );
}
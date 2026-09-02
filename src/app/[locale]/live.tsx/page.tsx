'use client';

import { useTranslations } from 'next-intl';
import { useMatches, useLiveUpdates } from '@/hooks';
import { MatchRow, LeagueSection } from '@/components/match';
import { useMemo } from 'react';

export default function LivePage() {
  const t = useTranslations();
  const { matches, isLoading } = useMatches();
  const liveMatches = useMemo(() => matches.filter(m => m.status === 'live' || m.status === 'ht'), [matches]);
  const updated = useLiveUpdates(liveMatches, 5000);

  const grouped = useMemo(() => {
    const g: Record<number, typeof updated> = {};
    for (const m of updated) { if (!g[m.leagueId]) g[m.leagueId] = []; g[m.leagueId].push(m); }
    return g;
  }, [updated]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 flex items-center gap-3 border-b border-[#1A1A1A]">
        <span className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
        <h1 className="text-base font-bold text-[#F0F0F0]">{t('nav.live')}</h1>
        <span className="text-xs text-[#555555]">({updated.length})</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-0">{Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 bg-[#1A1A1A] animate-pulse" />
          ))}</div>
        ) : updated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#555555]">
            <p className="text-sm">{t('common.no_data')}</p>
          </div>
        ) : (
          Object.entries(grouped).map(([lid, lm]) => (
            <LeagueSection key={lid} leagueName={lm[0].leagueName} matches={lm} />
          ))
        )}
      </div>
    </div>
  );
}
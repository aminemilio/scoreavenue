'use client';

import { useTranslations } from '@/hooks/usetranslation';
import { useMatches, useFavorites } from '@/hooks';
import { MatchRow } from '@/components/match';
import { useMemo } from 'react';

export default function FavoritesPage() {
  const t = useTranslations();
  const { matches, isLoading } = useMatches();
  const { favorites, count, clearAll } = useFavorites();
  const favMatches = useMemo(() => matches.filter(m => favorites.has(m.id)), [matches, favorites]);

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-20 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--surface-2)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#FF3B30]">★</span>
          <h1 className="text-base font-bold text-[var(--text)]">{t('nav.favorites')}</h1>
          <span className="text-xs text-[var(--text-3)]">({count})</span>
        </div>
        {count > 0 && (
          <button onClick={clearAll} className="text-[11px] text-[var(--text-3)] hover:text-[#FF3B30] transition-colors">Clear all</button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-0">{Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[var(--surface-2)]">
              <div className="flex-1 h-3.5 bg-[var(--surface-2)] rounded animate-pulse" />
              <div className="w-12 h-5 bg-[var(--surface-2)] rounded animate-pulse" />
              <div className="flex-1 h-3.5 bg-[var(--surface-2)] rounded animate-pulse" />
            </div>
          ))}</div>
        ) : favMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[var(--text-3)]">
            <span className="text-3xl mb-3 opacity-20">☆</span>
            <p className="text-sm">{t('common.no_data')}</p>
            <p className="text-xs text-[var(--border)] mt-1">Click ★ on any match to add it here</p>
          </div>
        ) : (
          favMatches.map(m => <MatchRow key={m.id} match={m} />)
        )}
      </div>
    </div>
  );
}
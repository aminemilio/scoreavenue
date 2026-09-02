'use client';

import { useTranslations } from 'next-intl';
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
      <div className="sticky top-0 z-20 bg-[#080808]/95 backdrop-blur-md border-b border-[#1A1A1A] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#FF3B30]">★</span>
          <h1 className="text-base font-bold text-[#F0F0F0]">{t('nav.favorites')}</h1>
          <span className="text-xs text-[#555555]">({count})</span>
        </div>
        {count > 0 && (
          <button onClick={clearAll} className="text-[11px] text-[#555555] hover:text-[#FF3B30] transition-colors">Clear all</button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-0">{Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[#1A1A1A]">
              <div className="flex-1 h-3.5 bg-[#1A1A1A] rounded animate-pulse" />
              <div className="w-12 h-5 bg-[#1A1A1A] rounded animate-pulse" />
              <div className="flex-1 h-3.5 bg-[#1A1A1A] rounded animate-pulse" />
            </div>
          ))}</div>
        ) : favMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#555555]">
            <span className="text-3xl mb-3 opacity-20">☆</span>
            <p className="text-sm">{t('common.no_data')}</p>
            <p className="text-xs text-[#333333] mt-1">Click ★ on any match to add it here</p>
          </div>
        ) : (
          favMatches.map(m => <MatchRow key={m.id} match={m} />)
        )}
      </div>
    </div>
  );
}
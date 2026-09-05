'use client';

import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/useappstore';
import { useMatches, type MatchFilter } from '@/hooks';
import { useTranslations } from '@/hooks/usetranslation';

export function FilterBar() {
  const t = useTranslations('filter');
  const { filter, setFilter } = useMatches();
  const liveCount = useAppStore(s => s.liveCount);

  const filters: Array<{ key: MatchFilter; label: string; showDot?: boolean }> = [
    { key: 'all', label: t('all') },
    { key: 'live', label: t('live'), showDot: true },
    { key: 'finished', label: t('finished') },
    { key: 'upcoming', label: t('upcoming') },
  ];

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-[#0F0F0F] border-b border-[#1E1E1E] overflow-x-auto">
      {filters.map(f => (
        <button
          key={f.key}
          onClick={() => setFilter(f.key)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border',
            filter === f.key
              ? 'bg-[#FF3B30] text-white border-[#FF3B30]'
              : 'bg-[#1A1A1A] text-[#555555] border-[#1E1E1E] hover:text-[#F0F0F0] hover:border-[#282828]'
          )}
        >
          {f.showDot && <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] animate-pulse" />}
          {f.label}
          {f.key === 'live' && liveCount > 0 && (
            <span className={cn('text-[10px] font-bold px-1 rounded-full', filter === 'live' ? 'bg-white/20' : 'bg-[#222222]')}>{liveCount}</span>
          )}
        </button>
      ))}
    </div>
  );
}
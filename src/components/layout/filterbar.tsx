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
    <div className="flex items-center gap-2 px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)] overflow-x-auto">
      {filters.map(f => (
        <button
          key={f.key}
          onClick={() => setFilter(f.key)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border',
            filter === f.key
              ? f.key === 'live'
                ? 'bg-[var(--live)] text-white border-[var(--live)]'
                : 'bg-[var(--brand-accent)] text-white border-[var(--brand-accent)]'
              : 'bg-[var(--surface-2)] text-[var(--text-3)] border-[var(--border)] hover:text-[var(--text)] hover:border-[var(--border)]'
          )}
        >
          {f.showDot && <span className="w-1.5 h-1.5 rounded-full bg-[var(--live)] animate-pulse" />}
          {f.label}
          {f.key === 'live' && liveCount > 0 && (
            <span className={cn('text-[10px] font-bold px-1 rounded-full', filter === 'live' ? 'bg-white/20' : 'bg-[var(--surface-2)]')}>{liveCount}</span>
          )}
        </button>
      ))}
    </div>
  );
}
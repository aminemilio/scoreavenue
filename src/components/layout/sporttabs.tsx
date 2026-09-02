'use client';

import { useAppStore } from '@/stores/useappstore';
import { useCountrySports } from '@/hooks';
import { cn } from '@/lib/utils';
import type { MatchListItem } from '@/types';

const SPORT_LABELS: Record<string, string> = {
  football: 'Football', basketball: 'Basketball', tennis: 'Tennis', cricket: 'Cricket',
  rugby: 'Rugby', handball: 'Handball', volleyball: 'Volleyball', formula1: 'Formula 1',
  motogp: 'MotoGP', athletics: 'Athletics', boxing: 'Boxing', mma: 'MMA',
  cycling: 'Cycling', golf: 'Golf', american_football: 'American Football',
  baseball: 'Baseball', ice_hockey: 'Ice Hockey', table_tennis: 'Table Tennis',
  badminton: 'Badminton', swimming: 'Swimming', esports: 'Esports', padel: 'Padel',
};

function isLive(status: string) { return status === 'live' || status === 'ht' || status === 'et' || status === 'pen'; }

interface Props { matches: MatchListItem[]; }

export function SportTabs({ matches }: Props) {
  const activeSport = useAppStore(s => s.activeSport);
  const setActiveSport = useAppStore(s => s.setActiveSport);
  const { sportPriority } = useCountrySports();

  return (
    <div className="bg-[#141414] border-b border-[#1E1E1E] sticky top-[56px] z-[150]">
      <div className="px-4 py-2 overflow-x-auto flex gap-1">
        {sportPriority.map(sportSlug => {
          const count = matches.filter(m => m.sport === sportSlug).length;
          const liveCount = matches.filter(m => m.sport === sportSlug && isLive(m.status)).length;
          const isActive = activeSport === sportSlug;
          return (
            <button
              key={sportSlug}
              onClick={() => setActiveSport(sportSlug)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0',
                isActive ? 'bg-[#FF3B30] text-white' : 'text-[#999999] hover:text-[#F0F0F0] hover:bg-[#1A1A1A]'
              )}
            >
              <span className="w-3 h-3 rounded-full flex-shrink-0 bg-[#333333]" />
              {SPORT_LABELS[sportSlug] || sportSlug}
              <span className={cn('text-[11px] font-bold px-1.5 rounded-full', isActive ? 'bg-white/20 text-white' : 'bg-[#222222] text-[#555555]')}>
                {liveCount > 0 ? `${liveCount}/` : ''}{count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
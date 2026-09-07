'use client';

import { useAppStore } from '@/stores/useappstore';
import { useCountrySports } from '@/hooks';
import { cn } from '@/lib/utils';

const SPORT_LABELS: Record<string, string> = {
  football: 'Football', basketball: 'Basketball', tennis: 'Tennis', cricket: 'Cricket',
  rugby: 'Rugby', handball: 'Handball', volleyball: 'Volleyball', formula1: 'Formula 1',
  motogp: 'MotoGP', athletics: 'Athletics', boxing: 'Boxing', mma: 'MMA',
  cycling: 'Cycling', golf: 'Golf', american_football: 'American Football',
  baseball: 'Baseball', ice_hockey: 'Ice Hockey', table_tennis: 'Table Tennis',
  badminton: 'Badminton', swimming: 'Swimming', esports: 'Esports', padel: 'Padel',
};

const SPORT_COLORS: Record<string, string> = {
  football: '#22C55E', basketball: '#3B82F6', tennis: '#F59E0B', rugby: '#3B82F6',
  handball: '#F59E0B', volleyball: '#3B82F6', formula1: '#EF4444', motogp: '#EF4444',
  boxing: '#EF4444', mma: '#EF4444', ice_hockey: '#3B82F6', cricket: '#22C55E',
};

function isLive(status: string) { return status === 'live' || status === 'ht' || status === 'et' || status === 'pen'; }

interface MatchLike { sport: string; status: string; }

interface Props { matches: MatchLike[]; }

export function SportTabs({ matches }: Props) {
  const activeSport = useAppStore((s) => s.activeSport);
  const setActiveSport = useAppStore((s) => s.setActiveSport);
  const { sportPriority } = useCountrySports();

  return (
    <div className="border-b sticky top-[56px] z-[150]" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="px-4 py-2 overflow-x-auto flex gap-1">
        {sportPriority.map((sportSlug) => {
          const count = matches.filter((m) => m.sport === sportSlug).length;
          const live = matches.filter((m) => m.sport === sportSlug && isLive(m.status)).length;
          const isActive = activeSport === sportSlug;
          return (
            <button
              key={sportSlug}
              onClick={() => setActiveSport(sportSlug)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0"
              style={isActive
                ? { backgroundColor: 'var(--brand-accent)', color: '#fff' }
                : { color: 'var(--text-2)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: isActive ? '#fff' : (SPORT_COLORS[sportSlug] || 'var(--text-3)') }} />
              {SPORT_LABELS[sportSlug] || sportSlug}
              <span
                className="text-[11px] font-bold px-1.5 rounded-full"
                style={isActive ? { backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' } : { backgroundColor: 'var(--surface-2)', color: live > 0 ? 'var(--live)' : 'var(--text-3)' }}
              >
                {live > 0 ? `${live}/` : ''}{count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
'use client';

import { useAppStore } from '@/stores/useappstore';
import { useMediaQuery, BREAKPOINTS } from '@/hooks';
import { cn } from '@/lib/utils';
import { getCountryConfig } from '@/lib/country-sports';
import { useTranslations } from 'next-intl';
import type { SportSlug } from '@/types';

interface Props { onOpenCountryModal: () => void; }

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
  handball: '#F59E0B', volleyball: '#3B82F6', formula1: '#FF3B30', motogp: '#FF3B30',
  boxing: '#EF4444', mma: '#EF4444', ice_hockey: '#3B82F6', cricket: '#22C55E',
};

function NavItem({ icon, label, active, badge, badgeVariant, onClick }: {
  icon: React.ReactNode; label: string; active?: boolean;
  badge?: string; badgeVariant?: 'default' | 'live'; onClick: () => void;
}) {
  return (
    <button onClick={onClick} className={cn(
      'relative flex items-center gap-3 px-5 py-2 text-sm font-medium transition-colors w-full text-start outline-none',
      active ? 'text-[#FF3B30] bg-[#FF3B30]/[0.08]' : 'text-[#999999] hover:text-[#F0F0F0] hover:bg-[#1A1A1A]',
    )}>
      {active && <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#FF3B30] rounded-l-full" />}
      <span className="w-5 flex items-center justify-center flex-shrink-0">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {badge && <span className={cn(
        'text-[11px] font-bold px-1.5 rounded-full leading-[18px] min-w-[20px] text-center flex-shrink-0',
        badgeVariant === 'live' ? 'bg-[#FF3B30] text-white' : 'bg-[#222222] text-[#555555]',
      )}>{badge}</span>}
    </button>
  );
}

export function Sidebar({ onOpenCountryModal }: Props) {
  const t = useTranslations();
  const isDesktop = useMediaQuery(BREAKPOINTS.lg);
  const sidebarOpen = useAppStore(s => s.sidebarOpen);
  const setSidebarOpen = useAppStore(s => s.setSidebarOpen);
  const countryCode = useAppStore(s => s.countryCode);
  const activeSport = useAppStore(s => s.activeSport);
  const setActiveSport = useAppStore(s => s.setActiveSport);
  const liveCount = useAppStore(s => s.liveCount);
  const countryConfig = getCountryConfig(countryCode);

  const sportPriority = countryConfig.sportPriority;
  const featuredLeagues = countryConfig.featuredLeagues;

  if (isDesktop && !sidebarOpen) {
    return <aside className="fixed top-[56px] left-0 bottom-0 w-[280px] bg-[#141414] border-r border-[#1E1E1E] z-[200] -translate-x-full transition-transform duration-200" />;
  }
  if (!isDesktop && !sidebarOpen) return null;

  return (
    <>
      {!isDesktop && <div className="fixed inset-0 bg-black/50 z-[190]" onClick={() => setSidebarOpen(false)} />}
      <aside className={cn(
        'fixed top-[56px] bottom-0 w-[280px] bg-[#141414] z-[200] flex flex-col transition-transform duration-200 left-0 border-r border-[#1E1E1E]',
        !sidebarOpen && '-translate-x-full',
      )}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1E1E1E] flex-shrink-0">
          <div className="w-8 h-8 bg-[#FF3B30] rounded-lg flex items-center justify-center">
            <span className="text-white font-extrabold text-sm">SA</span>
          </div>
          <div className="font-extrabold text-lg tracking-tight">
            Score<span className="text-[#FF3B30]">Avenue</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {/* Live */}
          <div className="px-5 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#555555]">
            {t('nav.live')}
          </div>
          <NavItem
            icon={<span className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />}
            label={t('nav.live')}
            badge={String(liveCount)}
            badgeVariant="live"
            onClick={() => {}}
          />

          {/* News */}
          <NavItem
            icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18l-6-3-6 3Z" /></svg>}
            label="📰 News"
            onClick={() => { if (!isDesktop) setSidebarOpen(false); }}
          />

          {/* Favorites */}
          <NavItem
            icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>}
            label={t('nav.favorites')}
            onClick={() => { if (!isDesktop) setSidebarOpen(false); }}
          />

          {/* Sports */}
          <div className="px-5 pt-5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#555555]">Sports</div>
          {sportPriority.map(slug => (
            <NavItem
              key={slug}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={SPORT_COLORS[slug] || '#555555'} strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              }
              label={SPORT_LABELS[slug] || slug}
              active={activeSport === slug}
              onClick={() => { setActiveSport(slug); if (!isDesktop) setSidebarOpen(false); }}
            />
          ))}

          {/* Leagues */}
          <div className="px-5 pt-5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#555555]">
            {t('nav.leagues')}
          </div>
          {featuredLeagues.map(league => (
            <NavItem
              key={league.id}
              icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>}
              label={league.name}
              onClick={() => { if (!isDesktop) setSidebarOpen(false); }}
            />
          ))}
        </div>

        {/* Country selector */}
        <button
          onClick={onOpenCountryModal}
          className="flex items-center gap-3 px-5 py-4 border-t border-[#1E1E1E] hover:bg-[#1A1A1A] transition-colors flex-shrink-0 w-full text-start"
        >
          <span className="text-2xl leading-none">{countryConfig.flag}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{countryConfig.name}</div>
            <div className="text-[11px] text-[#555555]">{t('country.primary_sport')} {SPORT_LABELS[sportPriority[0]] || sportPriority[0]}</div>
          </div>
        </button>
      </aside>
    </>
  );
}
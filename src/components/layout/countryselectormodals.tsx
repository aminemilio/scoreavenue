'use client';

import { type ReactNode } from 'react';
import { useAppStore } from '@/stores/useappstore';
import { useMediaQuery, BREAKPOINTS } from '@/hooks';
import { cn } from '@/lib/utils';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Ticker } from './ticker';
import { SportTabs } from './sporttabs';
import { FilterBar } from './filterbar';
import { DateSelector } from './dateselector';
import type { MatchListItem } from '@/types';

interface Props {
  children: ReactNode;
  matches?: MatchListItem[];
  showFilters?: boolean;
}

export function AppLayout({ children, matches = [], showFilters = true }: Props) {
  const isDesktop = useMediaQuery(BREAKPOINTS.lg);
  const sidebarOpen = useAppStore(s => s.sidebarOpen);

  return (
    <div className="min-h-screen bg-[#080808]">
      <Header />
      <Sidebar onOpenCountryModal={() => {}} />
      <div className={cn('transition-[margin] duration-200', isDesktop && sidebarOpen ? 'ml-[280px]' : 'ml-0')}>
        <div className="pt-[56px]">
          <Ticker matches={matches} />
          <SportTabs matches={matches} />
          {showFilters && <><FilterBar /><DateSelector /></>}
          {children}
        </div>
      </div>
    </div>
  );
}
'use client';

import { type ReactNode } from 'react';
import { NewsTicker } from './newsticker';
import { useAppStore } from '@/stores/useappstore';
import { Header } from './header';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./sidebar').then(m => ({ default: m.Sidebar })), { ssr: false });
const Ticker = dynamic(() => import('./ticker').then(m => ({ default: m.Ticker })), { ssr: false });
const SportTabs = dynamic(() => import('./sporttabs').then(m => ({ default: m.SportTabs })), { ssr: false });
const FilterBar = dynamic(() => import('./filterbar').then(m => ({ default: m.FilterBar })), { ssr: false });
const DateSelector = dynamic(() => import('./dateselector').then(m => ({ default: m.DateSelector })), { ssr: false });

interface Props {
  children: ReactNode;
  matches?: any[];
  showFilters?: boolean;
}

export function AppLayout({ children, matches = [], showFilters = true }: Props) {
  const sidebarOpen = useAppStore(s => s.sidebarOpen);

  return (
    <div className="min-h-screen bg-[#080808]">
      <Header />
      <NewsTicker />
      <Sidebar onOpenCountryModal={() => {}} />
      <div className={`transition-[margin] duration-200 ${sidebarOpen ? 'ml-[280px]' : 'ml-0'}`}>
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
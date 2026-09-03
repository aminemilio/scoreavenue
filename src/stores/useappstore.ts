import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SportSlug, Locale, MatchListItem } from '@/types';

interface AppState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  activeSport: SportSlug;
  setActiveSport: (sport: SportSlug) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  activeDate: string;
  setActiveDate: (date: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  liveCount: number;
  setLiveCount: (count: number) => void;
  selectedMatchId: number | null;
  setSelectedMatchId: (id: number | null) => void;
  allMatches: MatchListItem[];
  setAllMatches: (matches: MatchListItem[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark' as const,
      setTheme: (theme: 'dark' | 'light') => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      countryCode: 'FR',
      setCountryCode: (code) => set({ countryCode: code }),
      activeSport: 'football' as SportSlug,
      setActiveSport: (sport) => set({ activeSport: sport }),
      locale: 'fr' as Locale,
      setLocale: (locale) => set({ locale }),
      activeDate: 'today',
      setActiveDate: (date) => set({ activeDate: date }),
      activeFilter: 'all',
      setActiveFilter: (filter) => set({ activeFilter: filter }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      liveCount: 0,
      setLiveCount: (count) => set({ liveCount: count }),
      selectedMatchId: null,
      setSelectedMatchId: (id) => set({ selectedMatchId: id }),
      allMatches: [] as MatchListItem[],
      setAllMatches: (matches) => set({ allMatches: matches }),
    }),
    {
      name: 'sa-app-store',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
        return localStorage;
      }),
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        countryCode: state.countryCode,
        activeSport: state.activeSport,
        locale: state.locale,
        activeDate: state.activeDate,
      }),
    }
  )
);
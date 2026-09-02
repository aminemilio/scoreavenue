'use client';

import { useAppStore } from '@/stores/useappstore';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations();
  const setSidebarOpen = useAppStore(s => s.setSidebarOpen);
  const sidebarOpen = useAppStore(s => s.sidebarOpen);
  const liveCount = useAppStore(s => s.liveCount);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0C0C0C] border-b border-[#1E1E1E] z-[250] flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#999999] hover:text-[#F0F0F0] hover:bg-[#1A1A1A] rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="font-extrabold text-lg tracking-tight">
          Score<span className="text-[#FF3B30]">Avenue</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {liveCount > 0 && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#FF3B30]">
            <span className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
            {liveCount} LIVE
          </span>
        )}
      </div>
    </header>
  );
}
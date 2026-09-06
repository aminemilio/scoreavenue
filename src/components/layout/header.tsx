'use client';

import { useAppStore } from '@/stores/useappstore';
import { Logo } from './logo';

export function Header() {
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const liveCount = useAppStore((s) => s.liveCount);
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  return (
    <header
      className="fixed top-0 left-0 right-0 h-14 z-[250] flex items-center justify-between px-4 border-b transition-colors"
      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg transition-colors hover:opacity-70"
          style={{ color: 'var(--text-2)' }}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Logo className="text-lg" />
      </div>

      <div className="flex items-center gap-3">
        {liveCount > 0 && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#FF3B30]">
            <span className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
            {liveCount} LIVE
          </span>
        )}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-2)', backgroundColor: 'var(--surface)' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
'use client';

import { useState } from 'react';
import { MatchRow } from './matchrow';

interface Props {
  leagueName: string;
  matches: Array<{
    id: number;
    leagueId: number;
    homeTeam: { id: number; name: string; shortName: string; logo: string; primaryColor: string };
    awayTeam: { id: number; name: string; shortName: string; logo: string; primaryColor: string };
    homeScore: number;
    awayScore: number;
    status: string;
    minute?: number;
    startTime: string;
  }>;
}

export function LeagueSection({ leagueName, matches }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <button
        onClick={() => setCollapsed(prev => !prev)}
        className="flex items-center gap-2 w-full px-3 py-2 bg-[#0C0C0C] border-b border-[#1A1A1A] hover:bg-[#111111] transition-colors"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`text-[#555555] transition-transform duration-200 ${collapsed ? '-rotate-90' : ''}`}
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs font-semibold text-[#999999] uppercase tracking-wider truncate">
          {leagueName}
        </span>
        <span className="text-[10px] text-[#333333] ml-auto">
          {matches.length} {matches.length > 1 ? 'matches' : 'match'}
        </span>
      </button>
      {!collapsed && matches.map(match => (
        <MatchRow key={match.id} match={match} />
      ))}
    </div>
  );
}
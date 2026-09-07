'use client';

import type { MatchListItem } from '@/types';

function isLive(status: string) { return status === 'live' || status === 'ht' || status === 'et' || status === 'pen'; }

interface Props { matches: MatchListItem[]; }

export function Ticker({ matches }: Props) {
  const liveMatches = matches.filter(m => isLive(m.status));
  if (liveMatches.length === 0) return null;

  const items = liveMatches.map(m => (
    <span key={m.id} className="inline-flex items-center gap-2 px-6 text-xs text-[var(--text-2)] whitespace-nowrap flex-shrink-0">
      <span className="text-[#FF3B30] font-bold animate-pulse">LIVE</span>
      <span className="font-medium text-[var(--text)]">{m.homeTeam.shortName}</span>
      <span className="font-bold text-[var(--text)] tabular-nums">{m.homeScore} - {m.awayScore}</span>
      <span className="font-medium text-[var(--text)]">{m.awayTeam.shortName}</span>
      <span className="text-[var(--text-3)]">{m.minute}&apos;</span>
    </span>
  ));

  return (
    <div className="h-8 bg-[var(--surface)] border-b border-[var(--border)] overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[var(--surface)] to-transparent z-[1]" />
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--surface)] to-transparent z-[1]" />
      <div className="flex items-center h-full animate-[ticker-scroll_60s_linear_infinite] hover:[animation-play-state:paused]">
        {items}{items}
      </div>
    </div>
  );
}
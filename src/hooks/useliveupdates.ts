'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import type { MatchListItem } from '@/types';
import { isLive } from '@/lib/utils';

interface LiveUpdate { matchId: number; type: 'goal' | 'card' | 'minute' | 'status_change'; data: Record<string, unknown>; }

export function useLiveUpdates(initialMatches: MatchListItem[], intervalMs: number = 5000) {
  const [liveMatches, setLiveMatches] = useState<MatchListItem[]>(initialMatches);
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);

  useEffect(() => {
    const live = initialMatches.filter(m => isLive(m.status));
    if (live.length === 0) { setLiveMatches(initialMatches); return; }
    setLiveMatches(initialMatches);

    const interval = setInterval(() => {
      setLiveMatches(prev => prev.map(match => {
        if (!isLive(match.status)) return match;
        const updated = { ...match };
        const newUpdates: LiveUpdate[] = [];
        if (updated.minute !== undefined && updated.minute < 90) {
          updated.minute = match.minute + 1;
          if (updated.minute === 45) { updated.status = 'ht'; newUpdates.push({ matchId: match.id, type: 'status_change', data: { newStatus: 'ht' } }); }
        }
        if (updated.minute !== undefined && updated.minute >= 90 && updated.status === 'live') {
          updated.status = 'ft'; newUpdates.push({ matchId: match.id, type: 'status_change', data: { newStatus: 'ft' } });
        }
        if (updated.status === 'live' && Math.random() > 0.97) {
          const isHome = Math.random() > 0.5;
          if (isHome) updated.homeScore += 1; else updated.awayScore += 1;
          newUpdates.push({ matchId: match.id, type: 'goal', data: { homeScore: updated.homeScore, awayScore: updated.awayScore, minute: updated.minute, detail: isHome ? 'But domicile' : 'But extérieur' } });
        }
        if (newUpdates.length > 0) setUpdates(prev => [...newUpdates, ...prev].slice(0, 50));
        return updated;
      }));
    }, intervalMs);
    return () => clearInterval(interval);
  }, [initialMatches, intervalMs]);

  const liveCount = useMemo(() => liveMatches.filter(m => isLive(m.status)).length, [liveMatches]);
  useEffect(() => { setLiveMatches(initialMatches); }, [initialMatches]);

  return { liveMatches, updates, liveCount };
}
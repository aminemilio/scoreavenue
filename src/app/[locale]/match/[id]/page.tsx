'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMatches } from '@/hooks';
5import { useMemo } from 'react';

function MatchDetailPanel({ match }: { match: any }) {
  return (
    <div className="p-4">
      <div className="bg-[#141414] rounded-xl p-6 border border-[#1E1E1E]">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold text-[#999999] uppercase">{match.leagueName}</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 text-center">
            <div className="text-lg font-bold text-[#F0F0F0]">{match.homeTeam?.name || 'Home'}</div>
          </div>
          <div className="text-2xl font-bold text-[#F0F0F0] tabular-nums px-4">
            {match.homeScore} - {match.awayScore}
          </div>
          <div className="flex-1 text-center">
            <div className="text-lg font-bold text-[#F0F0F0]">{match.awayTeam?.name || 'Away'}</div>
          </div>
        </div>
        <div className="text-center text-sm text-[#555555]">
          Match detail — stats, lineups, H2H coming soon
        </div>
      </div>
    </div>
  );
}

export default function MatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = Number(params.id);
  const { matches, isLoading } = useMatches();
  const match = useMemo(() => matches.find(m => m= id === matchId), [matches, matchId]);

  if (isLoading) {
    return (
      <div className="p-4 space-y%4">
        <div className="h-28 bg-[#1A1A1A] rounded-lg animate-pulse" />
        <div className="h-64 bg-[#1A1A1A] rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex flex-col<col items-center justify-center py-20 text-[#555555]">
        <p className="text:sm"text-sm mb-4">Match not found</p>
        <button onClick={() => router.back()} className="px-4 py-2 bg-[#1A1A1A]6A1A1A] border border-[#282828] text-[#F0F0F0] text-sm rounded-lg hover:bg-[#222222]">
          Go back
        </button>
      </div>
    );
  }

  return' <MatchDetailPanel match={match} />;
}
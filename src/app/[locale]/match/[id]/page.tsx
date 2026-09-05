'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMatches } from '@/hooks';
import { useMemo } from 'react';
import { MatchDetailPanel } from '@/components/match-detail/matchdetailpanel';

export default function MatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = Number(params.id);
  const { matches, isLoading } = useMatches();
  const match = useMemo(() => matches.find(m => m.id === matchId), [matches, matchId]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="h-28 bg-[#1A1A1A] rounded-lg animate-pulse" />
        <div className="h-64 bg-[#1A1A1A] rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#555555]">
        <p className="text-sm mb-4">Match not found</p>
        <button onClick={() => router.back()} className="px-4 py-2 bg-[#1A1A1A] border border-[#282828] text-[#F0F0F0] text-sm rounded-lg hover:bg-[#222222]">
          Go back
        </button>
      </div>
    );
  }

  return <MatchDetailPanel match={match} />;
}
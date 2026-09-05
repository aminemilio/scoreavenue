'use client';

import { cn } from '@/lib/utils';
import { MatchScore } from './matchscore';
import { MatchTime } from './matchtime';
import { TeamLogo } from './teamlogo';
import { FavoriteButton } from './favoritebutton';
import type { MatchListItem } from '@/types';

interface Props {
  match: MatchListItem;
  onClick?: () => void;
}

export function MatchRow({ match, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2.5 border-b border-[#1A1A1A] cursor-pointer transition-colors hover:bg-[#0F0F0F] group"
    >
      <div className="w-10 flex-shrink-0 flex justify-center">
        <MatchScore match={match} size="sm" />
      </div>

      <div className="flex-1 min-w-0 flex items-center gap-2">
        <TeamLogo src={match.homeTeam.logo} name={match.homeTeam.name} shortName={match.homeTeam.shortName} color={match.homeTeam.primaryColor} size="sm" />
        <span className="text-sm text-[#F0F0F0] truncate">{match.homeTeam.shortName || match.homeTeam.name}</span>
      </div>

      <div className="flex-1 min-w-0 flex items-center gap-2 justify-end">
        <span className="text-sm text-[#F0F0F0] truncate text-right">{match.awayTeam.shortName || match.awayTeam.name}</span>
        <TeamLogo src={match.awayTeam.logo} name={match.awayTeam.name} shortName={match.awayTeam.shortName} color={match.awayTeam.primaryColor} size="sm" />
      </div>

      <div className="w-16 flex-shrink-0 flex flex-col items-end gap-0.5">
        <MatchTime startTime={match.startTime} status={match.status} />
        <FavoriteButton matchId={match.id} />
      </div>
    </div>
  );
}
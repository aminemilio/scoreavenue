'use client';

import { MatchScore } from './matchscore';
import { MatchTime } from './matchtime';
import { TeamLogo } from './teamlogo';
import { FavoriteButton } from './favoritebutton';
import { useFavorites } from '@/hooks/usefavorites';

function isLive(status: string) {
  return status === 'live' || status === 'ht' || status === 'et' || status === 'pen';
}

interface MatchRowData {
  id: number;
  homeTeam: { name: string; shortName: string; logo?: string; primaryColor: string };
  awayTeam: { name: string; shortName: string; logo?: string; primaryColor: string };
  homeScore: number;
  awayScore: number;
  status: string;
  minute?: number;
  startTime: string;
}

interface Props {
  match: MatchRowData;
  onClick?: () => void;
}

export function MatchRow({ match, onClick }: Props) {
  const live = isLive(match.status);
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div
      onClick={onClick}
      className="group relative flex items-center gap-2 pl-3 pr-3 py-2.5 border-b cursor-pointer transition-colors hover:bg-[var(--surface)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <span
        className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: match.homeTeam.primaryColor }}
        aria-hidden="true"
      />

      <div className="w-11 flex-shrink-0 flex items-center justify-center">
        {live ? (
          <div className="flex flex-col items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--live)' }} />
            <span className="text-[10px] font-bold tabular-nums" style={{ color: 'var(--live)' }}>
              {match.minute ?? 0}&apos;
            </span>
          </div>
        ) : (
          <MatchTime startTime={match.startTime} status={match.status} />
        )}
      </div>

      <div className="flex-1 min-w-0 flex items-center gap-2">
        <TeamLogo src={match.homeTeam.logo} name={match.homeTeam.name} shortName={match.homeTeam.shortName} color={match.homeTeam.primaryColor} size="sm" />
        <span className="text-sm truncate" style={{ color: 'var(--text)' }}>
          {match.homeTeam.shortName || match.homeTeam.name}
        </span>
      </div>

      <div className="px-2">
        <MatchScore homeScore={match.homeScore} awayScore={match.awayScore} status={match.status} size="sm" />
      </div>

      <div className="flex-1 min-w-0 flex items-center gap-2 justify-end">
        <span className="text-sm truncate text-right" style={{ color: 'var(--text)' }}>
          {match.awayTeam.shortName || match.awayTeam.name}
        </span>
        <TeamLogo src={match.awayTeam.logo} name={match.awayTeam.name} shortName={match.awayTeam.shortName} color={match.awayTeam.primaryColor} size="sm" />
      </div>

      <div className="w-7 flex-shrink-0 flex justify-end">
        <FavoriteButton isFavorite={isFavorite(match.id)} onToggle={() => toggleFavorite(match.id)} />
      </div>
    </div>
  );
}
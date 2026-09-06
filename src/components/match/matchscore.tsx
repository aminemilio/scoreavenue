import { cn } from '@/lib/utils';

function isLive(status: string) {
  return status === 'live' || status === 'ht' || status === 'et' || status === 'pen';
}

interface Props { homeScore: number; awayScore: number; status: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; }

const sizeMap = { sm: 'text-sm', md: 'text-base', lg: 'text-2xl', xl: 'text-4xl' };

export function MatchScore({ homeScore, awayScore, status, size = 'md', className }: Props) {
  const isUpcoming = status === 'ns' || status === 'upcoming';
  const live = isLive(status);

  if (isUpcoming) {
    return (
      <div className={cn('text-center font-bold tabular-nums', sizeMap[size], className)}>
        <span className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>VS</span>
      </div>
    );
  }

  return (
    <div className={cn('text-center font-bold tabular-nums', sizeMap[size], className)} style={{ color: live ? 'var(--live)' : 'var(--text)' }}>
      {homeScore}
      <span className="font-normal mx-1" style={{ color: 'var(--text-3)' }}>-</span>
      {awayScore}
    </div>
  );
}
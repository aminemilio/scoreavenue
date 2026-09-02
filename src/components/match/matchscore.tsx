import { cn } from '@/lib/utils';

interface Props { homeScore: number; awayScore: number; status: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; }

const sizeMap = { sm: 'text-sm', md: 'text-base', lg: 'text-2xl', xl: 'text-4xl' };

export function MatchScore({ homeScore, awayScore, status, size = 'md', className }: Props) {
  const isUpcoming = status === 'ns' || status === 'upcoming';
  return (
    <div className={cn('text-center font-bold tabular-nums', sizeMap[size], className)}>
      {isUpcoming ? <span className="text-[#555555] text-xs font-medium">VS</span> : <>{homeScore}<span className="text-[#555555] font-normal mx-1">-</span>{awayScore}</>}
    </div>
  );
}
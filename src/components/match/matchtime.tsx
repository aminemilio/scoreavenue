import { cn } from '@/lib/utils';
import type { MatchStatus } from '@/types';

function isLive(status: string) { return status === 'live' || status === 'ht' || status === 'et' || status === 'pen'; }

interface Props { status: MatchStatus; minute?: number; startTime: string; className?: string; }

export function MatchTime({ status, minute, startTime, className }: Props) {
  if (isLive(status)) return null;

  const date = new Date(startTime);
  const now = new Date();
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
  const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  let prefix = '';
  if (isToday) prefix = '';
  else if (isYesterday) prefix = 'Yesterday ';
  else if (isTomorrow) prefix = 'Tomorrow ';
  else prefix = date.toLocaleDateString([], { day: 'numeric', month: 'short' }) + ' ';

  return (
    <span className={cn('text-[#555555] text-xs', className)}>
      {prefix}{timeStr}
    </span>
  );
}
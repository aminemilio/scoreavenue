import { cn } from '@/lib/utils';

type BadgeVariant = 'live' | 'status' | 'count' | 'default' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'xs' | 'sm' | 'md';

interface BadgeProps { variant?: BadgeVariant; size?: BadgeSize; dot?: boolean; pulsing?: boolean; className?: string; children: React.ReactNode; }

const varStyles: Record<BadgeVariant, string> = {
  live: 'bg-[#FF3B30]/15 text-[#FF3B30] border border-[#FF3B30]/30',
  status: 'bg-[#1A1A1A] text-[#999999] border border-[#1E1E1E]',
  count: 'bg-[#222222] text-[#555555]',
  default: 'bg-[#1A1A1A] text-[#999999] border border-[#1E1E1E]',
  success: 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30',
  warning: 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30',
  danger: 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30',
  info: 'bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30',
};

const sizeStyles: Record<BadgeSize, string> = { xs: 'px-1.5 py-0 text-[10px] leading-4', sm: 'px-2 py-0.5 text-[11px] leading-4', md: 'px-2.5 py-0.5 text-xs leading-5' };

export function Badge({ variant = 'default', size = 'sm', dot = false, pulsing = false, className, children }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 font-semibold rounded-full whitespace-nowrap', varStyles[variant], sizeStyles[size], pulsing && 'animate-[live-pulse_1.5s_ease-in-out_infinite]', className)}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', variant === 'live' && 'bg-[#FF3B30] animate-[live-pulse_1.5s_ease-in-out_infinite]', variant === 'success' && 'bg-[#22C55E]', variant === 'warning' && 'bg-[#F59E0B]', variant === 'danger' && 'bg-[#EF4444]', variant === 'info' && 'bg-[#3B82F6]', variant === 'default' && 'bg-[#555555]')} aria-hidden="true" />}
      {children}
    </span>
  );
}
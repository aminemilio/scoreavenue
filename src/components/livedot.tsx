import { cn } from '@/lib/utils';

export function LiveDot({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const map = { sm: 'w-1.5 h-1.5', md: 'w-2 h-2', lg: 'w-2.5 h-2.5' };
  return <span className={cn('inline-block rounded-full bg-[#FF3B30] animate-[live-pulse_1.5s_ease-in-out_infinite flex-shrink-0', map[size], className)} aria-hidden="true" />;
}
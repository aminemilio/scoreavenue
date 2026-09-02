import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> { width?: string | number; height?: string | number; rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'; }

const rMap = { none: 'rounded-none', sm: 'rounded', md: 'rounded-lg', lg: 'rounded-xl', full: 'rounded-full' };

export function Skeleton({ width, height, rounded = 'md', className, ...props }: SkeletonProps) {
  return <div role="status" aria-label="Chargement" className={cn('bg-gradient-to-r from-[#1A1A1A] via-[#222222] to-[#1A1A1A] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]', rMap[rounded], className)} style={{ width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height }} {...props} />;
}

export function MatchRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1E1E1E]">
      <Skeleton width={40} height={16} rounded="sm" />
      <div className="flex-1 flex items-center gap-2"><Skeleton width={20} height={20} rounded="sm" /><Skeleton width={80} height={14} /></div>
      <Skeleton width={60} height={20} rounded="sm" />
      <div className="flex-1 flex items-center gap-2 justify-end"><Skeleton width={80} height={14} /><Skeleton width={20} height={20} rounded="sm" /></div>
      <Skeleton width={20} height={20} rounded="sm" />
    </div>
  );
}

export function HomePageSkeleton({ leagueCount = 4 }: { leagueCount?: number } {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-[#141414] border-b border-[#1E1E1E]" />
      <div className="flex gap-1 p-2 px-4 border-b border-[#1E1E1E]">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} width={90} height={32} rounded="full" />)}</div>
      <div className="flex gap-2 p-3 px-4 border-b border-[#1E1E1E] bg-[#0F0F0F]">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} width={60} height={24} rounded="full" />)}</div>
      {Array.from({ length: leagueCount }).map((_, i) => (<div key={i} className="border-b border-[#1E1E1E]"><div className="flex items-center gap-3 px-4 py-3"><Skeleton width={24} height={24} rounded="sm" /><Skeleton width={160} height={14} /></div>{Array.from({ length: 2 + (i % 3) }).map((_, j) => <MatchRowSkeleton key={j} />)}</div>))}
    </div>
  );
}
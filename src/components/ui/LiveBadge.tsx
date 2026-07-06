'use client'
export function LiveBadge({ elapsed }: { elapsed?: number | null }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-500/15 text-red-400 text-[10px] font-bold rounded tracking-wide">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
      {elapsed ? `${elapsed}'` : 'LIVE'}
    </span>
  )
}

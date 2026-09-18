'use client'
export function LiveBadge({ elapsed }: { elapsed?: number | null }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#00FF87]/15 text-[#00FF87] text-[10px] font-bold rounded tracking-wide">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse"/>
      {elapsed ? `${elapsed}'` : 'LIVE'}
    </span>
  )
}

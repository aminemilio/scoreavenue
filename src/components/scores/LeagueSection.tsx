'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { LeagueGroup } from '@/types'
import { MatchCard } from './MatchCard'
import { isLive } from '@/lib/utils'

export function LeagueSection({ group }: { group: LeagueGroup }) {
  const [open, setOpen] = useState(true)
  const liveCount = group.matches.filter(m => isLive(m.status)).length

  return (
    <div className="mb-3 overflow-hidden rounded-2xl border border-[#151d2a] bg-[#0d1220] shadow-[0_0_0_1px_rgba(148,163,184,0.05)]">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 px-3 py-3 transition-colors hover:bg-[#111b2a]">
        <span className="text-base leading-none">{group.league.flag}</span>
        <div className="flex-1 flex items-center gap-2 text-left">
          <span className="text-[13px] font-medium text-white">{group.league.name}</span>
          <span className="text-[11px] text-[#555]">{group.league.country}</span>
        </div>
        <div className="flex items-center gap-2">
          {liveCount > 0 && <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-red-400">{liveCount} live</span>}
          <span className="text-[11px] text-[#555]">{group.matches.length} matches</span>
          {open ? <ChevronUp size={14} className="text-[#555]"/> : <ChevronDown size={14} className="text-[#555]"/>}
        </div>
      </button>
      {open && (
        <div className="divide-y divide-[#131b2b]">
          {group.matches.map(match => <MatchCard key={match.id} match={match}/>)}
        </div>
      )}
    </div>
  )
}

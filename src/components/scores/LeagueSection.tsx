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
    <div className="border border-[#1A1A1A] rounded-xl overflow-hidden mb-3">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-3 py-2.5 bg-[#111] hover:bg-[#151515] transition-colors">
        <span className="text-base leading-none">{group.league.flag}</span>
        <div className="flex-1 flex items-center gap-2 text-left">
          <span className="text-[13px] font-medium text-white">{group.league.name}</span>
          <span className="text-[11px] text-[#555]">{group.league.country}</span>
        </div>
        <div className="flex items-center gap-2">
          {liveCount > 0 && <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">{liveCount} LIVE</span>}
          <span className="text-[11px] text-[#555]">{group.matches.length}</span>
          {open ? <ChevronUp size={14} className="text-[#555]"/> : <ChevronDown size={14} className="text-[#555]"/>}
        </div>
      </button>
      {open && (
        <div className="divide-y divide-[#111]">
          {group.matches.map(match => <MatchCard key={match.id} match={match}/>)}
        </div>
      )}
    </div>
  )
}

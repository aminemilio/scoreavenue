'use client'
import { useState } from 'react'
import { Bell, ChevronDown, ChevronUp } from 'lucide-react'
import { Match } from '@/types'
import { isLive, isFinished, isUpcoming, formatMatchTime } from '@/lib/utils'
import { LiveBadge } from '@/components/ui/LiveBadge'

function TeamCrest({ name, color }: { name: string; color?: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
      style={{ background: color ? `${color}22` : '#2A2A2A', color: color || '#888' }}>
      {initials}
    </div>
  )
}

export function MatchCard({ match }: { match: Match }) {
  const [expanded, setExpanded] = useState(false)
  const live = isLive(match.status)
  const finished = isFinished(match.status)
  const upcoming = isUpcoming(match.status)
  const homeWins = finished && (match.score.home ?? 0) > (match.score.away ?? 0)
  const awayWins = finished && (match.score.away ?? 0) > (match.score.home ?? 0)
  const redCardAway = match.events?.some(e => e.type === 'red' && e.team === 'away')
  const redCardHome = match.events?.some(e => e.type === 'red' && e.team === 'home')

  return (
    <div className={`${live ? 'border-l-2 border-red-500' : ''}`}>
      <div className="grid items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-white/[0.02] transition-colors"
        style={{ gridTemplateColumns: '44px 1fr auto 1fr 44px' }}
        onClick={() => match.stats?.length && setExpanded(!expanded)}>
        <div className="text-center">
          {live && <LiveBadge elapsed={match.status.elapsed}/>}
          {match.status.short === 'HT' && <span className="inline-flex items-center px-1.5 py-0.5 bg-[#2A2A2A] text-[#888] text-[10px] font-medium rounded">HT</span>}
          {finished && <span className="text-[11px] text-[#555] font-medium">FT</span>}
          {upcoming && <span className="text-[11px] text-[#888]">{formatMatchTime(match.date)}</span>}
        </div>
        <div className="flex items-center gap-2 justify-end">
          {redCardHome && <span className="w-2 h-2.5 bg-red-500 rounded-[2px] shrink-0"/>}
          <span className={`text-[13px] text-right truncate ${homeWins ? 'text-white font-semibold' : awayWins ? 'text-[#555]' : 'text-white'}`}>{match.homeTeam.name}</span>
          <TeamCrest name={match.homeTeam.name} color={match.homeTeam.color}/>
        </div>
        <div className="flex items-center gap-1 justify-center min-w-[52px]">
          {upcoming ? (
            <span className="text-[13px] text-[#555] tracking-widest">vs</span>
          ) : (
            <>
              <div className={`w-6 h-6 rounded flex items-center justify-center text-[14px] font-bold bg-[#1A1A1A] ${homeWins ? 'text-green-400' : awayWins ? 'text-[#555]' : 'text-white'}`}>{match.score.home ?? 0}</div>
              <span className="text-[#2A2A2A] text-xs">:</span>
              <div className={`w-6 h-6 rounded flex items-center justify-center text-[14px] font-bold bg-[#1A1A1A] ${awayWins ? 'text-green-400' : homeWins ? 'text-[#555]' : 'text-white'}`}>{match.score.away ?? 0}</div>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <TeamCrest name={match.awayTeam.name} color={match.awayTeam.color}/>
          <span className={`text-[13px] truncate ${awayWins ? 'text-white font-semibold' : homeWins ? 'text-[#555]' : 'text-white'}`}>{match.awayTeam.name}</span>
          {redCardAway && <span className="w-2 h-2.5 bg-red-500 rounded-[2px] shrink-0"/>}
        </div>
        <div className="flex items-center justify-center gap-2">
          <button onClick={e => e.stopPropagation()} className="text-[#555] hover:text-red-400 transition-colors"><Bell size={14}/></button>
          {match.stats && match.stats.length > 0 && (
            <span className="text-[#555]">{expanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}</span>
          )}
        </div>
      </div>
      {expanded && match.stats && match.stats.length > 0 && (
        <div className="px-4 pb-3 border-t border-[#111]">
          <div className="pt-3 space-y-2">
            {match.stats.map((stat, i) => {
              const hv = parseFloat(String(stat.home))
              const av = parseFloat(String(stat.away))
              const total = hv + av
              const hPct = total > 0 ? (hv / total) * 100 : 50
              return (
                <div key={i}>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-white/60">{stat.home}</span>
                    <span className="text-[#555]">{stat.label}</span>
                    <span className="text-white/60">{stat.away}</span>
                  </div>
                  {!isNaN(hv) && !isNaN(av) && (
                    <div className="flex gap-1 h-1">
                      <div className="flex-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full ml-auto" style={{width: `${hPct}%`}}/>
                      </div>
                      <div className="flex-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: `${100-hPct}%`}}/>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Bell, ChevronDown, ChevronUp } from 'lucide-react'
import { Match } from '@/types'
import { isLive, isFinished, isUpcoming, formatMatchTime } from '@/lib/utils'
import { LiveBadge } from '@/components/ui/LiveBadge'

function TeamCrest({ name, logo, color }: { name: string; logo?: string; color?: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 overflow-hidden"
      style={{ background: color ? `${color}22` : '#2A2A2A', color: color || '#888' }}>
      {logo ? <img src={logo} alt="" className="w-full h-full object-contain" onError={event => { event.currentTarget.style.display = 'none' }} /> : initials}
    </div>
  )
}

const EVENT_META = {
  goal: { label: 'Goal', icon: '⚽', tone: 'bg-green-500/15 text-green-400 border border-green-500/25' },
  yellow: { label: 'Yellow', icon: '🟨', tone: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/25' },
  red: { label: 'Red', icon: '🟥', tone: 'bg-red-500/15 text-red-300 border border-red-500/25' },
  sub: { label: 'Sub', icon: '🔁', tone: 'bg-blue-500/15 text-blue-300 border border-blue-500/25' },
} as const

export function MatchCard({ match }: { match: Match }) {
  const [expanded, setExpanded] = useState(false)
  const [alertEnabled, setAlertEnabled] = useState(false)
  const live = isLive(match.status)
  const finished = isFinished(match.status)
  const upcoming = isUpcoming(match.status)
  const homeWins = finished && (match.score.home ?? 0) > (match.score.away ?? 0)
  const awayWins = finished && (match.score.away ?? 0) > (match.score.home ?? 0)
  const redCardAway = match.events?.some(e => e.type === 'red' && e.team === 'away')
  const redCardHome = match.events?.some(e => e.type === 'red' && e.team === 'home')
  const hasDetails = Boolean(match.stats?.length || match.events?.length)

  return (
    <div className={`${live ? 'border-l-2 border-red-500' : ''}`}>
      <div
        className="grid items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-white/[0.02] transition-colors"
        style={{ gridTemplateColumns: '44px 1fr auto 1fr 44px' }}
        onClick={() => hasDetails && setExpanded(!expanded)}
      >
        <div className="text-center">
          {live && <LiveBadge elapsed={match.status.elapsed} />}
          {match.status.short === 'HT' && (
            <span className="inline-flex items-center px-1.5 py-0.5 bg-[#2A2A2A] text-[#888] text-[10px] font-medium rounded">HT</span>
          )}
          {finished && <span className="text-[11px] text-[#555] font-medium">FT</span>}
          {upcoming && <span className="text-[11px] text-[#888]">{formatMatchTime(match.date)}</span>}
        </div>

        <div className="flex items-center gap-2 justify-end">
          {redCardHome && <span className="w-2 h-2.5 bg-red-500 rounded-[2px] shrink-0" />}
          <span className={`text-[13px] text-right truncate ${homeWins ? 'text-white font-semibold' : awayWins ? 'text-[#555]' : 'text-white'}`}>
            {match.homeTeam.name}
          </span>
          <TeamCrest name={match.homeTeam.name} logo={match.homeTeam.logo} color={match.homeTeam.color} />
        </div>

        <div className="flex items-center gap-1 justify-center min-w-[52px]">
          {upcoming ? (
            <span className="text-[13px] text-[#555] tracking-widest">vs</span>
          ) : (
            <>
              <div className={`w-6 h-6 rounded flex items-center justify-center text-[14px] font-bold bg-[#1A1A1A] ${homeWins ? 'text-green-400' : awayWins ? 'text-[#555]' : 'text-white'}`}>
                {match.score.home ?? 0}
              </div>
              <span className="text-[#2A2A2A] text-xs">:</span>
              <div className={`w-6 h-6 rounded flex items-center justify-center text-[14px] font-bold bg-[#1A1A1A] ${awayWins ? 'text-green-400' : homeWins ? 'text-[#555]' : 'text-white'}`}>
                {match.score.away ?? 0}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <TeamCrest name={match.awayTeam.name} logo={match.awayTeam.logo} color={match.awayTeam.color} />
          <span className={`text-[13px] truncate ${awayWins ? 'text-white font-semibold' : homeWins ? 'text-[#555]' : 'text-white'}`}>
            {match.awayTeam.name}
          </span>
          {redCardAway && <span className="w-2 h-2.5 bg-red-500 rounded-[2px] shrink-0" />}
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={e => { e.stopPropagation(); setAlertEnabled(!alertEnabled) }}
            aria-label={alertEnabled ? `Disable alerts for ${match.homeTeam.name} vs ${match.awayTeam.name}` : `Enable alerts for ${match.homeTeam.name} vs ${match.awayTeam.name}`}
            aria-pressed={alertEnabled}
            className={`transition-colors ${alertEnabled ? 'text-red-400' : 'text-[#555] hover:text-red-400'}`}
          >
            <Bell size={14} />
          </button>
          <Link
            href={`/match/${match.id}?sport=${encodeURIComponent(match.sport)}`}
            onClick={e => e.stopPropagation()}
            className="text-[10px] font-semibold uppercase tracking-wide text-[#888] hover:text-white transition-colors"
          >
            Detail
          </Link>
          {hasDetails && (
            <span className="text-[#555]">{expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
          )}
        </div>
      </div>

      {expanded && hasDetails && (
        <div className="px-4 pb-3 border-t border-[#111]">
          <div className="pt-3 space-y-3">
            {match.events?.length ? (
              <div className="space-y-2">
                {match.events.slice(0, 4).map((event, idx) => {
                  const meta = EVENT_META[event.type]
                  const teamLabel = event.team === 'home' ? match.homeTeam.shortName : match.awayTeam.shortName

                  return (
                    <div key={`${event.time}-${idx}`} className="flex items-center justify-between gap-3 rounded-lg bg-[#111] px-2.5 py-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-[10px] ${meta.tone}`}>
                          {meta.icon}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] text-white font-medium truncate">{event.player ?? meta.label}</p>
                          <p className="text-[10px] text-[#666]">{teamLabel} · {event.time} min</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#777] uppercase tracking-wide">{meta.label}</span>
                    </div>
                  )
                })}
              </div>
            ) : null}

            {match.stats?.length ? (
              <div className="space-y-2">
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
                            <div className="h-full bg-red-500 rounded-full ml-auto" style={{ width: `${hPct}%` }} />
                          </div>
                          <div className="flex-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${100 - hPct}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

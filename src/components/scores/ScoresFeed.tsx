'use client'
import { useState, useEffect, useCallback } from 'react'
import { RefreshCw } from 'lucide-react'
import { LeagueGroup, Sport } from '@/types'
import { LeagueSection } from './LeagueSection'
import { isLive, isFinished, isUpcoming } from '@/lib/utils'
import { useCountrySports } from '@/hooks/useCountrySports'
import { SPORT_CATALOG, SPORT_LEAGUES } from '@/lib/country-sports'

type Filter = 'all' | 'live' | 'finished' | 'upcoming'
const DAY_LABELS: Record<string, string> = { '-2':'2 days ago','-1':'Yesterday','0':'Today','1':'Tomorrow','2':'In 2 days' }

export function ScoresFeed() {
  const { countryCode, sportOrder, loading: countryLoading } = useCountrySports()
  const [sport, setSport] = useState<Sport>('football')
  const [filter, setFilter] = useState<Filter>('all')
  const [day, setDay] = useState<number | null>(null)
  const [leagueFilter, setLeagueFilter] = useState<string | null>(null)
  const [data, setData] = useState<LeagueGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!countryLoading && !initialized) { setSport(sportOrder[0]); setInitialized(true) }
  }, [countryLoading, sportOrder, initialized])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
        const response = await fetch(`/api/live-scores?sport=${encodeURIComponent(sport)}&country=${encodeURIComponent(countryCode)}`, { cache: 'no-store' })
      const payload = response.ok ? await response.json() : []
      setData(Array.isArray(payload) ? payload : [])
    } catch {
      setData([])
    } finally {
      setLastUpdate(new Date())
      setLoading(false)
    }
  }, [countryCode, sport])

  useEffect(() => { loadData() }, [loadData])
  useEffect(() => { const i = setInterval(loadData, 60000); return () => clearInterval(i) }, [loadData])

  const refresh = async () => { setRefreshing(true); await loadData(); setTimeout(() => setRefreshing(false), 600) }

  const orderedSports = sportOrder.map(id => SPORT_CATALOG.find(s => s.id === id)).filter(Boolean) as typeof SPORT_CATALOG

  const filtered = data.map(g => ({
    ...g,
    matches: g.matches.filter(m => {
      if (leagueFilter && m.league.name !== leagueFilter) return false
      const matchDay = Math.round((new Date(m.date).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000)
      if (day !== null && matchDay !== day) return false
      if (filter === 'live') return isLive(m.status)
      if (filter === 'finished') return isFinished(m.status)
      if (filter === 'upcoming') return isUpcoming(m.status)
      return true
    })
  })).filter(g => g.matches.length > 0)

  const totalLive = data.flatMap(g => g.matches).filter(m => isLive(m.status)).length

  const toggleLeagueFilter = (league: string) => {
    setLeagueFilter(current => current === league ? null : league)
  }

  const selectSport = (nextSport: Sport) => {
    setSport(nextSport)
    setFilter('all')
    setDay(0)
    setLeagueFilter(null)
  }

  return (
    <div>
      <div className="mb-3 rounded-2xl border border-[#151d2a] bg-[#0d1220] p-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x">
          {orderedSports.map((s) => (
            <button key={s.id} type="button" onClick={() => selectSport(s.id)}
              aria-pressed={sport === s.id}
              className={`flex shrink-0 snap-start items-center gap-1.5 rounded-xl border px-3.5 py-2 text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer
                ${sport === s.id ? 'bg-[#00FF87] border-[#00FF87] text-[#090D16]' : 'border-[#1E293B] text-[#64748B] hover:border-[#00FF87]/50 hover:text-white'}`}>
              <span aria-hidden="true">{s.emoji}</span>{s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 rounded-2xl border border-[#151d2a] bg-[#0d1220] px-3 py-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">Major competitions</p>
            <p className="mt-0.5 text-[11px] text-[#475569]">{SPORT_CATALOG.find(item => item.id === sport)?.label} coverage</p>
          </div>
          {leagueFilter && <button type="button" onClick={() => setLeagueFilter(null)} className="text-[10px] text-[#00FF87] hover:text-white">Clear league</button>}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {SPORT_LEAGUES[sport].map(l => (
            <button
              key={l}
              type="button"
              onClick={() => toggleLeagueFilter(l)}
              className={`text-[11px] whitespace-nowrap rounded-full border px-2.5 py-1 transition-colors ${leagueFilter === l ? 'border-lime-400 bg-lime-400/10 text-lime-300' : 'border-[#2A2A2A] bg-[#111] text-[#888] hover:border-[#444] hover:text-white'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {(['all','live','finished','upcoming'] as Filter[]).map(f => (
          <button key={f} type="button" onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`px-3 py-1 rounded-full text-[12px] font-medium border transition-all cursor-pointer
              ${filter === f ? f === 'live' ? 'bg-[#00FF87] border-[#00FF87] text-[#090D16]' : 'bg-white/10 border-white/10 text-white' : 'border-[#1E293B] text-[#64748B] hover:border-[#475569] hover:text-white'}`}>
            {f === 'live' && totalLive > 0 ? <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"/>Live ({totalLive})</span> : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <div className="flex items-center gap-1 ml-auto">
          <button type="button" onClick={() => setDay(d => d === null ? -1 : d - 1)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#555] hover:text-white text-sm cursor-pointer">‹</button>
            <span className="text-[12px] text-[#888] min-w-[70px] text-center">{day === null ? 'All dates' : DAY_LABELS[String(day)] ?? (day > 0 ? `+${day}d` : `${day}d`)}</span>
          <button type="button" onClick={() => setDay(d => d === null ? 1 : d + 1)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#555] hover:text-white text-sm cursor-pointer">›</button>
          <button type="button" onClick={() => setDay(null)} className={`px-2 h-7 rounded-lg border text-[10px] cursor-pointer ${day === null ? 'border-[#00FF87] text-[#00FF87]' : 'border-[#2A2A2A] text-[#555] hover:text-white'}`}>All</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Live now', value: totalLive, tone: 'text-[#00FF87]', dot: true },
          { label: 'Finished', value: data.flatMap(g => g.matches).filter(m => isFinished(m.status)).length, tone: 'text-white' },
          { label: 'Upcoming', value: data.flatMap(g => g.matches).filter(m => isUpcoming(m.status)).length, tone: 'text-blue-300' },
        ].map(item => (
          <div key={item.label} className="rounded-lg border border-[#1A1A1A] bg-[#0D0D0D] px-3 py-2">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-[#555]">
              {item.dot && <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />}
              {item.label}
            </div>
            <div className={`mt-1 text-lg font-bold ${item.tone}`}>{item.value}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="border border-[#1A1A1A] rounded-xl overflow-hidden animate-pulse">
              <div className="h-10 bg-[#111]"/>
              {[1,2].map(j => <div key={j} className="h-12 bg-[#0A0A0A] border-t border-[#111]"/>)}
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-[#555]"><div className="text-4xl mb-3">🔍</div><div className="text-sm">No matches found</div></div>
      ) : (
        filtered.map(g => <LeagueSection key={g.league.id} group={g}/>)
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1A1A1A]">
        <span className="text-[11px] text-[#555]">{filtered.flatMap(g => g.matches).length} matches · {lastUpdate ? lastUpdate.toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'}) : 'Loading...'}</span>
        <button type="button" onClick={refresh} className="flex items-center gap-1.5 text-[11px] text-[#555] hover:text-white transition-colors cursor-pointer">
          <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''}/>Refresh
        </button>
      </div>
    </div>
  )
}

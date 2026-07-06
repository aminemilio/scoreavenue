'use client'
import { useState, useEffect, useCallback } from 'react'
import { RefreshCw, ChevronDown } from 'lucide-react'
import { LeagueGroup, Sport } from '@/types'
import { MOCK_FOOTBALL, MOCK_NBA } from '@/lib/mock-data'
import { LeagueSection } from './LeagueSection'
import { isLive, isFinished, isUpcoming } from '@/lib/utils'
import { useCountrySports } from '@/hooks/useCountrySports'
import { COUNTRY_PROFILES } from '@/lib/country-sports'

const ALL_SPORTS = [
  { id: 'football' as Sport,   label: 'Football',   emoji: '⚽' },
  { id: 'basketball' as Sport, label: 'Basketball', emoji: '🏀' },
  { id: 'tennis' as Sport,     label: 'Tennis',     emoji: '🎾' },
  { id: 'hockey' as Sport,     label: 'Hockey',     emoji: '🏒' },
  { id: 'baseball' as Sport,   label: 'Baseball',   emoji: '⚾' },
]

type Filter = 'all' | 'live' | 'finished' | 'upcoming'
const DAY_LABELS: Record<string, string> = { '-2':'2 days ago','-1':'Yesterday','0':'Today','1':'Tomorrow','2':'In 2 days' }

export function ScoresFeed() {
  const { countryCode, profile, sportOrder, loading: countryLoading, setCountryCode } = useCountrySports()
  const [sport, setSport] = useState<Sport>('football')
  const [filter, setFilter] = useState<Filter>('all')
  const [day, setDay] = useState(0)
  const [data, setData] = useState<LeagueGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!countryLoading && !initialized) { setSport(sportOrder[0]); setInitialized(true) }
  }, [countryLoading, sportOrder, initialized])

  const loadData = useCallback(async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 350))
    setData(sport === 'basketball' ? MOCK_NBA : MOCK_FOOTBALL)
    setLastUpdate(new Date())
    setLoading(false)
  }, [sport])

  useEffect(() => { loadData() }, [loadData])
  useEffect(() => { const i = setInterval(loadData, 60000); return () => clearInterval(i) }, [loadData])

  const refresh = async () => { setRefreshing(true); await loadData(); setTimeout(() => setRefreshing(false), 600) }

  const orderedSports = sportOrder.map(id => ALL_SPORTS.find(s => s.id === id)).filter(Boolean) as typeof ALL_SPORTS

  const filtered = data.map(g => ({
    ...g,
    matches: g.matches.filter(m => {
      if (filter === 'live') return isLive(m.status)
      if (filter === 'finished') return isFinished(m.status)
      if (filter === 'upcoming') return isUpcoming(m.status)
      return true
    })
  })).filter(g => g.matches.length > 0)

  const totalLive = data.flatMap(g => g.matches).filter(m => isLive(m.status)).length

  return (
    <div>
      {!countryLoading && (
        <div className="flex items-center gap-2 mb-4 relative">
          <button onClick={() => setShowPicker(!showPicker)} className="flex items-center gap-2 px-3 py-1.5 bg-[#111] border border-[#2A2A2A] rounded-lg hover:border-[#444] transition-colors">
            <span className="text-base leading-none">{profile.flag}</span>
            <span className="text-[12px] text-[#888]">{profile.name}</span>
            <ChevronDown size={12} className="text-[#555]"/>
          </button>
          <span className="text-[11px] text-[#555]">Sports ranked for your country</span>
          {showPicker && (
            <div className="absolute top-10 left-0 z-50 bg-[#111] border border-[#2A2A2A] rounded-xl shadow-2xl w-56 max-h-64 overflow-y-auto">
              {Object.entries(COUNTRY_PROFILES).filter(([k]) => k !== 'DEFAULT').sort(([,a],[,b]) => a.name.localeCompare(b.name)).map(([code, p]) => (
                <button key={code} onClick={() => { setCountryCode(code); setShowPicker(false); setSport(p.sports[0] as Sport) }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/5 transition-colors ${code === countryCode ? 'bg-red-500/10' : ''}`}>
                  <span className="text-base">{p.flag}</span>
                  <span className={`text-[12px] ${code === countryCode ? 'text-red-400 font-medium' : 'text-[#888]'}`}>{p.name}</span>
                  {code === countryCode && <span className="ml-auto text-[10px] text-red-400">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {orderedSports.map((s, idx) => (
          <button key={s.id} onClick={() => { setSport(s.id); setFilter('all') }}
            className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all whitespace-nowrap
              ${sport === s.id ? 'bg-red-600 border-red-600 text-white' : 'border-[#2A2A2A] text-[#888] hover:border-[#444] hover:text-white'}`}>
            <span>{s.emoji}</span>{s.label}
            {idx === 0 && <span className={`absolute -top-1.5 -right-1.5 text-[8px] font-bold px-1 rounded-full ${sport === s.id ? 'bg-white text-red-600' : 'bg-red-600 text-white'}`}>#1</span>}
          </button>
        ))}
      </div>

      {profile.topLeagues.length > 0 && (
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          <span className="text-[10px] text-[#555] shrink-0">Top:</span>
          {profile.topLeagues.slice(0, 4).map(l => (
            <span key={l} className="text-[11px] text-[#888] bg-[#111] border border-[#2A2A2A] px-2.5 py-1 rounded-full whitespace-nowrap hover:border-[#444] hover:text-white cursor-pointer transition-colors">{l}</span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {(['all','live','finished','upcoming'] as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-[12px] font-medium border transition-all
              ${filter === f ? f === 'live' ? 'bg-red-600 border-red-600 text-white' : 'bg-white/10 border-white/10 text-white' : 'border-[#2A2A2A] text-[#555] hover:border-[#444] hover:text-[#888]'}`}>
            {f === 'live' && totalLive > 0 ? <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"/>Live ({totalLive})</span> : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={() => setDay(d => d-1)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#555] hover:text-white text-sm">‹</button>
          <span className="text-[12px] text-[#888] min-w-[70px] text-center">{DAY_LABELS[String(day)] ?? (day > 0 ? `+${day}d` : `${day}d`)}</span>
          <button onClick={() => setDay(d => d+1)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#555] hover:text-white text-sm">›</button>
        </div>
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
        <span className="text-[11px] text-[#555]">{filtered.flatMap(g => g.matches).length} matches · {lastUpdate.toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'})}</span>
        <button onClick={refresh} className="flex items-center gap-1.5 text-[11px] text-[#555] hover:text-white transition-colors">
          <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''}/>Refresh
        </button>
      </div>
    </div>
  )
}

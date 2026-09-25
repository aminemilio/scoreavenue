'use client'
import { useState, useEffect } from 'react'
import type { LeagueGroup } from '@/types'

export function NewsTicker() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const [news, setNews] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/live-scores?sport=football', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : [])
      .then((groups: LeagueGroup[]) => {
        const items = groups.flatMap(group => group.matches.map(match => `${match.status.short === 'LIVE' ? 'LIVE' : match.status.short} — ${match.homeTeam.name} ${match.score.home ?? '-'}-${match.score.away ?? '-'} ${match.awayTeam.name}`))
        setNews(items)
      })
      .catch(() => setNews([]))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!news.length) return
      setVisible(false)
      setTimeout(() => { setIdx(i => (i + 1) % news.length); setVisible(true) }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [news.length])

  return (
    <div className="w-full bg-red-600 py-2 px-4 flex items-center gap-3">
      <span className="text-white text-[10px] font-bold tracking-widest uppercase shrink-0">⚡ Breaking</span>
      <div className="w-px h-3 bg-white/30 shrink-0"/>
      <div className="text-white text-[12px] font-medium truncate transition-opacity duration-300" style={{opacity: visible ? 1 : 0}}>
        {news.length ? news[idx % news.length] : 'Live match updates will appear here when providers report events.'}
      </div>
    </div>
  )
}

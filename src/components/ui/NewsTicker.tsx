'use client'
import { useState, useEffect } from 'react'

const NEWS = [
  "🔴 GOAL — Arsenal 2-1 Man City · Martinelli 61'",
  "⚽ GOAL — Real Madrid 2-2 Bayern · Vinicius 79'",
  "🟥 RED CARD — Kimmich (Bayern) 55'",
  "🔴 GOAL — Liverpool 1-0 Chelsea · Salah 34'",
  "⚽ HALF TIME — Monaco 0-0 Lyon",
  "📋 LINEUPS OUT — PSG vs Dortmund · 21:00",
  "🏀 LIVE — Boston Celtics 98-94 LA Lakers · Q4",
]

export function NewsTicker() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIdx(i => (i + 1) % NEWS.length); setVisible(true) }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-red-600 py-2 px-4 flex items-center gap-3">
      <span className="text-white text-[10px] font-bold tracking-widest uppercase shrink-0">⚡ Breaking</span>
      <div className="w-px h-3 bg-white/30 shrink-0"/>
      <div className="text-white text-[12px] font-medium truncate transition-opacity duration-300" style={{opacity: visible ? 1 : 0}}>
        {NEWS[idx]}
      </div>
    </div>
  )
}

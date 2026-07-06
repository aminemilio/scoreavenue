'use client'
import Link from 'next/link'

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: { b: 28, ft: 17, tt: 14, st: 7, sp: 3 }, md: { b: 36, ft: 22, tt: 18, st: 8, sp: 3.5 }, lg: { b: 56, ft: 34, tt: 28, st: 12, sp: 5 } }[size]
  return (
    <Link href="/" aria-label="ScoreAvenue">
      <svg viewBox={`0 0 ${s.b * 5.5} ${s.b}`} width={s.b * 5.5} height={s.b}>
        <defs>
          <linearGradient id="sg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF3B30"/>
            <stop offset="49.9%" stopColor="#FF3B30"/>
            <stop offset="50%" stopColor="#C9200F"/>
            <stop offset="100%" stopColor="#C9200F"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={s.b} height={s.b} rx={s.b * 0.18} fill="url(#sg)"/>
        <line x1="0" y1={s.b/2} x2={s.b} y2={s.b/2} stroke="rgba(0,0,0,0.22)" strokeWidth="1.5"/>
        <text x={s.b/2} y={s.b*0.72} textAnchor="middle" fontFamily="Arial Black,Arial,sans-serif" fontSize={s.ft} fontWeight="900" fill="#fff">S</text>
        <text x={s.b*1.22} y={s.b*0.56} fontFamily="Arial Black,Arial,sans-serif" fontSize={s.tt} fontWeight="900" fill="#fff" letterSpacing="-0.5">Score</text>
        <text x={s.b*1.24} y={s.b*0.88} fontFamily="Arial,sans-serif" fontSize={s.st} fontWeight="300" fill="#FF3B30" letterSpacing={s.sp}>AVENUE</text>
      </svg>
    </Link>
  )
}

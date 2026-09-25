import Link from 'next/link'
import { ArrowLeft, CalendarClock, Trophy } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getAllMatches as getLiveMatches, getStandings } from '@/lib/live-scores'
import { SPORT_CATALOG } from '@/lib/country-sports'
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { sport: string } }): Metadata {
  const sportKey = params.sport.toLowerCase().replace(/-/g, ' ')
  const sport = SPORT_CATALOG.find(option => option.id === sportKey)
  const label = sport?.label ?? 'Sports'
  return {
    title: `${label} Live Scores`,
    description: `Follow live ${label.toLowerCase()} scores, fixtures, results, and match events on ScoreAvenue.`,
    alternates: { canonical: `/${params.sport.toLowerCase()}` },
    openGraph: { title: `${label} Live Scores | ScoreAvenue`, description: `Live ${label.toLowerCase()} scores, fixtures, and results.` },
  }
}

export default async function SportPage({ params }: { params: { sport: string } }) {
  const sportKey = params.sport.toLowerCase().replace(/-/g, ' ')
  const sport = SPORT_CATALOG.find(option => option.id === sportKey)
  const label = sport?.label

  if (!label) {
    notFound()
  }

  const liveMatches = await getLiveMatches(sport.id)
  const matches = liveMatches.filter(group =>
    group.matches.some(match => match.sport === sportKey)
  )

  const filteredMatches = matches.flatMap(group =>
    group.matches.filter(match => match.sport === sportKey)
  )

  const liveStandings = await getStandings()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-white mb-6">
        <ArrowLeft size={14} /> Back to all scores
      </Link>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#666]">Sports</p>
          <h1 className="mt-2 text-3xl font-bold text-white">{label}</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#1A1A1A] bg-[#0F0F0F] px-3 py-2 text-[11px] text-[#777]">
          <CalendarClock size={14} className="text-red-400" />
          {filteredMatches.length} matches live & upcoming
        </div>
      </div>

      <div className="grid gap-4">
        {filteredMatches.map(match => (
          <Link key={match.id} href={`/match/${match.id}?sport=${encodeURIComponent(match.sport)}`} className="block border border-[#1A1A1A] rounded-2xl bg-[#0F0F0F] p-4 hover:border-[#2A2A2A] transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-300">{match.status.short}</span>
                <span className="text-[11px] text-[#666]">{match.league.name}</span>
              </div>
              <div className="text-[11px] text-[#666]">{new Date(match.date).toLocaleDateString()}</div>
            </div>

            <div className="mt-4 grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="flex items-center justify-end gap-3">
                <span className="text-right text-white font-semibold">{match.homeTeam.name}</span>
                <span className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[10px] font-bold text-white">{match.homeTeam.shortName.slice(0,2)}</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-black text-white">{match.score.home ?? 0}</span>
                <span className="text-[#555] text-xl">:</span>
                <span className="text-3xl font-black text-white">{match.score.away ?? 0}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[10px] font-bold text-white">{match.awayTeam.shortName.slice(0,2)}</span>
                <span className="text-white font-semibold">{match.awayTeam.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {sportKey === 'football' && (
        <div className="mt-8 border border-[#1A1A1A] rounded-2xl bg-[#0F0F0F] p-4">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-lime-300" />
            <h2 className="text-sm font-semibold text-white">Top standings</h2>
          </div>
          <div className="space-y-2">
            {(liveStandings['Premier League'] ?? []).slice(0, 4).map((row, index) => (
              <div key={row.team} className="flex items-center justify-between rounded-lg bg-[#101010] px-3 py-2">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[#666]">{index + 1}</span>
                  <span className="text-sm text-white">{row.team}</span>
                </div>
                <span className="text-[12px] text-[#777]">{row.points} pts</span>
              </div>
            ))}
            {(liveStandings['Premier League'] ?? []).length === 0 && <p className="text-sm text-[#666]">No live standings available.</p>}
          </div>
        </div>
      )}
    </div>
  )
}

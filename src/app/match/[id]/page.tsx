import Link from 'next/link'
import { ArrowLeft, CalendarDays, MapPin, Trophy } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllMatches as getLiveMatches } from '@/lib/live-scores'
import { getAllMatches as getMockMatches, MOCK_STANDINGS } from '@/lib/mock-data'

async function findMatch(id: string) {
  const liveMatches = await getLiveMatches()
  const allMatches = liveMatches.length ? liveMatches : getMockMatches()
  return allMatches
    .flatMap(group => group.matches)
    .find(item => item.id === Number(id))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const match = await findMatch(params.id)
  if (!match) return { title: 'Match Not Found', robots: { index: false, follow: true } }

  const title = `${match.homeTeam.name} vs ${match.awayTeam.name}`
  return {
    title,
    description: `${title} live score, match events, stats, and ${match.league.name} standings on ScoreAvenue.`,
    alternates: { canonical: `/match/${params.id}` },
    openGraph: { title: `${title} | ScoreAvenue`, description: `Follow the live score and match events for ${title}.` },
  }
}

function formatScore(value: number | null) {
  return value ?? 0
}

export default async function MatchDetailsPage({ params }: { params: { id: string } }) {
  const matchId = Number(params.id)
  const match = await findMatch(params.id)

  if (!match) {
    notFound()
  }

  const liveMatches = await getLiveMatches()
  const standingsSource = liveMatches.length ? (await import('@/lib/live-scores')).getStandings() : Promise.resolve(MOCK_STANDINGS)
  const standings = (await standingsSource)[match.league.name] ?? []

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-white mb-6">
        <ArrowLeft size={14} /> Back to scores
      </Link>

      <div className="border border-[#1A1A1A] rounded-2xl bg-[#0F0F0F] overflow-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SportsEvent',
          name: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
          startDate: match.date,
          eventStatus: match.status.short === 'LIVE' ? 'https://schema.org/EventInProgress' : 'https://schema.org/EventScheduled',
          location: { '@type': 'Place', name: match.venue ?? 'Venue TBD' },
          competitor: [
            { '@type': 'SportsTeam', name: match.homeTeam.name },
            { '@type': 'SportsTeam', name: match.awayTeam.name },
          ],
          sport: match.sport,
        }) }} />
        <div className="bg-gradient-to-r from-[#171717] to-[#0D0D0D] border-b border-[#1A1A1A] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#666]">{match.league.name}</p>
              <h1 className="mt-2 text-2xl font-bold text-white">{match.homeTeam.name} vs {match.awayTeam.name}</h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#888]">
              <span className="inline-flex items-center gap-2"><CalendarDays size={14} /> {new Date(match.date).toLocaleDateString()}</span>
              <span className="inline-flex items-center gap-2"><MapPin size={14} /> {match.venue ?? 'Venue TBD'}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 mb-8">
            <div className="flex items-center justify-end gap-3">
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{match.homeTeam.name}</p>
                <p className="text-xs text-[#666]">{match.homeTeam.shortName}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center text-lg font-bold text-white">{match.homeTeam.shortName.slice(0, 2)}</div>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <div className="text-5xl font-black text-white">{formatScore(match.score.home)}</div>
              <div className="text-2xl text-[#555]">:</div>
              <div className="text-5xl font-black text-white">{formatScore(match.score.away)}</div>
            </div>

            <div className="flex items-center justify-start gap-3">
              <div className="w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center text-lg font-bold text-white">{match.awayTeam.shortName.slice(0, 2)}</div>
              <div>
                <p className="text-2xl font-bold text-white">{match.awayTeam.name}</p>
                <p className="text-xs text-[#666]">{match.awayTeam.shortName}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6">
            <div className="space-y-5">
              <div className="border border-[#1A1A1A] rounded-xl p-4">
                <h2 className="text-sm font-semibold text-white mb-3">Match timeline</h2>
                <div className="space-y-2">
                  {(match.events ?? []).length > 0 ? (
                    match.events?.map((event, index) => (
                      <div key={`${event.time}-${index}`} className="flex items-center justify-between rounded-lg border border-[#1A1A1A] bg-[#101010] px-3 py-2">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-xs text-red-300">{event.type === 'goal' ? '⚽' : event.type === 'yellow' ? '🟨' : event.type === 'red' ? '🟥' : '🔁'}</span>
                          <div>
                            <p className="text-sm text-white">{event.player ?? 'Event'}</p>
                            <p className="text-[11px] text-[#666]">{event.team === 'home' ? match.homeTeam.shortName : match.awayTeam.shortName}</p>
                          </div>
                        </div>
                        <span className="text-xs text-[#888]">{event.time} min</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#666]">No events logged yet.</p>
                  )}
                </div>
              </div>

              <div className="border border-[#1A1A1A] rounded-xl p-4">
                <h2 className="text-sm font-semibold text-white mb-3">Stats</h2>
                <div className="space-y-3">
                  {(match.stats ?? []).length > 0 ? (
                    match.stats?.map((stat, idx) => {
                      const homeVal = Number(stat.home)
                      const awayVal = Number(stat.away)
                      const total = Number.isFinite(homeVal + awayVal) ? homeVal + awayVal : 0
                      const share = total > 0 ? (homeVal / total) * 100 : 50

                      return (
                        <div key={`${stat.label}-${idx}`}>
                          <div className="mb-1 flex items-center justify-between text-[11px] text-[#777]">
                            <span>{stat.home}</span>
                            <span>{stat.label}</span>
                            <span>{stat.away}</span>
                          </div>
                          <div className="flex gap-1 h-2">
                            <div className="flex-1 rounded-full bg-[#1A1A1A] overflow-hidden">
                              <div className="h-full rounded-full bg-red-500" style={{ width: `${share}%` }} />
                            </div>
                            <div className="flex-1 rounded-full bg-[#1A1A1A] overflow-hidden">
                              <div className="h-full rounded-full bg-blue-500" style={{ width: `${100 - share}%` }} />
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-sm text-[#666]">No detailed stats available.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border border-[#1A1A1A] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={16} className="text-red-400" />
                <h2 className="text-sm font-semibold text-white">League table</h2>
              </div>

              <div className="space-y-2">
                {standings.length > 0 ? standings.map((teamRow, idx) => (
                  <div key={teamRow.team} className="flex items-center gap-2 rounded-lg bg-[#101010] px-2.5 py-2">
                    <span className="w-5 text-[10px] text-[#666]">{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm text-white">{teamRow.team}</p>
                    </div>
                    <span className="text-[11px] text-[#777]">{teamRow.points}</span>
                  </div>
                )) : <p className="text-sm text-[#666]">No standings available.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

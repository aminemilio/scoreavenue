import Link from 'next/link'
import { Search } from 'lucide-react'
import { getAllMatches as getLiveMatches } from '@/lib/live-scores'
import { getAllMatches as getMockMatches } from '@/lib/mock-data'

export const metadata = { title: 'Search', robots: { index: false, follow: true } }

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = (searchParams.q ?? '').trim()
  const liveMatches = await getLiveMatches()
  const allMatches = liveMatches.length ? liveMatches : getMockMatches()
  const results = query ? allMatches.flatMap(group => group.matches).filter(match => `${match.homeTeam.name} ${match.awayTeam.name} ${match.league.name}`.toLowerCase().includes(query.toLowerCase())) : []

  return <div className="max-w-4xl mx-auto px-4 py-10">
    <p className="text-[11px] uppercase tracking-[0.18em] text-[#8B5CF6]">Discover</p>
    <h1 className="mt-3 text-3xl font-bold text-white">Search teams and leagues</h1>
    <form action="/search" className="mt-6 flex gap-2"><div className="flex flex-1 items-center gap-2 rounded-lg border border-[#1E293B] bg-[#131B2E] px-3 focus-within:border-[#00FF87]"><Search size={16} className="text-[#64748B]" /><input name="q" defaultValue={query} className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-[#64748B]" placeholder="Try Arsenal, NBA, or Champions League" /></div><button className="rounded-lg bg-[#00FF87] px-4 text-sm font-semibold text-[#090D16] hover:bg-[#7CFFB9]">Search</button></form>
    {query && <p className="mt-8 text-sm text-[#777]">{results.length} result{results.length === 1 ? '' : 's'} for <span className="text-white">{query}</span></p>}
    <div className="mt-4 space-y-2">{results.map(match => <Link key={match.id} href={`/match/${match.id}`} className="flex items-center justify-between rounded-xl border border-[#1A1A1A] bg-[#0F0F0F] px-4 py-3 hover:border-[#333]"><div><p className="text-sm font-medium text-white">{match.homeTeam.name} vs {match.awayTeam.name}</p><p className="mt-1 text-xs text-[#666]">{match.league.name} · {match.status.long}</p></div><span className="text-sm font-bold text-white">{match.score.home ?? '-'} : {match.score.away ?? '-'}</span></Link>)}</div>
    {query && results.length === 0 && <div className="mt-6 rounded-xl border border-[#1A1A1A] px-4 py-8 text-center text-sm text-[#666]">No matching teams or leagues were found.</div>}
  </div>
}
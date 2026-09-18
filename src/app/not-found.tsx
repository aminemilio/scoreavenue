import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400"><Search size={24} /></div>
    <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-red-400">404</p>
    <h1 className="mt-2 text-2xl font-bold text-white">That page is off the scoreboard</h1>
    <p className="mt-3 text-sm leading-6 text-[#777]">The link may be outdated or the match may no longer be available. Head back to the live feed and keep following the action.</p>
    <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"><ArrowLeft size={15} /> Back to live scores</Link>
  </div>
}
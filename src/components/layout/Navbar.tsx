'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Bell, User, Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { SPORT_CATALOG } from '@/lib/country-sports'

const primarySports = SPORT_CATALOG.slice(0, 5)
const moreSports = SPORT_CATALOG.slice(5)
const sportHref = (id: string) => `/${id.toLowerCase().replace(/\s+/g, '-')}`

export function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = query.trim()
    if (!value) return
    setSearchOpen(false)
    router.push(`/search?q=${encodeURIComponent(value)}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1E293B] bg-[#090D16]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Logo size="sm"/>
        <nav className="hidden md:flex items-center gap-1">
          {primarySports.map(sport => (
            <Link key={sport.id} href={sportHref(sport.id)} className="px-3 py-1.5 text-sm text-[#888] hover:text-white transition-colors rounded-md hover:bg-white/5">{sport.label}</Link>
          ))}
          <div className="relative">
            <button onClick={() => setMoreOpen(!moreOpen)} className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#888] hover:text-white transition-colors rounded-md hover:bg-white/5" aria-expanded={moreOpen}>
              More sports <ChevronDown size={13} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-10 z-50 grid w-72 grid-cols-2 gap-1 rounded-xl border border-[#1E293B] bg-[#131B2E] p-2 shadow-2xl">
                {moreSports.map(sport => <Link key={sport.id} href={sportHref(sport.id)} onClick={() => setMoreOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#00FF87]"><span>{sport.emoji}</span>{sport.label}</Link>)}
              </div>
            )}
          </div>
          <Link href="/standings" className="px-3 py-1.5 text-sm text-[#888] hover:text-white transition-colors rounded-md hover:bg-white/5">Standings</Link>
          <Link href="/news" className="px-3 py-1.5 text-sm text-[#888] hover:text-white transition-colors rounded-md hover:bg-white/5">News</Link>
        </nav>
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <form onSubmit={submitSearch} className="flex items-center gap-2 bg-[#131B2E] border border-[#1E293B] focus-within:border-[#00FF87] rounded-lg px-3 py-1.5">
              <Search size={14} className="text-[#64748B]"/>
              <input name="q" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search teams, leagues..." aria-label="Search teams and leagues" className="bg-transparent text-sm text-white placeholder-[#64748B] outline-none w-40" autoFocus/>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg text-[#888] hover:text-white hover:bg-white/5 transition-colors"><Search size={18}/></button>
          )}
          <div className="relative">
          <button onClick={() => { setNotificationsOpen(!notificationsOpen); setHasUnread(false) }} aria-label="Notifications" aria-expanded={notificationsOpen} title="Notifications" className="p-2 rounded-lg text-[#64748B] hover:text-white hover:bg-[#1E293B] transition-colors relative">
            <Bell size={18}/>
            {hasUnread && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#00FF87] rounded-full"/>}
          </button>
          {notificationsOpen && <div className="absolute right-0 top-11 z-50 w-72 rounded-xl border border-[#1E293B] bg-[#131B2E] p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3"><h2 className="text-sm font-semibold text-white">Notifications</h2><span className="text-[10px] uppercase tracking-wide text-[#64748B]">Matchday</span></div>
            <div className="flex gap-3 py-4"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#00FF87]"/><div><p className="text-xs font-medium text-white">Live scores are ready</p><p className="mt-1 text-[11px] leading-4 text-[#64748B]">Follow goals, match events, and final scores from your dashboard.</p></div></div>
            <Link href="/auth" onClick={() => setNotificationsOpen(false)} className="block border-t border-[#1E293B] pt-3 text-xs font-semibold text-[#00FF87] hover:text-white">Enable match alerts</Link>
          </div>}
          </div>
          <Link href="/auth" className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#00FF87] hover:bg-[#7CFFB9] text-[#090D16] text-sm font-semibold rounded-lg transition-colors">
            <User size={14}/>Sign up
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-[#888] hover:text-white hover:bg-white/5">
            {menuOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-[#1E293B] bg-[#090D16]">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {SPORT_CATALOG.map(sport => <Link key={sport.id} href={sportHref(sport.id)} className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#888] hover:text-white transition-colors rounded-md hover:bg-white/5" onClick={() => setMenuOpen(false)}><span>{sport.emoji}</span>{sport.label}</Link>)}
            <Link href="/standings" className="px-3 py-2.5 text-sm text-[#888] hover:text-white transition-colors rounded-md hover:bg-white/5" onClick={() => setMenuOpen(false)}>Standings</Link>
            <Link href="/news" className="px-3 py-2.5 text-sm text-[#888] hover:text-white transition-colors rounded-md hover:bg-white/5" onClick={() => setMenuOpen(false)}>News</Link>
            <div className="pt-2 border-t border-[#1A1A1A] mt-1">
              <Link href="/auth" className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#00FF87] text-[#090D16] text-sm font-semibold rounded-lg" onClick={() => setMenuOpen(false)}>
                <User size={14}/>Sign up free
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

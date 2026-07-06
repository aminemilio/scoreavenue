'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Bell, User, Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A1A1A] bg-[#080808]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Logo size="sm"/>
        <nav className="hidden md:flex items-center gap-1">
          {['Football','Basketball','Tennis','Hockey','Baseball','News'].map(s => (
            <Link key={s} href={`/${s.toLowerCase()}`} className="px-3 py-1.5 text-sm text-[#888] hover:text-white transition-colors rounded-md hover:bg-white/5">{s}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-1.5">
              <Search size={14} className="text-[#555]"/>
              <input type="text" placeholder="Search teams, leagues..." className="bg-transparent text-sm text-white placeholder-[#555] outline-none w-40" autoFocus onBlur={() => setSearchOpen(false)}/>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg text-[#888] hover:text-white hover:bg-white/5 transition-colors"><Search size={18}/></button>
          )}
          <button className="p-2 rounded-lg text-[#888] hover:text-white hover:bg-white/5 transition-colors relative">
            <Bell size={18}/>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"/>
          </button>
          <Link href="/auth" className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">
            <User size={14}/>Sign up
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-[#888] hover:text-white hover:bg-white/5">
            {menuOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-[#1A1A1A] bg-[#080808]">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {['Football','Basketball','Tennis','Hockey','Baseball','News'].map(s => (
              <Link key={s} href={`/${s.toLowerCase()}`} className="px-3 py-2.5 text-sm text-[#888] hover:text-white transition-colors rounded-md hover:bg-white/5" onClick={() => setMenuOpen(false)}>{s}</Link>
            ))}
            <div className="pt-2 border-t border-[#1A1A1A] mt-1">
              <Link href="/auth" className="flex items-center justify-center gap-2 px-3 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg" onClick={() => setMenuOpen(false)}>
                <User size={14}/>Sign up free
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

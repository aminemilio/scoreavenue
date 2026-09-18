'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Cookie, X } from 'lucide-react'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(localStorage.getItem('sa_cookie_choice') === null)
  }, [])

  const choose = (value: 'essential' | 'all') => {
    localStorage.setItem('sa_cookie_choice', value)
    setVisible(false)
  }

  if (!visible) return null

  return <div className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-xl border border-[#333] bg-[#151515] p-4 shadow-2xl md:inset-x-auto md:flex md:items-center md:gap-5">
    <div className="flex items-start gap-3"><Cookie size={18} className="mt-0.5 shrink-0 text-red-400" /><div><h2 className="text-sm font-semibold text-white">Your privacy matters</h2><p className="mt-1 text-xs leading-5 text-[#999]">We use essential storage to run ScoreAvenue. Optional analytics help us improve the product. Read our <Link href="/cookies" className="text-red-400 hover:text-red-300">Cookie Policy</Link>.</p></div><button onClick={() => choose('essential')} aria-label="Dismiss cookie notice" className="text-[#777] hover:text-white md:hidden"><X size={16} /></button></div>
    <div className="mt-3 flex shrink-0 gap-2 md:mt-0"><button onClick={() => choose('essential')} className="flex-1 rounded-lg border border-[#333] px-3 py-2 text-xs font-medium text-[#bbb] hover:border-[#555] hover:text-white md:flex-none">Essential only</button><button onClick={() => choose('all')} className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 md:flex-none">Accept all</button></div>
  </div>
}
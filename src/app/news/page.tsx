import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'

const stories = [
  { tag: 'Match centre', title: 'Arsenal hold their nerve against Manchester City', text: 'Follow the scoreline, key events, and live match statistics in one view.', time: 'Updated 2 min ago', href: '/match/1001' },
  { tag: 'Competition', title: 'The table race is already taking shape', text: 'Compare form, points, and goal difference across the leading leagues.', time: 'Today', href: '/standings' },
  { tag: 'Product', title: 'Build your personal matchday', text: 'Choose a country profile, follow the sports you care about, and prepare alerts for the games you cannot miss.', time: 'ScoreAvenue guide', href: '/about' },
]

export const metadata = { title: 'News and Matchday Notes', description: 'ScoreAvenue matchday updates, product notes, and sports context.' }

export default function NewsPage() {
  return <div className="max-w-5xl mx-auto px-4 py-10">
    <p className="text-[11px] uppercase tracking-[0.18em] text-red-400">ScoreAvenue newsroom</p>
    <h1 className="mt-3 text-3xl font-bold text-white">News and matchday notes</h1>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#777]">Useful context around the scores, competitions, and product features that make following sport easier.</p>
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {stories.map(story => <article key={story.title} className="flex flex-col border border-[#1A1A1A] rounded-2xl bg-[#0F0F0F] p-5">
        <span className="text-[10px] uppercase tracking-wide text-red-400">{story.tag}</span>
        <h2 className="mt-4 text-lg font-semibold leading-6 text-white">{story.title}</h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-[#777]">{story.text}</p>
        <div className="mt-5 flex items-center justify-between text-[11px] text-[#555]"><span className="inline-flex items-center gap-1"><Clock3 size={12} />{story.time}</span><Link href={story.href} className="inline-flex items-center gap-1 text-[#aaa] hover:text-white">Read <ArrowRight size={12} /></Link></div>
      </article>)}
    </div>
  </div>
}
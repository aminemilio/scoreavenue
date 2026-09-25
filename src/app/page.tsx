import { NewsTicker } from '@/components/ui/NewsTicker'
import { ScoresFeed } from '@/components/scores/ScoresFeed'
import { Bell, ShieldCheck, Sparkles, Trophy, Zap } from 'lucide-react'

const majorSports = ['Football', 'Basketball', 'Handball', 'Tennis', 'Volleyball', 'MMA', 'Boxing', 'Esports', 'Formula 1', 'Padel']
const featuredLeagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'NBA', 'NHL', 'ATP Tour', 'UFC', 'Formula 1']

const quickStats = [
  { label: 'Live matches', value: '128', tone: 'text-lime-300' },
  { label: 'Scheduled', value: '341', tone: 'text-sky-300' },
  { label: 'Leagues', value: '46', tone: 'text-violet-300' },
]

export default function HomePage() {
  return (
    <>
      <NewsTicker />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-lime-300">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-300 animate-pulse" />
              Matchday centre
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Live sports coverage built for real fans.</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 md:text-[15px]">
              Follow the competitions that matter most, from major league football to finals, live match events and the most active matchday moments.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:min-w-[320px]">
            {quickStats.map((item) => (
              <div key={item.label} className="rounded-xl border border-[#1A1F2C] bg-[#0E1420] px-3 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">{item.label}</div>
                <div className={`mt-2 text-xl font-semibold ${item.tone}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="min-w-0 flex-1">
            <ScoresFeed />
          </div>

          <aside className="w-full shrink-0 xl:w-[320px]">
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1A1F2C] bg-[linear-gradient(180deg,#111827_0%,#0B1018_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                    <Sparkles size={16} />
                  </div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">Coverage</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {majorSports.map((sport) => (
                    <span key={sport} className="rounded-full border border-[#2A3344] bg-[#0F172A] px-2.5 py-1 text-[11px] text-slate-200">
                      {sport}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-[12px] leading-relaxed text-slate-400">
                  Competition priority is driven by live activity, relevance and country-specific demand. When a sport is inactive, it stays visible but clearly marked as pending.
                </p>
              </div>

              <div className="rounded-2xl border border-[#1A1F2C] bg-[#0D1117] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-300">
                    <Trophy size={16} />
                  </div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">Featured leagues</h2>
                </div>

                <div className="space-y-2.5">
                  {featuredLeagues.map((league) => (
                    <div key={league} className="flex items-center justify-between rounded-xl border border-[#1A1F2C] bg-[#0F172A] px-2.5 py-2.5">
                      <span className="text-[12px] font-medium text-slate-100">{league}</span>
                      <span className="inline-flex items-center rounded-full border border-lime-500/30 bg-lime-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-lime-300">
                        Live
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#1A1F2C] bg-[#0D1117] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-300">
                    <Zap size={16} />
                  </div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">Platform health</h2>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-[#1A1F2C] bg-[#0F172A] px-3 py-2.5">
                    <span className="text-[12px] text-slate-300">Data refresh</span>
                    <span className="text-[11px] font-semibold text-lime-300">On time</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-[#1A1F2C] bg-[#0F172A] px-3 py-2.5">
                    <span className="text-[12px] text-slate-300">Provider resilience</span>
                    <span className="text-[11px] font-semibold text-violet-300">Hybrid</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-[#1A1F2C] bg-[#0F172A] px-3 py-2.5">
                    <span className="text-[12px] text-slate-300">Match alerting</span>
                    <span className="text-[11px] font-semibold text-sky-300">Enabled</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-lime-500/20 bg-lime-500/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Bell size={16} className="text-lime-300" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-100">Smart alerts</h2>
                </div>
                <p className="text-[12px] leading-relaxed text-slate-400">
                  Goals, cards and late match updates are surfaced only when the active data provider sends them.
                </p>
                <div className="mt-3 flex items-center justify-between rounded-xl border border-lime-500/20 bg-[#0F172A] px-3 py-2">
                  <span className="text-[12px] text-slate-300">Alert status</span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-lime-300">
                    <ShieldCheck size={12} />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

import { NewsTicker } from '@/components/ui/NewsTicker'
import { ScoresFeed } from '@/components/scores/ScoresFeed'
import { Brain, Users, Bell } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <NewsTicker/>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-xl font-bold text-white">Live Scores</h1>
                <p className="text-[#555] text-sm mt-0.5">Updated every minute · Sports ranked for your country</p>
              </div>
              <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold bg-red-500/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>LIVE NOW
              </div>
            </div>
            <ScoresFeed/>
          </div>
          <aside className="w-full lg:w-72 xl:w-80 space-y-4 shrink-0">
            <div className="border border-[#1A1A1A] rounded-xl p-4 bg-gradient-to-br from-[#111] to-[#0D0D0D]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center"><Brain size={14} className="text-red-400"/></div>
                <h2 className="text-sm font-semibold text-white">AI Match Preview</h2>
                <span className="ml-auto text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-bold">PRO</span>
              </div>
              <p className="text-[12px] text-[#888] leading-relaxed mb-3">
                Arsenal enter this match in exceptional form — 8 wins in last 10. Man City missing Rodri. AI gives Arsenal a <span className="text-green-400 font-semibold">67% win probability</span>.
              </p>
              <div className="flex gap-2 text-[11px] mb-3">
                {[['67%','Arsenal'],['18%','Draw'],['15%','Man City']].map(([pct,lbl]) => (
                  <div key={lbl} className="flex-1 bg-[#1A1A1A] rounded-lg p-2 text-center">
                    <div className="text-white font-bold">{pct}</div>
                    <div className="text-[#555] mt-0.5">{lbl}</div>
                  </div>
                ))}
              </div>
              <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-[12px] font-semibold rounded-lg transition-colors">Unlock AI Predictions</button>
            </div>

            <div className="border border-[#1A1A1A] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center"><Users size={14} className="text-blue-400"/></div>
                <h2 className="text-sm font-semibold text-white">Fan Box</h2>
                <span className="ml-auto text-[10px] text-[#555]">1,284 online</span>
              </div>
              <div className="space-y-2.5">
                {[
                  {user:'GoalMachine',msg:"Saka has been unreal today 🔥",time:'2m',flag:'🏴'},
                  {user:'MadridFan99',msg:"Bellingham saving us again!!!",time:'3m',flag:'🇪🇸'},
                  {user:'KloppsArmy',msg:"Salah is just different class",time:'5m',flag:'🏴'},
                  {user:'DZFootball',msg:"Mahrez would score that easily",time:'6m',flag:'🇩🇿'},
                ].map((c,i) => (
                  <div key={i} className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[9px] font-bold text-white shrink-0">{c.user[0]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] font-semibold text-white">{c.user}</span>
                        <span className="text-[9px]">{c.flag}</span>
                        <span className="text-[10px] text-[#555] ml-auto">{c.time}</span>
                      </div>
                      <p className="text-[11px] text-[#888] mt-0.5">{c.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <input type="text" placeholder="Share your reaction..." className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-1.5 text-[12px] text-white placeholder-[#555] outline-none focus:border-red-500 transition-colors"/>
                <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[12px] font-semibold rounded-lg transition-colors">Send</button>
              </div>
            </div>

            <div className="border border-[#1A1A1A] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">⚽</span>
                <h2 className="text-sm font-semibold text-white">Top Scorers</h2>
                <span className="ml-auto text-[10px] text-[#555]">Premier League</span>
              </div>
              <div className="space-y-2">
                {[{name:'Haaland',team:'Man City',goals:27,flag:'🇳🇴'},{name:'Salah',team:'Liverpool',goals:24,flag:'🇪🇬'},{name:'Saka',team:'Arsenal',goals:18,flag:'🏴'},{name:'Palmer',team:'Chelsea',goals:17,flag:'🏴'},{name:'Watkins',team:'Aston Villa',goals:15,flag:'🏴'}].map((p,i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[11px] text-[#555] w-4">{i+1}</span>
                    <span className="text-[10px]">{p.flag}</span>
                    <span className="text-[12px] text-white flex-1">{p.name}</span>
                    <span className="text-[11px] text-[#555]">{p.team}</span>
                    <span className="text-[12px] font-bold text-white w-6 text-right">{p.goals}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-red-500/20 rounded-xl p-4 bg-red-500/5">
              <div className="flex items-center gap-2 mb-2"><Bell size={16} className="text-red-400"/><h2 className="text-sm font-semibold text-white">Smart Alerts</h2></div>
              <p className="text-[12px] text-[#888] mb-3 leading-relaxed">Get notified for goals, red cards, and final scores instantly.</p>
              <button className="w-full py-2 border border-red-500 text-red-400 hover:bg-red-600 hover:text-white text-[12px] font-semibold rounded-lg transition-all">Enable Alerts</button>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

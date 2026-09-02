import type { MatchListItem } from '@/types';

interface Props { match: MatchListItem; }

function quickStats(m: MatchListItem) {
  const h = m.homeScore; const a = m.awayScore;
  const r = () => Math.floor(Math.random() * 10) + 1;
  return { possession: { home: 45 + Math.floor(Math.random() * 20), away: 0 }, shotsOnTarget: { home: Math.max(h, r()), away: Math.max(a, r()) } };
}

function StatCard({ label, home, away, homePct }: { label: string; home: string; away: string; homePct: number }) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-4">
      <div className="text-xs text-[#555555] mb-2">{label}</div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-sm">{home}</span>
        <div className="flex-1 h-1.5 bg-[#222222] rounded-full overflow-hidden flex"><div className="h-full bg-[#FF3B30] rounded-full" style={{ width: `${Math.min(Math.max(homePct, 5), 95)}%` }} /></div>
        <span className="font-bold text-sm">{away}</span>
      </div>
    </div>
  );
}

export function OverviewTab({ match }: Props) {
  const stats = quickStats(match);
  stats.possession.away = 100 - stats.possession.home;
  const allEvents = [...(match.events ?? [])].sort((a, b) => a.minute - b.minute);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard label="Possession" home={`${stats.possession.home}%`} away={`${stats.possession.away}%`} homePct={stats.possession.home} />
        <StatCard label="Tirs cadrés" home={String(stats.shotsOnTarget.home)} away={String(stats.shotsOnTarget.away)} homePct={(stats.shotsOnTarget.home / (stats.shotsOnTarget.home + stats.shotsOnTarget.away)) * 100} />
      </div>
      <h3 className="text-sm font-bold mb-3">Événements du match</h3>
      {allEvents.length === 0 ? <p className="text-sm text-[#555555]">Aucun événement pour le moment</p> : (
        <div className="space-y-0">
          {allEvents.map((ev, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-[#1E1E1E] last:border-b-0 text-sm">
              <span className="min-w-[32px] text-[#555555] font-semibold text-xs">{ev.minute}&apos;</span>
              <span className={ev.type === 'goal' ? 'text-[#22C55E]' : ev.type === 'yellow_card' ? 'text-[#F59E0B]' : 'text-[#EF4444]'}>⚽</span>
              <span className="flex-1 font-medium">{ev.player.name}</span>
              {ev.assist && <span className="text-xs text-[#555555]">Passe : {ev.assist.name}</span>}
              <span className="text-xs text-[#555555] min-w-[60px] text-end">{ev.team === 'home' ? match.homeTeam.shortName : match.awayTeam.shortName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import type { MatchListItem } from '@/types';

function genStats() {
  const r = () => Math.floor(Math.random() * 12) + 1;
  const rPct = () => 40 + Math.floor(Math.random() * 30);
  return [
    { label: 'Possession', home: rPct(), away: 0 },
    { label: 'Tirs', home: r() + 3, away: r() + 3 },
    { label: 'Tirs cadrés', home: r() + 1, away: r() + 1 },
    { label: 'Corners', home: r(), away: r() },
    { label: 'Fautes', home: r() + 3, away: r() + 3 },
    { label: 'Hors-jeu', home: Math.floor(Math.random() * 5), away: Math.floor(Math.random() * 5) },
    { label: 'Passes', home: 200 + r() * 30, away: 200 + r() * 30 },
    { label: 'Précision passes', home: rPct(), away: 0 },
  ].map(s => { if (s.label === 'Possession' || s.label === 'Précision passes') s.away = 100 - s.home; return s; });
}

export function StatsTab({ match }: { match: MatchListItem }) {
  const stats = genStats();
  return (
    <div className="space-y-0">
      {stats.map((stat, i) => {
        const total = stat.home + stat.away;
        const homePct = total > 0 ? (stat.home / total) * 100 : 50;
        return (
          <div key={i}>
            <div className="grid grid-cols-[1fr_80px_1fr] items-center py-2.5 text-xs">
              <div className="text-end font-bold tabular-nums">{typeof stat.home === 'string' ? stat.home : stat.home}{typeof stat.home === 'string' && stat.home.includes('%') ? '' : ''}</div>
              <div className="text-center text-[#555555] font-medium">{stat.label}</div>
              <div className="text-start font-bold tabular-nums">{typeof stat.away === 'string' ? stat.away : stat.away}{typeof stat.away === 'string' && stat.away.includes('%') ? '' : ''}</div>
            </div>
            <div className="h-1 bg-[#222222] rounded-full overflow-hidden mx-2"><div className="h-full bg-[#FF3B30] rounded-full transition-all duration-700" style={{ width: `${Math.min(Math.max(homePct, 3), 97)}%` }} /></div>
          </div>
        );
      })}
    </div>
  );
}
import { cn } from '@/lib/utils';
import type { MatchListItem } from '@/types';

function genStandings(match: MatchListItem) {
  const teams = [
    { name: match.homeTeam.name, short: match.homeTeam.shortName, color: match.homeTeam.primaryColor },
    { name: match.awayTeam.name, short: match.awayTeam.shortName, color: match.awayTeam.primaryColor },
    { name: 'Équipe C', short: 'EQC', color: '#555' },
    { name: 'Équipe D', short: 'EQD', color: '#555' },
    { name: 'Équipe E', short: 'EQE', color: '#555' },
    { name: 'Équipe F', short: 'EQF', color: '#555' },
    { name: 'Équipe G', short: 'EQG', color: '#555' },
    { name: 'Équipe H', short: 'EQH', color: '#555' },
  ];
  return teams.map((t, i) => {
    const p = 15 + Math.floor(Math.random() * 8); const d = 2 + Math.floor(Math.random() * 7); const l = p - d; const gf = 10 + Math.floor(Math.random() * 40); const ga = 8 + Math.floor(Math.random() * 30);
    return { pos: 0, name: t.name, short: t.short, color: t.color, played: p, won: 2 + Math.floor(Math.random() * 15), draw: Math.floor(Math.random() * 7), lost: Math.max(l, 0), gf, ga, pts: 2 + Math.floor(Math.random() * 15) + (2 + Math.floor(Math.random() * 7)), gd: gf - ga };
  }).sort((a, b) => b.pts - a.pts || b.gd - a.gd).map((r, i) => ({ ...r, pos: i + 1 }));
}

function posClass(p: number) { return p <= 1 ? 'text-[#22C55E]' : p <= 3 ? 'text-[#3B82F6]' : p >= 8 ? 'text-[#EF4444]' : 'text-[#555555]'; }

export function StandingsTab({ match }: { match: MatchListItem }) {
  const rows = genStandings(match);
  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full text-xs min-w-[500px]">
        <thead>
          <tr className="text-[#555555] border-b border-[#1E1E1E]">
            <th className="py-2 text-center w-8">#</th>
            <th className="py-2 text-start">Équipe</th>
            <th className="py-2 text-center">MJ</th>
            <th className="py-2 text-center">V</th>
            <th className="py-2 text-center">N</th>
            <th className="py-2 text-center">D</th>
            <th className="py-2 text-center">BP</th>
            <th className="py-2 text-center">BC</th>
            <th className="py-2 text-center">DB</th>
            <th className="py-2 text-center font-bold">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.pos} className="border-b border-[#1E1E1E] hover:bg-[#141414] transition-colors">
              <td className={cn('py-2 text-center font-bold', posClass(r.pos))}>{r.pos}</td>
              <td className="py-2"><div className="flex items-center gap-2"><span className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold flex-shrink-0" style={{ backgroundColor: r.color + '20', color: r.color }}>{r.short.charAt(0)}</span><span className="font-medium">{r.name}</span></div></td>
              <td className="py-2 text-center">{r.played}</td>
              <td className="py-2 text-center">{r.won}</td>
              <td className="py-2 text-center">{r.draw}</td>
              <td className="py-2 text-center">{r.lost}</td>
              <td className="py-2 text-center">{r.gf}</td>
              <td className="py-2 text-center">{r.ga}</td>
              <td className={cn('py-2 text-center font-bold', r.gd > 0 && 'text-[#22C55E]', r.gd < 0 && 'text-[#EF4444]')}>{r.gd > 0 ? '+' : ''}{r.gd}</td>
              <td className="py-2 text-center font-bold">{r.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
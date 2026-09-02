import type { MatchListItem } from '@/types';

function genH2H(match: MatchListItem) {
  const results = [];
  for (let i = 0; i < 6; i++) {
    const hs = Math.floor(Math.random() * 4); const as = Math.floor(Math.random() * 3); const d = new Date(); d.setMonth(d.getMonth() - (i * 2 + 1));
    const swap = Math.random() > 0.5;
    results.push({ date: d.toLocaleDateString('fr', { month: 'short', year: 'numeric' }), home: swap ? match.awayTeam.shortName : match.homeTeam.shortName, away: swap ? match.homeTeam.shortName : match.awayTeam.shortName, homeScore: swap ? as : hs, awayScore: swap ? hs : as, comp: match.leagueName });
  }
  return results;
}

export function H2HTab({ match }: { match: MatchListItem }) {
  const results = genH2H(match);
  return (
    <div>
      <h3 className="text-sm font-bold mb-4">Dernières confrontations</h3>
      <div className="space-y-2">
        {results.map((r, i) => (
          <div key={i} className="flex items-center gap-3 bg-[#1A1A1A] rounded-lg p-3 text-sm">
            <div className="text-xs text-[#555555] min-w-[70px]">{r.date}</div>
            <div className="flex-1 flex items-center gap-2">
              <span className="flex-1 font-medium text-start">{r.home}</span>
              <span className="font-bold min-w-[50px] text-center tabular-nums">{r.homeScore} - {r.awayScore}</span>
              <span className="flex-1 font-medium text-end">{r.away}</span>
            </div>
            <div className="text-xs text-[#555555] min-w-[80px] text-end">{r.comp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
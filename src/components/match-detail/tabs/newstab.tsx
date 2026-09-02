import type { MatchListItem } from '@/types';

function genNews(match: MatchListItem) {
  return [
    { title: `${match.homeTeam.name} : les dernières infos avant ce face-à-face`, time: '2h', source: 'ScoreAvenue' },
    { title: `${match.awayTeam.name} en grande forme, analyse des performances récentes`, time: '4h', source: 'ScoreAvenue' },
    { title: 'Blessures et suspensions : le bilan complet pour ce match', time: '6h', source: 'ScoreAvenue' },
    { title: `Historique des confrontations entre ${match.homeTeam.shortName} et ${match.awayTeam.shortName}`, time: '1j', source: 'ScoreAvenue' },
    { title: 'Les statistiques clés à retenir avant cette rencontre', time: '1j', source: 'ScoreAvenue' },
  ];
}

export function NewsTab({ match }: { match: MatchListItem }) {
  const articles = genNews(match);
  return (
    <div className="space-y-0">
      {articles.map((a, i) => (
        <div key={i} className="flex gap-4 py-4 border-b border-[#1E1E1E] last:border-b-0 cursor-pointer group hover:opacity-80">
          <div className="w-20 h-14 bg-[#1A1A1A] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#555555]"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0 2-2H8a2 2 0 0 0-2-2V4a2 2 0 0 0 2 2Z" /><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0 2-2H8a2 2 0 0 0-2-2V4Z" /><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0 2 2Z" /></svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold leading-snug group-hover:text-[#FF3B30] transition-colors line-clamp-2">{a.title}</h4>
            <p className="text-xs text-[#555555] mt-1">{a.source} · {a.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
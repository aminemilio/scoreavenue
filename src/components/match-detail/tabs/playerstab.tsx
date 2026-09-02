import { cn } from '@/lib/utils';
import type { MatchListItem } from '@/types';

function genPlayers(match: MatchListItem) {
  const NAMES = ['Martin', 'Dubois', 'Petrov', 'Santos', 'Kim', 'Müller', 'Fernandez', 'Toure', 'Okafor', 'Larsson', 'Bertrand', 'Costa', 'Yilmaz', 'Ali', 'Jensen'];
  return NAMES.slice(0, 11).map((name, i) => {
    const rating = parseFloat((5.5 + Math.random() * 4).toFixed(1));
    return { team: i < 6 ? match.homeTeam.shortName : match.awayTeam.shortName, name, position: POS[i] ?? 'MC', rating, ratingClass: rating >= 7.5 ? 'high' : rating >= 6.5 ? 'mid' : 'low' as const, goals: Math.floor(Math.random() * 8), assists: Math.floor(Math.random() * 5), minutes: 30 + Math.floor(Math.random() * 60) };
  });
}

export function PlayersTab({ match }: { match: MatchListItem }) {
  const players = genPlayers(match);
  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full text-xs min-w-[480px]">
        <thead>
          <tr className="text-[#555555] border-b border-[#1E1E1E]">
            <th className="py-2 text-start">Joueur</th>
            <th className="py-2 text-start">Équipe</th>
            <th className="py-2 text-center">Poste</th>
            <th className="py-2 text-center">Note</th>
            <th className="py-2 text-center">Buts</th>
            <th className="py-2 text-center">Passes D.</th>
            <th className="py-2 text-center">Minutes</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, i) => (
            <tr key={i} className="border-b border-[#1E1E1E] hover:bg-[#141414] transition-colors">
              <td className="py-2 font-semibold">{p.name}</td>
              <td className="py-2 text-[#555555]">{p.team}</td>
              <td className="py-2 text-center text-[#555555]">{p.position}</td>
              <td className="py-2 text-center"><span className={cn('px-1.5 py-0.5 rounded text-xs font-bold', p.ratingClass === 'high' ? 'bg-[#22C55E]/15 text-[#22C55E]' : p.ratingClass === 'mid' ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'bg-[#EF4444]/15 text-[#EF4444]')}>{p.rating}</span></td>
              <td className="py-2 text-center">{p.goals}</td>
              <td className="py-2 text-center">{p.assists}</td>
              <td className="py-2 text-center">{p.minutes}&apos;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
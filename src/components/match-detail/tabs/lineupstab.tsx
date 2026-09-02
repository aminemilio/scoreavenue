import { cn } from '@/lib/utils';
import type { MatchListItem } from '@/types';

const NAMES = ['Martin', 'Dubois', 'Petrov', 'Santos', 'Kim', 'Müller', 'Fernandez', 'Toure', 'Okafor', 'Larsson', 'Bertrand'];
const POS = ['GK', 'DC', 'DC', 'DC', 'DM', 'MC', 'MG', 'MO', 'AG', 'AG', 'BU'];
const FORMATIONS = ['4-3-3', '4-2-3-1', '3-5-2', '4-4-2'];

function makePlayers() { return Array.from({ length: 11 }, (_, i) => { const rating = parseFloat((5.5 + Math.random() * 4).toFixed(1)); return { number: i + 1, name: NAMES[i % NAMES.length], rating, ratingClass: rating >= 7.5 ? 'high' : rating >= 6.5 ? 'mid' : 'low' as const }; }; }

function TeamLineup({ teamName, formation, players }: { teamName: string; formation: string; players: ReturnType<typeof makePlayers>; }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3"><span className="text-sm font-bold">{teamName}</span><span className="text-xs text-[#555555] bg-[#1A1A1A] px-2 py-0.5 rounded-full">{formation}</span></div>
      <div className="space-y-0.5">
        {players.map(p => (
          <div key={p.number} className="flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-[#1A1A1A] transition-colors">
            <span className="w-6 h-6 bg-[#222222] rounded flex items-center justify-center text-[11px] font-bold text-[#555555] flex-shrink-0">{p.number}</span>
            <span className="flex-1 text-sm font-medium">{p.name}</span>
            <span className={cn('text-xs font-bold px-1.5 py-0.5 rounded', p.ratingClass === 'high' ? 'bg-[#22C55E]/15 text-[#22C55E]' : p.ratingClass === 'mid' ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'bg-[#EF4444]/15 text-[#EF4444]')}>{p.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LineupsTab({ match }: { match: MatchListItem } {
  return (
    <div className="grid grid-cols-2 gap-6">
      <TeamLineup teamName={match.homeTeam.name} formation={FORMATIONS[Math.floor(Math.random() * FORMATIONS.length)]} players={makePlayers()} />
      <TeamLineup teamName={match.awayTeam.name} formation={FORMATIONS[Math.floor(Math.random() * FORMATIONS.length)]} players={makePlayers()} />
    </div>
  );
}
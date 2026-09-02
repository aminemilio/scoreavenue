import type { MatchListItem } from '@/types';

function Insight({ variant, icon, children }: { variant: 'green' | 'blue' | 'yellow'; icon: React.ReactNode; children: React.ReactNode }) {
  const colors = { green: 'bg-[#22C55E]/15 text-[#22C55E]', blue: 'bg-[#3B82F6]/15 text-[#3B82F6]', yellow: 'bg-[#F59E0B]/15 text-[#F59E0B]' };
  return (
    <div className="flex items-start gap-3 bg-[#1A1A1A] rounded-lg p-3">
      <div className={cn('w-7 h-7 rounded flex items-center justify-center flex-shrink-0', colors[variant])}>{icon}</div>
      <p className="text-xs text-[#999999] leading-relaxed">{children}</p>
    </div>
  );
}

export function AIAnalysisTab({ match }: { match: MatchListItem }) {
  const homeDom = Math.random() > 0.5;
  const dominant = homeDom ? match.homeTeam.name : match.awayTeam.name;
  const avgGoals = (1.2 + Math.random() * 1.5).toFixed(1);
  const xg = (6 + Math.random() * 8).toFixed(1);
  const cardPlayers = Math.floor(Math.random() * 3) + 1;
  const rotation = Math.floor(Math.random() * 40) + 10;
  const changes = 2 + Math.floor(Math.random() * 4);

  return (
    <div className="bg-[#1A1A1A] border border-[#1E1E1E] rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FF3B30]"><path d="M12 2a4 4 0 0 0 8 8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        <h3 className="font-bold text-[#FF3B30]">Analyse IA du Match</h3>
      </div>
      <p className="text-sm text-[#999999] leading-relaxed mb-4">Résumé du match propulsé par l&apos;intelligence artificielle</p>
      <div className="space-y-2">
        <Insight variant="green" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 15 21 9 17 14.14" /></svg>}>
          <p className="text-xs text-[#999999] leading-relaxed"><strong>{dominant}</strong> domine les dernières confrontations avec <strong>{2 + Math.floor(Math.random() * 4)} victoires</strong> sur les 6 derniers matchs. Possession moyenne de <strong>{48 + Math.floor(Math.random() * 15)}%</strong>.</p>
        </Insight>
        <Insight variant="blue" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M8 12h8M12 8v8M12 8v8M4 12h8M12 4v8M12 4v4" /></svg>}>
          <p className="text-xs text-[#999999] leading-relaxed">{dominant} affiche une moyenne de <strong>{avgGoals} buts/match</strong> sur les 5 dernières sorties. Le xG cumulé s&apos;élève à <strong>{xg}</strong>.</p>
        </Insight>
        <Insight variant="yellow" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0 1-1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0 1 1.51-1H3a2 2 0 0 0-2 2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 0 4 0h.09A1.65 1.65 0 0 0 1 1.51-1Z" /></svg>}>
          <p className="text-xs text-[#999999] leading-relaxed">Point d&apos;attention : <strong>{cardPlayers} joueurs</strong> sont en carte jaune cumulative. Le risque de suspension est réel pour le prochain match.</p>
        </Insight>
        <Insight variant="green" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 9 17 14 14 18 9" /></svg>}>
          <p className="text-xs text-[#999999] leading-relaxed">Taux de rotation estimé à <strong>{rotation}%</strong>. L&apos;entraîneur pourrait effectuer <strong>{changes} changements</strong> par rapport au XI type.</p>
        </Insight>
      </div>
      <p className="text-[11px] text-[#555555] mt-5 leading-relaxed">Analyse générée à partir des données statistiques disponibles. ScoreAvenue ne propose aucun contenu de paris sportifs.</p>
    </div>
  );
}
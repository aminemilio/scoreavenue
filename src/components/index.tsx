export function MatchDetailPanel({ match }: { match: any }) {
  return (
    <div className="p-4">
      <div className="bg-[#141414] rounded-xl p-6 border border-[#1E1E1E]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-[#F0F0F0]">{match.homeTeam.name}</span>
          <span className="text-2xl font-bold text-[#F0F0F0] tabular-nums">{match.homeScore} - {match.awayScore}</span>
          <span className="text-lg font-bold text-[#F0F0F0]">{match.awayTeam.name}</span>
        </div>
        <div className="text-center text-sm text-[#555555] mt-8">
          Match detail coming soon — AI analysis, stats, lineups, H2H
        </div>
      </div>
    </div>
  );
}
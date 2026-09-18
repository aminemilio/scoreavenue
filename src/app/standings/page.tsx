import { getStandings } from '@/lib/live-scores'
import { MOCK_STANDINGS } from '@/lib/mock-data'

export default async function StandingsPage() {
  const liveStandings = await getStandings()
  const leagues = Object.keys(liveStandings).length ? Object.entries(liveStandings) : Object.entries(MOCK_STANDINGS)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#666]">Competition</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Standings</h1>
      </div>

      <div className="space-y-6">
        {leagues.map(([leagueName, standings]) => (
          <div key={leagueName} className="border border-[#1A1A1A] rounded-2xl overflow-hidden bg-[#0F0F0F]">
            <div className="px-4 py-3 border-b border-[#1A1A1A] bg-[#111]">
              <h2 className="text-sm font-semibold text-white">{leagueName}</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#888] min-w-[600px]">
                <thead className="bg-[#101010] text-[11px] uppercase tracking-wide text-[#666]">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Team</th>
                    <th className="px-4 py-3">P</th>
                    <th className="px-4 py-3">W</th>
                    <th className="px-4 py-3">D</th>
                    <th className="px-4 py-3">L</th>
                    <th className="px-4 py-3">GF</th>
                    <th className="px-4 py-3">GA</th>
                    <th className="px-4 py-3">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((item, idx) => (
                    <tr key={item.team} className="border-t border-[#1A1A1A]">
                      <td className="px-4 py-3 text-white">{idx + 1}</td>
                      <td className="px-4 py-3 text-white">{item.team}</td>
                      <td className="px-4 py-3">{item.played}</td>
                      <td className="px-4 py-3">{item.wins}</td>
                      <td className="px-4 py-3">{item.draws}</td>
                      <td className="px-4 py-3">{item.losses}</td>
                      <td className="px-4 py-3">{item.goalsFor}</td>
                      <td className="px-4 py-3">{item.goalsAgainst}</td>
                      <td className="px-4 py-3 font-semibold text-white">{item.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client';

import { useAppStore } from '@/stores/useappstore';
import { cn, isLive, formatTime } from '@/lib/utils';
import { TeamLogo } from '@/components/match/TeamLogo';
import { Modal, ModalHeader, ModalBody } from '@/components/ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { LiveDot } from '@/components/ui';
import { OverviewTab } from './tabs/OverviewTab';
import { StatsTab } from './tabs/StatsTab';
import { LineupsTab } from './tabs/LineupsTab';
import { StandingsTab } from './tabs/StandingsTab';
import { H2HTab } from './tabs/H2HTab';
import { PlayersTab } from './tabs/PlayersTab';
import { NewsTab } from './tabs/NewsTab';
import { AIAnalysisTab } from './tabs/AIAnalysisTab';
import type { MatchListItem } from '@/types';

interface Props { matchId: number; }

export function MatchDetailPanel({ matchId }: Props) {
  const selectedMatchId = useAppStore(s => s.selectedMatchId);
  const setMatchId = useAppStore(s => s.setSelectedMatchId);
  const allMatches = useAppStore(s => s.allMatches);
  const locale = useAppStore(s => s.locale);
  const open = selectedMatchId !== null;
  const match = selectedMatchId !== null ? allMatches.find(m => m.id === selectedMatchId) : null;

  if (!match) return null;
  const live = isLive(match.status);
  const homeEvents = (match.events ?? []).filter(e => e.team === 'home');
  const awayEvents = (match.events ?? []).filter(e => e.team === 'away');

  return (
    <Modal open={open} onClose={() => setMatchId(null)} variant="panel" side="right">
      <ModalHeader onClose={() => setMatchId(null)}>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-[#555555]">{match.leagueName}</div>
          <div className={cn('text-sm font-bold flex items-center gap-2', live ? 'text-[#FF3B30]' : match.status === 'ft' ? 'text-[#555555]' : 'text-[#3B82F6]')}>
            {live && <LiveDot size="sm" />}{live ? `${match.minute}'` : match.status === 'ft' ? 'Fin' : formatTime(match.startTime, 'fr')}
          </div>
        </div>
      </ModalHeader>
      <div className="px-5 py-8 text-center bg-gradient-to-b from-[#1A1A1A] to-[#141414]">
        <div className="flex items-center justify-center gap-8">
          <div className="text-center min-w-[120px]">
            <TeamLogo src={match.homeTeam.logo} name={match.homeTeam.name} shortName={match.homeTeam.shortName} color={match.homeTeam.primaryColor} size="xl" className="mx-auto mb-3" />
            <div className="font-bold text-base">{match.homeTeam.name}</div>
            <div className="text-xs text-[#555555]">{match.homeTeam.shortName}</div>
          </div>
          <div className="text-center min-w-[100px]">
            {match.status !== 'ns' ? (
              <>
                <div className="text-4xl font-black tracking-tighter tabular-nums leading-none">{match.homeScore}<span className="text-2xl text-[#555555] font-normal mx-1">-</span>{match.awayScore}</div>
                {live && <div className="mt-2 text-sm font-semibold text-[#FF3B30] flex items-center justify-center gap-1.5"><LiveDot size="sm" />{match.minute}&apos;</div>}
              </>
            ) : (
              <div className="text-2xl font-bold text-[#555555]">VS<div className="text-sm font-medium text-[#3B82F6] mt-2">{formatTime(match.startTime, 'fr')}</div></div>
          </div>
          <div className="text-center min-w-[120px]">
            <TeamLogo src={match.awayTeam.logo} name={match.awayTeam.name} shortName={match.awayTeam.shortName} color={match.awayTeam.primaryColor} size="xl" className="mx-auto mb-3" />
            <div className="font-bold text-base">{match.awayTeam.name}</div>
            <div className="text-xs text-[#555555]">{match.awayTeam.shortName}</div>
          </div>
        </div>
        {(homeEvents.length > 0 || awayEvents.length > 0) && (
          <div className="flex justify-center gap-10 mt-6">
            <div className="flex flex-col gap-1 text-xs text-start">
              {homeEvents.map((ev, i) => (
                <div key={i} className="flex items-center gap-2 text-[#999999]">
                  <span className="min-w-[28px] text-[#555555] font-semibold text-xs">{ev.minute}&apos;</span>
                  <span className="text-[#22C55E]">⚽</span>
                  <span>{ev.player.name}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1 text-xs text-end">
              {awayEvents.map((ev, i) => (
                <div key={i} className="flex items-center gap-2 text-[#999999] justify-end">
                  <span className="min-w-[28px] text-[#555555] font-semibold text-xs">{ev.minute}&apos;</span>
                  <span className="text-[#22C55E]">⚽</span>
                  <span>{ev.player.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Tabs defaultValue="overview">
        <TabsList scrollable>
          {['overview', 'statistics', 'lineups', 'standings', 'h2h', 'players', 'news', 'ai_analysis'].map(tab => (
            <TabsTrigger value={tab}>{{
              overview: 'Aperçu', statistics: 'Statistiques', lineups: 'Compositions', standings: 'Classement', h2h: 'H2H', players: 'Joueurs', news: 'Actualités', ai_analysis: 'Analyse IA',
            }[tab]}</TabsTrigger>
          </TabsList>
        <ModalBody className="p-5">
          <TabsContent value="overview"><OverviewTab match={match} /></TabsContent>
          <TabsContent value="statistics"><StatsTab match={match} /></TabsContent>
          <TabsContent value="lineups"><LineupsTab match={match} /></TabsContent>
          <TabsContent value="standings"><StandingsTab match={match} /></TabsContent>
          <TabsContent value="h2h"><H2HTab match={match} /></TabsContent>
          <TabsContent value="players"><PlayersTab match={match} /></TabsContent>
          <TabsContent value="news"><NewsTab match={match} /></TabsContent>
          <TabsContent value="ai_analysis"><AIAnalysisTab match={match} /></TabsContent>
        </ModalBody>
      </Tabs>
    </Modal>
  );
}
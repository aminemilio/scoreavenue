import type { MatchListItem, MatchStatus } from '@/types';
import { mapApiStatus } from './utils';

const API_BASE_URL = 'https://v3.football.api-sports.io';
const API_KEY = process.env.API_FOOTBALL_KEY;

interface CacheEntry<T> { data: T; timestamp: number; }
const cache = new Map<string, CacheEntry<unknown>>();

class ApiFootballClient {
  private async request<T>(endpoint: string, params: Record<string, string> = {}, options: { cacheTtl?: number; retries?: number } = {}): Promise<T> {
    const { cacheTtl = 60_000, retries = 2 } = options;
    const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cacheTtl) return cached.data as T;
    if (!API_KEY) throw new Error('API_FOOTBALL_KEY not set');

    let lastError: Error | null = null;
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const url = new URL(`${API_BASE_URL}${endpoint}`);
        Object.entries(params).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); });
        const res = await fetch(url.toString(), { method: 'GET', headers: { 'x-apisports-key': API_KEY }, next: { revalidate: 30 } });
        if (res.status === 429) { await new Promise(r => setTimeout(r, 3000 * Math.pow(2, attempt))); continue; }
        if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
        const json = await res.json() as T;
        cache.set(cacheKey, { data: json, timestamp: Date.now() });
        return json;
      } catch (e) { lastError = e as Error; if (attempt < retries - 1) await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt))); }
    }
    throw lastError;
  }

  async getLiveMatches() { return this.request<any>('/fixtures', { live: 'all' }, { cacheTtl: 15_000 }); }
  async getMatchesByDate(date: string) { return this.request<any>('/fixtures', { date }, { cacheTtl: 300_000 }); }
  async getMatchesByLeague(leagueId: number, season: number, date?: string) {
    const p: Record<string, string> = { league: String(leagueId), season: String(season) };
    if (date) p.date = date;
    return this.request<any>('/fixtures', p, { cacheTtl: 300_000 });
  }
  async getMatchStatistics(fixtureId: number) { return this.request<any>('/fixtures/statistics', { fixture: String(fixtureId) }, { cacheTtl: 120_000 }); }
  async getStandings(leagueId: number, season: number) { return this.request<any>('/standings', { league: String(leagueId), season: String(season) }, { cacheTtl: 600_000 }); }
  async getHeadToHead(t1: number, t2: number) { return this.request<any>('/fixtures/headtohead', { h2h: `${t1}-${t2}` }, { cacheTtl: 600_000 }); }
}

export const apiFootball = new ApiFootballClient();
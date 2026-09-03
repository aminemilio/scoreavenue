const API_HOST = process.env.NEXT_PUBLIC_API_FOOTBALL_HOST || 'api-football-v1.p.rapidapi.com';
const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';

export function isApiConfigured(): boolean {
  return !!API_KEY;
}

async function fetchApi(endpoint: string) {
  const res = await fetch(`https://${API_HOST}/v3${endpoint}`, {
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getLiveFixtures() {
  if (!isApiConfigured()) return [];
  try {
    const data = await fetchApi('/fixtures?live=all');
    return data.response || [];
  } catch {
    return [];
  }
}

export async function getFixturesByDate(date: string) {
  if (!isApiConfigured()) return [];
  try {
    const data = await fetchApi(`/fixtures?date=${date}`);
    return data.response || [];
  } catch {
    return [];
  }
}

export async function getLeagueStandings(leagueId: number, season: number) {
  if (!isApiConfigured()) return [];
  try {
    const data = await fetchApi(`/standings?league=${leagueId}&season=${season}`);
    return data.response || [];
  } catch {
    return [];
  }
}

export async function getFixtureDetails(fixtureId: number) {
  if (!isApiConfigured()) return null;
  try {
    const data = await fetchApi(`/fixtures?id=${fixtureId}`);
    return data.response?.[0] || null;
  } catch {
    return null;
  }
}

export async function getHeadToHead(h2h: string) {
  if (!isApiConfigured()) return [];
  try {
    const data = await fetchApi(`/fixtures/headtohead?h2h=${h2h}&last=10`);
    return data.response || [];
  } catch {
    return [];
  }
}

export const apiFootball = { getLiveFixtures, getFixturesByDate, getLeagueStandings, getFixtureDetails, getHeadToHead };
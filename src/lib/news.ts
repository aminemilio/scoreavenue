export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source: string;
  category: 'breaking' | 'transfer' | 'match' | 'general';
  sport: string;
  timestamp: string;
  imageUrl?: string;
  url?: string;
}

const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';
const API_HOST = 'api-football-v1.p.rapidapi.com';

export async function fetchRealNews(): Promise<NewsItem[]> {
  if (!API_KEY) return getFallbackNews();

  try {
    const res = await fetch(`https://${API_HOST}/v3/news`, {
      headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST },
      next: { revalidate: 300 },
    });
    if (!res.ok) return getFallbackNews();
    const data = await res.json();
    return (data.response || []).slice(0, 20).map((item: any, i: number) => ({
      id: i + 1,
      title: item.title || '',
      summary: item.description || item.title || '',
      source: item.source || 'API-Football',
      category: 'general' as const,
      sport: 'football',
      timestamp: item.date || new Date().toISOString(),
      imageUrl: item.image,
      url: item.url,
    }));
  } catch {
    return getFallbackNews();
  }
}

export function getFallbackNews(): NewsItem[] {
  return [
    { id: 1, title: 'Real Madrid wins El Clásico 3-1', summary: 'Vinicius Jr scores brace as Madrid dominate at Bernabéu', source: 'ESPN', category: 'breaking', sport: 'football', timestamp: new Date(Date.now() - 1800000).toISOString() },
    { id: 2, title: 'PSG close to signing new midfielder', summary: 'Sources confirm advanced negotiations for €80m transfer', source: 'L\'Équipe', category: 'transfer', sport: 'football', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, title: 'NBA: Lakers edge Celtics in overtime', summary: 'LeBron James scores 38 points in dramatic comeback', source: 'NBA.com', category: 'match', sport: 'basketball', timestamp: new Date(Date.now() - 5400000).toISOString() },
    { id: 4, title: 'Alcaraz advances to Wimbledon semifinals', summary: 'Spanish star defeats Medvedev in straight sets', source: 'BBC Sport', category: 'match', sport: 'tennis', timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: 5, title: 'Champions League draw announced', summary: 'Group stage matchups revealed for 2026/27 season', source: 'UEFA', category: 'breaking', sport: 'football', timestamp: new Date(Date.now() - 900000).toISOString() },
    { id: 6, title: 'Verstappen takes pole at Monaco GP', summary: 'Red Bull dominates qualifying session', source: 'F1', category: 'match', sport: 'formula1', timestamp: new Date(Date.now() - 10800000).toISOString() },
    { id: 7, title: 'Morocco qualifies for World Cup 2026', summary: 'Atlas Lions secure automatic qualification', source: 'CAF', category: 'breaking', sport: 'football', timestamp: new Date(Date.now() - 600000).toISOString() },
    { id: 8, title: 'Saudi Pro League: Al Hilal wins derby', summary: 'Mitrovic hat-trick seals emphatic victory', source: 'SPL', category: 'match', sport: 'football', timestamp: new Date(Date.now() - 12600000).toISOString() },
  ];
}

export function getLatestNews(): NewsItem[] {
  return getFallbackNews();
}
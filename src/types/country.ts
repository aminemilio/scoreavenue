import type { SportSlug, Locale } from './sport';

export interface FeaturedLeague {
  id: number;
  name: string;
  nameAr: string;
  sport: SportSlug;
}

export interface CountrySportConfig {
  code: string;
  name: Record<Locale, string>;
  flag: string;
  sportPriority: SportSlug[];
  featuredLeagues: FeaturedLeague[];
  timezone?: string[];
}

export type CountryCode = string;
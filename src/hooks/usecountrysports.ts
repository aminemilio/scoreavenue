'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getCountryConfig, getSportPriority, getFeaturedLeagues, detectCountryFromTimezone, getAllCountryCodes } from '@/lib/country-sports';
import type { SportSlug } from '@/types';

const STORAGE_KEY = 'sa_country';

export function useCountrySports() {
  const [countryCode, setCountryCode] = useState<string>('DEFAULT');
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) { setCountryCode(saved); setIsDetecting(false); return; }
    } catch {}
    const detected = detectCountryFromTimezone();
    setCountryCode(detected);
    setIsDetecting(false);
    try { localStorage.setItem(STORAGE_KEY, detected); } catch {}
  }, []);

  const setCountry = useCallback((code: string) => {
    setCountryCode(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch {}
  }, []);

  const countryConfig = useMemo(() => getCountryConfig(countryCode), [countryCode]);
  const sportPriority = useMemo(() => getSportPriority(countryCode), [countryCode]);
  const featuredLeagues = useMemo(() => getFeaturedLeagues(countryCode), [countryCode]);
  const primarySport = useMemo(() => sportPriority[0] ?? 'football' as SportSlug, [sportPriority]);
  const allCountries = useMemo(() => getAllCountryCodes().map(c => getCountryConfig(c)).sort((a, b) => a.name.localeCompare(b.name)), []);

  return { countryCode, countryConfig, sportPriority, featuredLeagues, primarySport, setCountry, allCountries, isDetecting };
}
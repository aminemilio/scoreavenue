'use client';

import { useState, useEffect, useCallback } from 'react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

const STORAGE_KEY = 'sa_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as unknown[];
        const validIds = parsed.filter((v): v is number => typeof v === 'number' && isFinite(v));
        setFavorites(new Set(validIds));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites])); } catch {}
    if (isSupabaseConfigured() && supabase) {
      supabase.from('favorites').upsert([...favorites].map(id => ({ match_id: id })), { onConflict: 'match_id' }).then(() => {}).catch(() => {});
    }
  }, [favorites]);

  const isFavorite = useCallback((id: number) => favorites.has(id), [favorites]);
  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }, []);
  const clearAll = useCallback(() => setFavorites(new Set()), []);

  return { favorites, count: favorites.size, isFavorite, toggleFavorite, clearAll };
}
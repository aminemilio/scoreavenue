'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/stores/useappstore';

export function ThemeEffect() {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null;
}
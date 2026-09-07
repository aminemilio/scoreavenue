'use client';

import { getLatestNews, type NewsItem } from '@/lib/news';
import { useState, useEffect } from 'react';

export function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const news = getLatestNews();
  const breakingNews = news.filter(n => n.category === 'breaking');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [breakingNews.length]);

  if (breakingNews.length === 0) return null;

  const current = breakingNews[currentIndex % breakingNews.length];

  return (
    <div className="border-b px-4 py-1.5 flex items-center gap-2" style={{ backgroundColor: 'color-mix(in srgb, var(--live) 8%, var(--surface))', borderColor: 'color-mix(in srgb, var(--live) 25%, transparent)' }}>
      <span className="bg-[#FF3B30] text-white text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0 animate-pulse">
        BREAKING
      </span>
      <div className="overflow-hidden flex-1">
        <p className="text-xs text-[var(--text)] font-medium whitespace-nowrap truncate">
          {current.title}
        </p>
      </div>
      <span className="text-[10px] text-[var(--text-3)] flex-shrink-0">{current.source}</span>
    </div>
  );
}
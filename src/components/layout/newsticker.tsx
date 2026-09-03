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
    <div className="bg-[#1A0A0A] border-b border-[#FF3B30]/20 px-4 py-1.5 flex items-center gap-2">
      <span className="bg-[#FF3B30] text-white text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0 animate-pulse">
        BREAKING
      </span>
      <div className="overflow-hidden flex-1">
        <p className="text-xs text-[#F0F0F0] font-medium whitespace-nowrap truncate">
          {current.title}
        </p>
      </div>
      <span className="text-[10px] text-[#555555] flex-shrink-0">{current.source}</span>
    </div>
  );
}
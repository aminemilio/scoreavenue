'use client';

import { getLatestNews } from '@/lib/news';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NewsPage() {
  const t = useTranslations();
  const news = getLatestNews();

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[#1A1A1A]">
        <h1 className="text-base font-bold text-[#F0F0F0]">📰 News</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {news.map(item => (
          <article key={item.id} className="px-4 py-4 border-b border-[#1A1A1A] hover:bg-[#0F0F0F] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              {item.category === 'breaking' && (
                <span className="bg-[#FF3B30] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">BREAKING</span>
              )}
              {item.category === 'transfer' && (
                <span className="bg-[#F59E0B] text-black text-[9px] font-bold px-1.5 py-0.5 rounded">TRANSFER</span>
              )}
              {item.category === 'match' && (
                <span className="bg-[#22C55E] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">MATCH</span>
              )}
              <span className="text-[10px] text-[#555555]">{item.source}</span>
              <span className="text-[10px] text-[#333333] ml-auto">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <h2 className="text-sm font-semibold text-[#F0F0F0] mb-1">{item.title}</h2>
            <p className="text-xs text-[#999999]">{item.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
'use client';

import { useAppStore } from '@/stores/useappstore';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/usetranslation';

export function DateSelector() {
  const t = useTranslations('date');
  const activeDate = useAppStore(s => s.activeDate);
  const setActiveDate = useAppStore(s => s.setActiveDate);

  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i - 2);
    const day = d.getDate();
    const key = i === 2 ? 'today' : i === 1 ? 'yesterday' : i === 3 ? 'tomorrow' : d.toISOString().split('T')[0]!;
    const label = i === 2 ? t('today') : i === 1 ? t('yesterday') : i === 3 ? t('tomorrow') : d.toLocaleDateString('fr', { weekday: 'short', day: 'numeric', month: 'short' });
    return { key, label, day };
  });

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-[#1E1E1E] overflow-x-auto">
      {dates.map(d => (
        <button
          key={d.key}
          onClick={() => setActiveDate(d.key)}
          className={cn(
            'flex flex-col items-center min-w-[60px] px-3 py-2 rounded-lg text-center transition-all border border-transparent',
            activeDate === d.key ? 'bg-[#FF3B30] text-white' : 'text-[#999999] hover:bg-[#1A1A1A]'
          )}
        >
          <span className="text-sm font-bold leading-tight">{d.day}</span>
          <span className="text-[10px] opacity-80 leading-tight mt-0.5">{d.label}</span>
        </button>
      ))}
    </div>
  );
}
'use client';

import { cn } from '@/lib/utils';

interface Props { isFavorite: boolean; onToggle: () => void; size?: 'sm' | 'md'; className?: string; }

export function FavoriteButton({ isFavorite, onToggle, size = 'sm', className }: Props) {
  const px = size === 'sm' ? 14 : 18;
  return (
    <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className={cn('flex items-center justify-center transition-all duration-150 outline-none rounded', isFavorite ? 'text-[#FF3B30]' : 'text-[#555555] hover:text-[#FF3B30] hover:scale-110', 'focus-visible:ring-2 focus-visible:ring-[#FF3B30]/50', className)} aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'} aria-pressed={isFavorite}>
      <svg width={px} height={px} viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    </button>
  );
}
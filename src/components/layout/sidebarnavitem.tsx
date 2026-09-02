'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props { href: string; icon: React.ReactNode; label: string; badge?: string; badgeVariant?: 'default' | 'live'; onClick?: () => void; }

export function SidebarNavItem({ href, icon, label, badge, badgeVariant = 'default', onClick }: Props) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + '/');
  return (
    <Link href={href} onClick={onClick} className={cn('relative flex items-center gap-3 px-5 py-2 text-sm font-medium transition-colors w-full outline-none', active ? 'text-[#FF3B30] bg-[#FF3B30]/[0.08]' : 'text-[#999999] hover:text-[#F0F0F0] hover:bg-[#1A1A1A]', 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3B30]/50')} aria-current={active ? 'page' : undefined}>
      {active && <span className="absolute start-0 top-1 bottom-1 w-[3px] bg-[#FF3B30] rounded-s-full" />}
      <span className="w-5 flex items-center justify-center flex-shrink-0">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {badge && <span className={cn('text-[11px] font-bold px-1.5 rounded-full leading-[18px] min-w-[20px] text-center flex-shrink-0', badgeVariant === 'live' ? 'bg-[#FF3B30] text-white' : 'bg-[#222222] text-[#555555]')}>{badge}</span>}
    </Link>
  );
}
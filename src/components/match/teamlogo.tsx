import { cn } from '@/lib/utils';

interface Props { src?: string; name: string; shortName: string; color: string; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; className?: string; }

const sizeMap = { xs: 'w-5 h-5 text-[9px]', sm: 'w-6 h-6 text-[10px]', md: 'w-8 h-8 text-xs', lg: 'w-10 h-10 text-sm', xl: 'w-14 h-14 text-lg' };

export function TeamLogo({ src, name, shortName, color, size = 'sm', className }: Props) {
  const initial = shortName.charAt(0).toUpperCase();
  if (src) {
    return <img src={src} alt={`${name} logo`} className={cn('rounded-md object-contain flex-shrink-0', sizeMap[size], className)} loading="lazy" width={size === 'xl' ? 56 : size === 'lg' ? 40 : size === 'md' ? 32 : size === 'sm' ? 24 : 20} height={size === 'xl' ? 56 : size === 'lg' ? 40 : size === 'md' ? 32 : size === 'sm' ? 24 : 20} />;
  }
  return (
    <span className={cn('rounded-md flex items-center justify-center font-bold flex-shrink-0', sizeMap[size], className)} style={{ backgroundColor: color + '20', color }} aria-hidden="true">{initial}</span>
  );
}
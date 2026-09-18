import { clsx, type ClassValue } from 'clsx'
import { MatchStatus } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function isLive(status: MatchStatus): boolean {
  return ['1H', '2H', 'HT', 'ET', 'P', 'LIVE'].includes(status.short)
}

export function isFinished(status: MatchStatus): boolean {
  return ['FT', 'AET', 'PEN'].includes(status.short)
}

export function isUpcoming(status: MatchStatus): boolean {
  return status.short === 'NS'
}

export function formatMatchTime(date: string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function isLive(status: string): boolean {
  return status === 'live' || status === 'ht' || status === 'et' || status === 'pen';
}

export function isFinished(status: string): boolean {
  return status === 'ft' || status === 'aet' || status === 'p';
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
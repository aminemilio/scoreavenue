interface Props {
  className?: string;
  variant?: 'auto' | 'light';
}

export function Logo({ className = 'text-lg', variant = 'auto' }: Props) {
  const textColor = variant === 'light' ? '#FFFFFF' : 'var(--text)';
  return (
    <span className={`inline-flex items-baseline font-display font-bold tracking-tight select-none ${className}`}>
      <span style={{ color: textColor }}>Score</span>
      <span style={{ color: 'var(--brand-accent)' }}>Avenue</span>
      <span
        className="w-[0.28em] h-[0.28em] rounded-full bg-[#FF3B30] ml-[0.15em] mb-[0.05em] animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}
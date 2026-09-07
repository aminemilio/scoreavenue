import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <span className="text-6xl font-bold text-[var(--surface-2)] mb-2">404</span>
      <h1 className="text-lg font-semibold text-[var(--text)] mb-2">Page not found</h1>
      <p className="text-sm text-[var(--text-3)] mb-6">The page doesn&apos;t exist.</p>
      <Link href="/fr" className="px-4 py-2 bg-[var(--brand-accent)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-colors">
        Go home
      </Link>
    </div>
  );
}
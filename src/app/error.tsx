'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="1.5" className="mb-4">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
      </svg>
      <h2 className="text-lg font-semibold text-[#F0F0F0] mb-2">Something went wrong</h2>
      <p className="text-sm text-[#555555] mb-6">{error.message || 'An unexpected error occurred.'}</p>
      <button onClick={reset} className="px-4 py-2 bg-[#FF3B30] text-white text-sm font-medium rounded-lg hover:bg-[#CC2200] transition-colors">
        Try again
      </button>
    </div>
  );
}
'use client';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-[#080808] text-[#F0F0F0]">
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <span className="text-5xl font-bold text-[#FF3B30] mb-4">!</span>
          <h2 className="text-xl font-bold mb-2">Application Error</h2>
          <p className="text-sm text-[#555555] mb-6">Please refresh the page.</p>
          <button onClick={reset} className="px-5 py-2.5 bg-[#FF3B30] text-white text-sm font-medium rounded-lg hover:bg-[#CC2200] transition-colors">
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}
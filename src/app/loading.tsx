export default function Loading() {
  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="h-14 border-b animate-pulse" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }} />
      <div className="flex-1 p-4 space-y-4">
        <div className="h-10 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--surface-2)' }} />
        <div className="h-48 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--surface-2)' }} />
        <div className="h-48 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--surface-2)' }} />
      </div>
    </div>
  );
}
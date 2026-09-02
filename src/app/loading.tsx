export default function Loading() {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-14 bg-[#0C0C0C] border-b border-[#1A1A1A] animate-pulse" />
      <div className="flex-1 p-4 space-y-4">
        <div className="h-10 bg-[#1A1A1A] rounded-lg animate-pulse" />
        <div className="h-48 bg-[#1A1A1A] rounded-lg animate-pulse" />
        <div className="h-48 bg-[#1A1A1A] rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
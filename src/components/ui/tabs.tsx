'use client';

import { createContext, useContext, useState, type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const TabsContext = createContext<{ activeTab: string; setActiveTab: (id: string) => void } | null>(null);
function useTabs() { const c = useContext(TabsContext); if (!c) throw new Error('Tabs must be within <Tabs>'); return c; }

interface TabsProps { defaultValue: string; value?: string; onValueChange?: (v: string) => void; children: ReactNode; className?: string; }
export function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const activeTab = value ?? internal;
  const setActiveTab = (id: string) => { if (!value) setInternal(id); onValueChange?.(id); };
  return <TabsContext.Provider value={{ activeTab, setActiveTab }}><div className={className}>{children}</div></TabsContext.Provider>;
}

export function TabsList({ scrollable = true, className, children }: { scrollable?: boolean; className?: string; children: ReactNode }) {
  return <div role="tablist" className={cn('flex border-b border-[#1E1E1E]', scrollable && 'overflow-x-auto scrollbar-none', className)}>{children}</div>;
}

interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> { value: string; }
export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabs();
  return (
    <button role="tab" aria-selected={activeTab === value} tabIndex={activeTab === value ? 0 : -1} onClick={() => setActiveTab(value)}
      className={cn('px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]/50 focus-visible:ring-inset', activeTab === value ? 'text-[#FF3B30] border-[#FF3B30]' : 'text-[#555555] border-transparent hover:text-[#999999] hover:border-[#282828]', className)} {...props}>
      {children}
    </button>
  );
}

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> { value: string; }
export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const { activeTab } = useTabs();
  if (activeTab !== value) return null;
  return <div role="tabpanel" tabIndex={0} className={cn('animate-[fade-in_200ms_ease-out]', className)} {...props}>{children}</div>;
}
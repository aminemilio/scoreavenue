'use client';

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ToastType = 'goal' | 'card' | 'info' | 'success' | 'warning' | 'error';
interface Toast { id: number; type: ToastType; title: string; description?: string; duration?: number; }

const ToastContext = createContext<{ addToast: (t: Omit<Toast, 'id'>) => void; removeToast: (id: number) => void } | null>(null);
export function useToast() { const c = useContext(ToastContext); if (!c) throw new Error('useToast must be within ToastProvider'); return c; }

let idCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const removeToast = useCallback((id: number) => { setToasts(p => p.filter(t => t.id !== id)); const t = timersRef.current.get(id); if (t) { clearTimeout(t); timersRef.current.delete(id); } }, []);
  const addToast = useCallback((toast: Omit<Toast, 'id'>) => { const id = ++idCounter; setToasts(p => [{ ...toast, id }, ...p].slice(0, 10)); const timer = setTimeout(() => removeToast(id), toast.duration ?? 4000); timersRef.current.set(id, timer); }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[500] flex flex-col-reverse gap-2 max-w-[400px]" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} className="flex items-start gap-3 bg-[#1A1A1A] border border-[#282828] border-l-4 rounded-xl p-3 shadow-2xl animate-[slide-in-up_200ms_ease-out]" role="alert">
            <span className={cn('text-lg flex-shrink-0 mt-0.5', t.type === 'goal' && 'text-[#22C55E]', t.type === 'card' && 'text-[#F59E0B]', t.type === 'info' && 'text-[#3B82F6]', t.type === 'success' && 'text-[#22C55E]', t.type === 'warning' && 'text-[#F59E0B]', t.type === 'error' && 'text-[#EF4444]')}>⚽</span>
            <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-[#F0F0F0] leading-tight">{t.title}</p>{t.description && <p className="text-xs text-[#999999] mt-0.5">{t.description}</p>}</div>
            <button onClick={() => removeToast(t.id)} className="flex-shrink-0 p-1 text-[#555555] hover:text-[#F0F0F0]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
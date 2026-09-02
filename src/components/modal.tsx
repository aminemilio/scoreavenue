'use client';

import { useEffect, type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps { open: boolean; onClose: () => void; variant?: 'panel' | 'dialog'; side?: 'right' | 'left'; title?: string; children: ReactNode; className?: string; }

export function Modal({ open, onClose, variant = 'panel', side = 'right', title, children, className }: ModalProps) {
  useEffect(() => { if (open) document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, [open]);
  useEffect(() => { if (!open) return; function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') { e.preventDefault(); onClose(); } } document.addEventListener('keydown', handleKey); return () => document.removeEventListener('keydown', handleKey); }; }, [open, onClose]);
  if (!open) return null;
  const isPanel = variant === 'panel';
  return (
    <>
      <div className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-label={title} className={cn('fixed z-[400] flex flex-col bg-[#141414]', isPanel && ['top-0 bottom-0 w-[680px] max-w-full shadow-[-8px_0_32px_rgba(0,0,0,0.5)]', side === 'right' ? 'right-0' : 'left-0', side === 'left' && 'shadow-[8px_0_32px_rgba(0,0,0,0.5)', 'animate-[slide-in-right_200ms_ease-out]'], !isPanel && ['top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', 'w-[560px] max-w-[95vw] max-h-[80vh]', 'rounded-2xl border border-[#1E1E1E] shadow-2xl', 'animate-[modal-in_200ms_ease-out]'], className)}>
        {children}
      </div>
    </>
  );
}

export function ModalHeader({ onClose, className, children, ...props }: { onClose: () => void; className?: string; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center gap-3 px-5 py-4 border-b border-[#1E1E1E]', className)} {...props}>
      {children}
      <button onClick={onClose} className="ml-auto p-2 text-[#999999] hover:text-[#F0F0F0] hover:bg-[#1A1A1A] rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]/50" aria-label="Fermer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>
    </div>
  );
}

export function ModalBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1 overflow-y-auto p-5', className)} {...props}>{children}</div>;
}
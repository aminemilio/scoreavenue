'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-[var(--brand-accent)] text-white hover:opacity-90 active:opacity-80',
  secondary: 'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--surface-2)] active:bg-[var(--surface-2)]/80',
  ghost: 'bg-transparent text-[var(--text-2)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]',
  danger: 'bg-[#EF4444] text-white hover:bg-[#EF4444]/90',
  outline: 'bg-transparent border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-2)] hover:border-[var(--border)]',
};

const sizes: Record<Size, string> = {
  xs: 'h-6 px-2 text-[11px] rounded',
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-9 px-4 text-sm rounded-lg',
  lg: 'h-11 px-6 text-base rounded-lg',
  icon: 'h-9 w-9 p-0 rounded-lg justify-center',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, fullWidth = false, disabled, className, children, ...props }, ref) => {
    const isDisabled = disabled || isLoading;
    return (
      <button ref={ref} disabled={isDisabled} className={cn('inline-flex items-center justify-center font-medium transition-all duration-150 outline-none select-none cursor-pointer', isDisabled && 'pointer-events-none opacity-50', !isDisabled && 'cursor-pointer', variants[variant], sizes[size], fullWidth && 'w-full', className)} {...props}>
        {isLoading ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : leftIcon}
        {children}
        {rightIcon && !isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
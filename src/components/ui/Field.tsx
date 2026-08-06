import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/utils/cn';

const CONTROL =
  'w-full min-h-11 rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink transition-colors placeholder:text-muted/70 focus:border-accent focus:bg-card focus:outline-none aria-[invalid=true]:border-red-500';

export function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(CONTROL, className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <select className={cn(CONTROL, className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea className={cn(CONTROL, 'min-h-32 resize-y', className)} {...props} />
  );
}

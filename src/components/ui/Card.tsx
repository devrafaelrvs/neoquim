import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-card shadow-sm transition-all duration-200',
        className,
      )}
    >
      {children}
    </div>
  );
}

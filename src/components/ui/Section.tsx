import type { ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { cn } from '@/utils/cn';

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-14 md:py-20', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionTitle({
  children,
  className,
  icon,
}: {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <h2
      className={cn(
        'flex items-center gap-3 text-2xl font-bold text-brand md:text-3xl',
        className,
      )}
    >
      {icon}
      {children}
    </h2>
  );
}

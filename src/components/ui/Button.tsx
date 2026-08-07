import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/utils/cn';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-deep',
  accent: 'bg-accent text-white hover:brightness-95',
  outline:
    'border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm',
  ghost: 'text-brand hover:bg-brand/5',
};

const SIZES: Record<Size, string> = {
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
};

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ComponentProps<'button'>, keyof CommonProps>;

type ButtonLinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps>;

type ButtonAnchorProps = CommonProps & Omit<ComponentProps<'a'>, keyof CommonProps>;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

/**
 * Mesmo visual do `Button`, mas em `<a>` nativo — para href que não é rota de
 * página do App Router (download, route handler, link externo), onde o `Link`
 * tentaria uma navegação de cliente que não existe.
 */
export function ButtonAnchor({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonAnchorProps) {
  return (
    <a
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}

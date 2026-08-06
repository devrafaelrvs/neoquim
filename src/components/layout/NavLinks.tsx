'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MAIN_NAV } from '@/constants/navigation.constants';
import { cn } from '@/utils/cn';

/** Navegação horizontal do desktop, com destaque da rota ativa. */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {MAIN_NAV.map((item) => {
        const ativo =
          item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={ativo ? 'page' : undefined}
            className={cn(
              'flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-white transition-colors',
              ativo ? 'bg-white/15' : 'hover:bg-white/10',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

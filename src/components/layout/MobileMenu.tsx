'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CloseIcon, MenuIcon } from '@/components/ui/Icons';
import { HEADER_CTA, MAIN_NAV } from '@/constants/navigation.constants';
import { cn } from '@/utils/cn';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fecha ao navegar.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Trava o scroll do body enquanto o menu está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        className="flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
      >
        {open ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {open ? (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-brand-deep px-4 pt-4 pb-10"
        >
          <nav className="flex flex-col gap-1">
            {MAIN_NAV.map((item) => {
              const ativo =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex min-h-12 items-center rounded-lg px-4 text-base font-medium text-white transition-colors',
                    ativo ? 'bg-white/15' : 'hover:bg-white/10',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href={HEADER_CTA.href}
              className="mt-3 flex min-h-12 items-center justify-center rounded-lg bg-accent px-4 text-base font-semibold text-white"
            >
              {HEADER_CTA.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

import Link from 'next/link';

import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { NavLinks } from '@/components/layout/NavLinks';
import { Container } from '@/components/ui/Container';
import { HEADER_CTA } from '@/constants/navigation.constants';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-brand to-brand-light shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <div className="flex items-center gap-2">
            <NavLinks />

            <Link
              href={HEADER_CTA.href}
              className="hidden min-h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-white transition-all duration-200 hover:brightness-95 md:inline-flex"
            >
              {HEADER_CTA.label}
            </Link>

            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}

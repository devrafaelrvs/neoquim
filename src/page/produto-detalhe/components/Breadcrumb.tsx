import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { ROUTES } from '@/constants/routes.constants';

export function Breadcrumb({ atual }: { atual: string }) {
  return (
    <nav aria-label="Trilha de navegação" className="border-b border-line bg-card">
      <Container>
        <ol className="flex flex-wrap items-center gap-2 py-4 text-xs text-muted">
          <li>
            <Link href={ROUTES.home} className="hover:text-brand">
              Home
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li>
            <Link href={ROUTES.produtos} className="hover:text-brand">
              Produtos
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li aria-current="page" className="font-medium text-ink">
            {atual}
          </li>
        </ol>
      </Container>
    </nav>
  );
}

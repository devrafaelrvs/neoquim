import type { ReactNode } from 'react';

import { Container } from '@/components/ui/Container';

/** Hero em gradiente usado no topo das páginas internas. */
export function PageHero({
  titulo,
  subtitulo,
  children,
}: {
  titulo: string;
  subtitulo?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-linear-to-r from-brand to-brand-light">
      <Container>
        <div className="flex max-w-3xl flex-col gap-4 py-12 md:py-16">
          {children}
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {titulo}
          </h1>
          {subtitulo ? (
            <p className="text-sm leading-relaxed text-white/85 md:text-base">
              {subtitulo}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ArrowRightIcon, CheckIcon } from '@/components/ui/Icons';
import { ROUTES } from '@/constants/routes.constants';
import { HOME_HERO } from '@/page/home/constants/home.constants';

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={HOME_HERO.imagem}
        alt={HOME_HERO.imagemAlt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Overlay: sem ele o texto branco não atinge contraste sobre a foto. */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand/90 to-brand-light/80" />

      <Container>
        <div className="flex max-w-3xl flex-col gap-5 py-20 md:py-32">
          <p className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
            {HOME_HERO.eyebrow}
          </p>

          <h1 className="text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
            {HOME_HERO.titulo}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            {HOME_HERO.subtitulo}
          </p>

          <ul className="flex max-w-2xl flex-col gap-3">
            {HOME_HERO.destaques.map((destaque) => (
              <li key={destaque.titulo} className="flex gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-white/85 md:text-base">
                  <strong className="font-semibold text-white">
                    {destaque.titulo}:
                  </strong>{' '}
                  {destaque.texto}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ROUTES.produtos} variant="accent" size="lg">
              {HOME_HERO.ctaPrimario}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>

            <ButtonLink href={ROUTES.contato} variant="outline" size="lg">
              {HOME_HERO.ctaSecundario}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

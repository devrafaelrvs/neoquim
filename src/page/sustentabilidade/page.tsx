import { PageHero } from '@/components/layout/PageHero';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { Section, SectionTitle } from '@/components/ui/Section';
import { ROUTES } from '@/constants/routes.constants';
import { PilarSection } from '@/page/sustentabilidade/components/PilarSection';
import {
  PILARES,
  SUSTENTABILIDADE_PAGE,
} from '@/page/sustentabilidade/constants/sustentabilidade.constants';

export function SustentabilidadePage() {
  return (
    <>
      <PageHero
        titulo={SUSTENTABILIDADE_PAGE.heroTitulo}
        subtitulo={SUSTENTABILIDADE_PAGE.heroSubtitulo}
      />

      {PILARES.map((pilar, indice) => (
        <PilarSection
          key={pilar.titulo}
          pilar={pilar}
          invertido={indice % 2 === 1}
          fundoClaro={indice % 2 === 1}
        />
      ))}

      <Section className="bg-linear-to-r from-brand to-brand-light text-white">
        <div className="flex flex-col items-start gap-4">
          <SectionTitle className="text-white">
            {SUSTENTABILIDADE_PAGE.ctaTitulo}
          </SectionTitle>
          <p className="max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            {SUSTENTABILIDADE_PAGE.ctaTexto}
          </p>
          <ButtonLink
            href={ROUTES.contato}
            variant="accent"
            size="lg"
            className="mt-2"
          >
            {SUSTENTABILIDADE_PAGE.ctaBotao}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

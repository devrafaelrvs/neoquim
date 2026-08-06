import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { Section, SectionTitle } from '@/components/ui/Section';
import { ROUTES } from '@/constants/routes.constants';
import { QUEM_SOMOS_PARAGRAFOS } from '@/entity/company/constants/company.constants';
import { HOME_HERO, HOME_SECOES } from '@/page/home/constants/home.constants';

export function QuemSomosSection() {
  return (
    <Section>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={HOME_HERO.imagem}
            alt={HOME_HERO.imagemAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <SectionTitle>{HOME_SECOES.quemSomos}</SectionTitle>

          {QUEM_SOMOS_PARAGRAFOS.map((paragrafo) => (
            <p
              key={paragrafo.slice(0, 32)}
              className="text-sm leading-relaxed text-muted md:text-base"
            >
              {paragrafo}
            </p>
          ))}

          <ButtonLink href={ROUTES.sobre} className="mt-2 self-start">
            {HOME_SECOES.quemSomosCta}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

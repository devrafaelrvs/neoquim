import Image from 'next/image';

import { Section, SectionTitle } from '@/components/ui/Section';
import { QUEM_SOMOS_PARAGRAFOS } from '@/entity/company/constants/company.constants';
import { SOBRE_PAGE } from '@/page/sobre/constants/sobre.constants';

export function QuemSomosSobre() {
  return (
    <Section>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <SectionTitle>{SOBRE_PAGE.quemSomos}</SectionTitle>

          {QUEM_SOMOS_PARAGRAFOS.map((paragrafo) => (
            <p
              key={paragrafo.slice(0, 32)}
              className="text-sm leading-relaxed text-muted md:text-base"
            >
              {paragrafo}
            </p>
          ))}
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:order-last">
          <Image
            src={SOBRE_PAGE.imagemPlanta}
            alt={SOBRE_PAGE.imagemPlantaAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}

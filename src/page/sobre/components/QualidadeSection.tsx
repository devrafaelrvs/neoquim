import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon, ShieldIcon } from '@/components/ui/Icons';
import { Section, SectionTitle } from '@/components/ui/Section';
import { ROUTES } from '@/constants/routes.constants';
import { CERTIFICATION } from '@/entity/company/constants/company.constants';
import { SOBRE_PAGE } from '@/page/sobre/constants/sobre.constants';

export function QualidadeSection() {
  return (
    <Section>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={SOBRE_PAGE.imagemReatores}
            alt={SOBRE_PAGE.imagemReatoresAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <ShieldIcon className="h-8 w-8 text-brand" />
          <SectionTitle>{SOBRE_PAGE.qualidade}</SectionTitle>

          <p className="text-sm leading-relaxed text-muted md:text-base">
            {CERTIFICATION.texto}
          </p>
          <p className="text-sm leading-relaxed text-muted md:text-base">
            {CERTIFICATION.complemento}
          </p>

          <ButtonLink href={ROUTES.contato} className="mt-2 self-start">
            {SOBRE_PAGE.qualidadeCta}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

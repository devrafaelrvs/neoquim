import Image from 'next/image';

import { Section, SectionTitle } from '@/components/ui/Section';
import type { PilarSustentabilidade } from '@/page/sustentabilidade/constants/sustentabilidade.constants';
import { cn } from '@/utils/cn';

/**
 * Um pilar: foto de um lado, texto do outro.
 *
 * `invertido` alterna o lado da imagem a cada bloco no desktop. No mobile a
 * ordem é sempre foto → texto, porque a coluna é única.
 */
export function PilarSection({
  pilar,
  invertido,
  fundoClaro,
}: {
  pilar: PilarSustentabilidade;
  invertido: boolean;
  fundoClaro: boolean;
}) {
  return (
    <Section className={fundoClaro ? 'bg-card' : undefined}>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div
          className={cn(
            'relative aspect-4/3 w-full overflow-hidden rounded-xl',
            invertido && 'lg:order-2',
          )}
        >
          <Image
            src={pilar.imagem}
            alt={pilar.imagemAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <SectionTitle>{pilar.titulo}</SectionTitle>
          <p className="text-sm leading-relaxed text-muted md:text-base">
            {pilar.descricao}
          </p>
        </div>
      </div>
    </Section>
  );
}

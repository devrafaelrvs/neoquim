import Image from 'next/image';

import { Card } from '@/components/ui/Card';
import { BuildingIcon, DropletIcon, FlaskIcon } from '@/components/ui/Icons';
import { Section, SectionTitle } from '@/components/ui/Section';
import { HOME_SECOES, MERCADOS } from '@/page/home/constants/home.constants';

const ICONES = [DropletIcon, FlaskIcon, BuildingIcon];

export function MercadosSection() {
  return (
    <Section className="bg-card">
      <div className="flex flex-col gap-8">
        <SectionTitle icon={<FlaskIcon className="h-6 w-6" />}>
          {HOME_SECOES.mercados}
        </SectionTitle>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MERCADOS.map((mercado, i) => {
            const Icone = ICONES[i % ICONES.length];

            return (
              <li key={mercado.titulo} className="flex">
                <Card className="flex w-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={mercado.imagem}
                      alt={mercado.imagemAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <Icone className="h-5 w-5 text-accent" />
                    <h3 className="text-sm font-bold text-ink">
                      {mercado.titulo}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {mercado.descricao}
                    </p>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

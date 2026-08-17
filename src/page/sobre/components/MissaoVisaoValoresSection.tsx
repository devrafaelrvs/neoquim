import { Card } from '@/components/ui/Card';
import { FlaskIcon, ShieldIcon } from '@/components/ui/Icons';
import { Section, SectionTitle } from '@/components/ui/Section';
import {
  MISSAO_VISAO_VALORES,
  POLITICA_SISTEMA_GESTAO,
} from '@/entity/company/constants/company.constants';
import { SOBRE_PAGE } from '@/page/sobre/constants/sobre.constants';

const { missao, visao, valores } = MISSAO_VISAO_VALORES;

export function MissaoVisaoValoresSection() {
  return (
    <Section className="bg-card">
      <div className="flex flex-col gap-8">
        <SectionTitle icon={<FlaskIcon className="h-6 w-6" />}>
          {SOBRE_PAGE.missaoVisaoValores}
        </SectionTitle>

        <div className="grid gap-5 md:grid-cols-3">
          {[missao, visao].map((bloco) => (
            <Card key={bloco.titulo} className="flex flex-col gap-3 p-6">
              <h3 className="text-lg font-bold text-brand">{bloco.titulo}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {bloco.texto}
              </p>
            </Card>
          ))}

          <Card className="flex flex-col gap-3 p-6">
            <h3 className="text-lg font-bold text-brand">{valores.titulo}</h3>
            <ul className="flex flex-col gap-2">
              {valores.itens.map((valor) => (
                <li
                  key={valor}
                  className="flex items-center gap-3 text-sm text-ink"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {valor}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="flex gap-4 rounded-xl bg-linear-to-r from-brand to-brand-light p-6 text-white md:p-8">
          <ShieldIcon className="mt-1 hidden h-6 w-6 shrink-0 sm:block" />
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">
              {POLITICA_SISTEMA_GESTAO.titulo}
            </h3>
            <p className="text-sm leading-relaxed text-white/85">
              {POLITICA_SISTEMA_GESTAO.texto}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

import { PageHero } from '@/components/layout/PageHero';
import { ExternalLinkIcon, ShieldIcon } from '@/components/ui/Icons';
import { Section } from '@/components/ui/Section';
import { DenunciaForm } from '@/entity/denuncia/components/DenunciaForm';
import { CANAL_DENUNCIAS_PAGE } from '@/page/canal-denuncias/constants/canal-denuncias.constants';

export function CanalDenunciasPage() {
  return (
    <>
      <PageHero
        titulo={CANAL_DENUNCIAS_PAGE.heroTitulo}
        subtitulo={CANAL_DENUNCIAS_PAGE.heroSubtitulo}
      />

      {/* pb extra no mobile: o formulário é o fim da página e não pode
          terminar colado no rodapé. */}
      <Section className="pb-20 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-5">
            {CANAL_DENUNCIAS_PAGE.paragrafos.map((paragrafo) => (
              <p
                key={paragrafo.slice(0, 40)}
                className="text-sm leading-relaxed text-muted md:text-base"
              >
                {paragrafo}
              </p>
            ))}

            <div className="flex flex-col gap-2 rounded-xl border border-line bg-card p-5">
              <p className="text-xs font-bold tracking-widest text-brand uppercase">
                {CANAL_DENUNCIAS_PAGE.importanteRotulo}
              </p>
              <p className="text-xs leading-relaxed text-muted">
                {CANAL_DENUNCIAS_PAGE.importante}
              </p>
            </div>

            <div className="flex gap-3 rounded-xl border border-line bg-card p-5">
              <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <p className="text-sm leading-relaxed text-ink">
                {CANAL_DENUNCIAS_PAGE.anonimato}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="text-sm text-muted">
                {CANAL_DENUNCIAS_PAGE.codigoEticaTexto}
              </p>
              <a
                href={CANAL_DENUNCIAS_PAGE.codigoEticaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent underline underline-offset-4 transition-colors hover:text-brand"
              >
                {CANAL_DENUNCIAS_PAGE.codigoEticaLink}
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <DenunciaForm />
        </div>
      </Section>
    </>
  );
}

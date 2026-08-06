import { PageHero } from '@/components/layout/PageHero';
import { QualidadeSection } from '@/page/sobre/components/QualidadeSection';
import { QuemSomosSobre } from '@/page/sobre/components/QuemSomosSobre';
import { TrajetoriaSection } from '@/page/sobre/components/TrajetoriaSection';
import { SOBRE_PAGE } from '@/page/sobre/constants/sobre.constants';

export function SobrePage() {
  return (
    <>
      <PageHero
        titulo={SOBRE_PAGE.heroTitulo}
        subtitulo={SOBRE_PAGE.heroSubtitulo}
      />
      <QuemSomosSobre />
      <TrajetoriaSection />
      <QualidadeSection />
    </>
  );
}

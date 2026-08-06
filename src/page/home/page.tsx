import { CertificationBanner } from '@/entity/company/components/CertificationBanner';
import { CtaEspecificacaoSection } from '@/page/home/components/CtaEspecificacaoSection';
import { HeroSection } from '@/page/home/components/HeroSection';
import { MercadosSection } from '@/page/home/components/MercadosSection';
import { ProdutosDestaqueSection } from '@/page/home/components/ProdutosDestaqueSection';
import { QuemSomosSection } from '@/page/home/components/QuemSomosSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CertificationBanner />
      <QuemSomosSection />
      <MercadosSection />
      <ProdutosDestaqueSection />
      <CtaEspecificacaoSection />
    </>
  );
}

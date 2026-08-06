import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { ProductGrid } from '@/entity/product/components/ProductGrid';
import { ProductHighlight } from '@/entity/product/components/ProductHighlight';
import {
  getFeaturedProduct,
  getListedProducts,
} from '@/entity/product/services/product.service';
import { PRODUTOS_PAGE } from '@/page/produtos/constants/produtos.constants';

export function ProdutosPage() {
  const destaque = getFeaturedProduct();
  const produtos = getListedProducts();

  return (
    <>
      <PageHero
        titulo={PRODUTOS_PAGE.heroTitulo}
        subtitulo={PRODUTOS_PAGE.heroSubtitulo}
      />

      <Section>
        <div className="flex flex-col gap-10">
          <ProductHighlight product={destaque} />
          <ProductGrid products={produtos} />
        </div>
      </Section>
    </>
  );
}

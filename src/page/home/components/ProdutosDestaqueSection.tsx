import Link from 'next/link';

import { ArrowRightIcon } from '@/components/ui/Icons';
import { Section, SectionTitle } from '@/components/ui/Section';
import { ROUTES } from '@/constants/routes.constants';
import { ProductGrid } from '@/entity/product/components/ProductGrid';
import { getHomeProducts } from '@/entity/product/services/product.service';
import { HOME_SECOES } from '@/page/home/constants/home.constants';

export function ProdutosDestaqueSection() {
  const produtos = getHomeProducts();

  return (
    <Section>
      <div className="flex flex-col gap-8">
        <SectionTitle>{HOME_SECOES.produtos}</SectionTitle>

        <ProductGrid products={produtos} />

        <Link
          href={ROUTES.produtos}
          className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand hover:underline"
        >
          {HOME_SECOES.produtosCta}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

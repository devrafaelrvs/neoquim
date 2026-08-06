import Image from 'next/image';

import { PageHero } from '@/components/layout/PageHero';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon, FlaskIcon } from '@/components/ui/Icons';
import { Section, SectionTitle } from '@/components/ui/Section';
import { ROUTES } from '@/constants/routes.constants';
import { RelatedProducts } from '@/entity/product/components/RelatedProducts';
import { PRODUCT_DOC_NOTE } from '@/entity/product/constants/products.constants';
import type { Product } from '@/entity/product/product.entity';
import { getRelatedProducts } from '@/entity/product/services/product.service';
import { Breadcrumb } from '@/page/produto-detalhe/components/Breadcrumb';
import { PRODUTO_DETALHE } from '@/page/produto-detalhe/constants/produto-detalhe.constants';

export function ProdutoDetalhePage({ product }: { product: Product }) {
  const relacionados = getRelatedProducts(product.slug);

  return (
    <>
      <Breadcrumb atual={product.titulo} />

      <PageHero titulo={product.titulo} subtitulo={product.descricao} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-6">
            <p className="text-sm leading-relaxed text-muted md:text-base">
              {product.detalhe}
            </p>

            <div className="flex flex-col gap-4">
              <SectionTitle
                icon={<FlaskIcon className="h-5 w-5" />}
                className="text-xl md:text-2xl"
              >
                {PRODUTO_DETALHE.linhaTitulo}
              </SectionTitle>

              {product.linha.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {product.linha.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-muted">
                  {PRODUTO_DETALHE.linhaPendente}
                </p>
              )}
            </div>

            <p className="rounded-lg border border-line bg-card p-4 text-xs leading-relaxed text-muted">
              {PRODUCT_DOC_NOTE}
            </p>

            <ButtonLink href={ROUTES.contato} size="lg" className="self-start">
              {PRODUTO_DETALHE.cta}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:sticky lg:top-24 lg:self-start">
            <Image
              src={product.imagem}
              alt={`Produção da Neoquim — ${product.titulo}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-card">
        <RelatedProducts products={relacionados} />
      </Section>
    </>
  );
}

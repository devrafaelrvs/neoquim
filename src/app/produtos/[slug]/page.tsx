import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getAllProductSlugs,
  getProductBySlug,
} from '@/entity/product/services/product.service';
import { ProdutoDetalhePage } from '@/page/produto-detalhe/page';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: 'Produto não encontrado' };

  return {
    title: product.titulo,
    description: product.descricao,
    alternates: { canonical: `/produtos/${product.slug}` },
    openGraph: {
      title: product.titulo,
      description: product.descricao,
      images: [{ url: product.imagem }],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return <ProdutoDetalhePage product={product} />;
}

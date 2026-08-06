import type { Metadata } from 'next';

import { ProdutosPage } from '@/page/produtos/page';

export const metadata: Metadata = {
  title: 'Produtos',
  description:
    'Produção própria e revenda de insumos para a indústria de tintas, vernizes e para o setor de petróleo: secantes, resinas alquídicas, ácidos graxos, catalisadores, ésteres e dispersantes.',
  alternates: { canonical: '/produtos' },
};

export default function Page() {
  return <ProdutosPage />;
}

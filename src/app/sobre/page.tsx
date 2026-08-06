import type { Metadata } from 'next';

import { SobrePage } from '@/page/sobre/page';

export const metadata: Metadata = {
  title: 'Sobre nós',
  description:
    'Mais de quatro décadas produzindo química industrial em Itaquaquecetuba/SP. Conheça a trajetória da Neoquim e o Sistema de Gestão da Qualidade certificado ISO 9001:2015.',
  alternates: { canonical: '/sobre' },
};

export default function Page() {
  return <SobrePage />;
}

import type { Metadata } from 'next';

import { ROUTES } from '@/constants/routes.constants';
import { SustentabilidadePage } from '@/page/sustentabilidade/page';

export const metadata: Metadata = {
  title: 'Sustentabilidade',
  description:
    'Tratamento de efluentes com reaproveitamento de 100% da água de produção, usina solar fotovoltaica com injeção na rede e linhas de produtos biodegradáveis de base renovável.',
  alternates: { canonical: ROUTES.sustentabilidade },
};

export default function Page() {
  return <SustentabilidadePage />;
}

import type { Metadata } from 'next';

import { ROUTES } from '@/constants/routes.constants';
import { CanalDenunciasPage } from '@/page/canal-denuncias/page';

export const metadata: Metadata = {
  title: 'Canal de Denúncias',
  description:
    'Canal confidencial da Neoquim Indústrias Químicas para relatar condutas em desacordo com o Código de Ética e Conduta. A denúncia pode ser anônima.',
  alternates: { canonical: ROUTES.canalDenuncias },
};

export default function Page() {
  return <CanalDenunciasPage />;
}

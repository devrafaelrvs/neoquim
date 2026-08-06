import type { Metadata } from 'next';

import { ContatoPage } from '@/page/contato/page';

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Fale com o time comercial e técnico da Neoquim para orçamentos, amostras e especificações. Itaquaquecetuba/SP, seg. a sex., 8h às 17h.',
  alternates: { canonical: '/contato' },
};

export default function Page() {
  return <ContatoPage />;
}

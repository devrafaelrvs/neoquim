import type { Metadata } from 'next';

import { AdminPage } from '@/page/admin/page';
import { ADMIN_PAGE } from '@/page/admin/constants/admin.constants';

export const metadata: Metadata = {
  title: ADMIN_PAGE.metaTitulo,
  // Bloqueia indexação sem publicar o caminho no robots.txt, que é público.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

/** A sessão vem de cookie — esta rota nunca pode ser pré-renderizada. */
export const dynamic = 'force-dynamic';

export default function Page() {
  return <AdminPage />;
}

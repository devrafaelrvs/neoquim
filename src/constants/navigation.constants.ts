import { DOCUMENTOS, ROUTES } from '@/constants/routes.constants';

export interface NavItem {
  label: string;
  href: string;
  /** Abre em nova aba. Usado só nos documentos servidos de `public/`. */
  externo?: boolean;
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'Sobre nós', href: ROUTES.sobre },
  { label: 'Produtos', href: ROUTES.produtos },
  { label: 'Sustentabilidade', href: ROUTES.sustentabilidade },
  { label: 'Contato', href: ROUTES.contato },
];

export const HEADER_CTA: NavItem = {
  label: 'Fale com o comercial',
  href: ROUTES.contato,
};

export const FOOTER_NAV: NavItem[] = [
  { label: 'Produtos', href: ROUTES.produtos },
  { label: 'Sobre nós', href: ROUTES.sobre },
  { label: 'Sustentabilidade', href: ROUTES.sustentabilidade },
  { label: 'Contato', href: ROUTES.contato },
];

/**
 * Bloco de compliance do rodapé, separado da navegação institucional.
 *
 * O canal de denúncias precisa estar visível em todas as páginas: quem procura
 * não vai caçar no menu, e o código de ética (CEC-8.5) manda divulgá-lo.
 */
export const FOOTER_COMPLIANCE: NavItem[] = [
  { label: 'Canal de Denúncias', href: ROUTES.canalDenuncias },
  { label: 'Código de Ética', href: DOCUMENTOS.codigoEtica, externo: true },
];

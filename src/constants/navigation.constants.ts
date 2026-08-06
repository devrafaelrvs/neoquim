import { ROUTES } from '@/constants/routes.constants';

export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'Sobre nós', href: ROUTES.sobre },
  { label: 'Produtos', href: ROUTES.produtos },
  { label: 'Contato', href: ROUTES.contato },
];

export const HEADER_CTA: NavItem = {
  label: 'Fale com o comercial',
  href: ROUTES.contato,
};

export const FOOTER_NAV: NavItem[] = [
  { label: 'Produtos', href: ROUTES.produtos },
  { label: 'Sobre nós', href: ROUTES.sobre },
  { label: 'Contato', href: ROUTES.contato },
];

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const SITE_NAME = 'Neoquim Indústrias Químicas';

export const SITE_DESCRIPTION =
  'Química industrial para tintas, vernizes e perfuração de petróleo. Secantes metálicos, resinas alquídicas, dispersantes e insumos para fluidos de perfuração, com Sistema de Gestão da Qualidade certificado ISO 9001:2015.';

/** `Sobre nós | Neoquim Indústrias Químicas` */
export function pageTitle(titulo: string) {
  return `${titulo} | ${SITE_NAME}`;
}

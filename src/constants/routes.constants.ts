export const ROUTES = {
  home: '/',
  sobre: '/sobre',
  produtos: '/produtos',
  produto: (slug: string) => `/produtos/${slug}`,
  contato: '/contato',
  sustentabilidade: '/sustentabilidade',
  canalDenuncias: '/canal-de-denuncias',
  /** Download do certificado ISO — resolve para o arquivo atual no Vercel Blob. */
  certificado: '/certificado',
} as const;

/**
 * Documentos servidos como arquivo estático de `public/`.
 *
 * Não são rotas do App Router — o link abre o arquivo direto, em nova aba.
 * Ao publicar uma revisão nova, sobrescreva o arquivo mantendo o nome: o
 * caminho está no rodapé de todas as páginas.
 */
export const DOCUMENTOS = {
  codigoEtica: '/documentos/codigo-de-etica-neoquim.pdf',
} as const;

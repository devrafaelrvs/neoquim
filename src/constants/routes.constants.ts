export const ROUTES = {
  home: '/',
  sobre: '/sobre',
  produtos: '/produtos',
  produto: (slug: string) => `/produtos/${slug}`,
  contato: '/contato',
  /** Download do certificado ISO — resolve para o arquivo atual no Vercel Blob. */
  certificado: '/certificado',
} as const;

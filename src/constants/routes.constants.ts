export const ROUTES = {
  home: '/',
  sobre: '/sobre',
  produtos: '/produtos',
  produto: (slug: string) => `/produtos/${slug}`,
  contato: '/contato',
} as const;

import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/constants/seo.constants';
const CRAWLERS_IA_BLOQUEADOS = [
  'meta-externalagent',
  'meta-externalfetcher',
  'FacebookBot',
];


const LEGADO_WORDPRESS = [
  '/category/',
  '/wp-admin/',
  '/wp-content/',
  '/wp-includes/',
  '/wp-json/',
  '/*.php',
];


const SPAM_APOSTAS = [
  '/*bet*',
  '/*casino*',
  '/*cassino*',
  '/*aposta*',
  '/*slot*',
  '/*gacor*',
  '/*togel*',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        /**
         * `/_next/` é `Allow` explícito, não descuido.
         *
         * O nome do chunk gerado pelo build carrega hash, e um hash pode conter
         * a sequência "bet" por acaso — aí `/*bet*` derrubaria um JS que o
         * Googlebot precisa para renderizar a página. Na regra de precedência
         * do robots.txt vence o padrão mais longo: `/_next/` tem 7 caracteres
         * contra 6 de `/*bet*`, então o Allow ganha. Não troque por um padrão
         * mais curto.
         *
         * `/.well-known/` também não aparece em Disallow nenhum: é por onde
         * passa a validação de certificado.
         */
        allow: ['/', '/_next/'],
        disallow: [...LEGADO_WORDPRESS, ...SPAM_APOSTAS],
      },
      ...CRAWLERS_IA_BLOQUEADOS.map((userAgent) => ({
        userAgent,
        disallow: '/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

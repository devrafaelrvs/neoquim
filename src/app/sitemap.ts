import type { MetadataRoute } from 'next';

import { ROUTES } from '@/constants/routes.constants';
import { SITE_URL } from '@/constants/seo.constants';
import { getAllProductSlugs } from '@/entity/product/services/product.service';

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  const fixas = [
    { url: ROUTES.home, priority: 1 },
    { url: ROUTES.produtos, priority: 0.9 },
    { url: ROUTES.sobre, priority: 0.7 },
    { url: ROUTES.sustentabilidade, priority: 0.7 },
    { url: ROUTES.contato, priority: 0.7 },
    { url: ROUTES.canalDenuncias, priority: 0.4 },
  ];

  const produtos = getAllProductSlugs().map((slug) => ({
    url: ROUTES.produto(slug),
    priority: 0.8,
  }));

  return [...fixas, ...produtos].map(({ url, priority }) => ({
    url: `${SITE_URL}${url}`,
    lastModified: agora,
    changeFrequency: 'monthly' as const,
    priority,
  }));
}

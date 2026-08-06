import {
  FEATURED_PRODUCT_SLUG,
  PRODUCTS,
} from '@/entity/product/constants/products.constants';
import type { Product } from '@/entity/product/product.entity';

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Produtos exibidos na grade da home. */
export function getHomeProducts(): Product[] {
  return PRODUCTS.filter((p) => p.destaqueHome);
}

/** Produto em destaque no topo de /produtos. */
export function getFeaturedProduct(): Product {
  const destaque = getProductBySlug(FEATURED_PRODUCT_SLUG);

  if (!destaque) {
    throw new Error(
      `FEATURED_PRODUCT_SLUG "${FEATURED_PRODUCT_SLUG}" não existe em PRODUCTS.`,
    );
  }

  return destaque;
}

/** Demais produtos da listagem, já sem o destaque. */
export function getListedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.slug !== FEATURED_PRODUCT_SLUG);
}

/** Os `quantidade` produtos seguintes, circulando a lista. */
export function getRelatedProducts(slug: string, quantidade = 4): Product[] {
  const indice = PRODUCTS.findIndex((p) => p.slug === slug);

  if (indice === -1) return PRODUCTS.slice(0, quantidade);

  return Array.from(
    { length: Math.min(quantidade, PRODUCTS.length - 1) },
    (_, i) => PRODUCTS[(indice + i + 1) % PRODUCTS.length],
  );
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}

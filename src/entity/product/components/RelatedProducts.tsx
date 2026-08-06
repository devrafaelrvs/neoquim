import { SectionTitle } from '@/components/ui/Section';
import { ProductGrid } from '@/entity/product/components/ProductGrid';
import type { Product } from '@/entity/product/product.entity';

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>Outros produtos</SectionTitle>
      <ProductGrid products={products} />
    </div>
  );
}

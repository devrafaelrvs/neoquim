import { ProductCard } from '@/entity/product/components/ProductCard';
import type { Product } from '@/entity/product/product.entity';
import { cn } from '@/utils/cn';

export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {products.map((product) => (
        <li key={product.slug} className="flex">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

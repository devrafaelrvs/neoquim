import Link from 'next/link';

import { FlaskIcon } from '@/components/ui/Icons';
import { ROUTES } from '@/constants/routes.constants';
import type { Product } from '@/entity/product/product.entity';

/** Card verde da grade de produtos. O <Link> envolve o card inteiro. */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={ROUTES.produto(product.slug)}
      className="flex w-full flex-col gap-3 rounded-xl bg-product p-5 text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <FlaskIcon className="h-5 w-5 text-white/90" />
      <h3 className="text-sm font-bold">{product.titulo}</h3>
      <p className="text-xs leading-relaxed text-white/85">
        {product.descricao}
      </p>
    </Link>
  );
}

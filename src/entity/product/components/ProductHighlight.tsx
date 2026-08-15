import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/constants/routes.constants';
import type { Product } from '@/entity/product/product.entity';

/** Card largo com imagem, usado no topo de /produtos. */
export function ProductHighlight({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[21/9] w-full">
        <Image
          src={product.imagem}
          alt={product.imagemAlt}
          fill
          priority
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
        <h2 className="text-lg font-bold tracking-wide text-ink uppercase">
          {product.titulo}
        </h2>
        <p className="max-w-xl text-sm text-muted">{product.descricao}</p>
        <ButtonLink href={ROUTES.produto(product.slug)} className="mt-2">
          Veja mais
          <ArrowRightIcon className="h-4 w-4" />
        </ButtonLink>
      </div>
    </Card>
  );
}

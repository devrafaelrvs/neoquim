import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/constants/routes.constants';
import { COMPANY } from '@/entity/company/constants/company.constants';

/**
 * Variante REVERSA do logo (elipse branca, letreiro vazado).
 *
 * Header e footer são os dois únicos consumidores, e ambos rodam sobre o
 * gradiente escuro da marca. O logo colorido some ali: o azul do letreiro é o
 * mesmo azul do fundo. Sobre fundo claro esta versão desaparece pelo motivo
 * inverso — se algum dia o logo for para um fundo branco, use
 * `/logo/logo-neoquim.png`, que é também o que o JSON-LD entrega aos buscadores.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href={ROUTES.home}
      aria-label={`${COMPANY.nome} — página inicial`}
      className={className}
    >
      <Image
        src="/logo/logo-neoquim-branco.png"
        alt={COMPANY.razaoSocial}
        width={1483}
        height={799}
        priority
        className="h-12 w-auto md:h-14"
      />
    </Link>
  );
}
